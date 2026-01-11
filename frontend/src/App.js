import React, { useState } from 'react';
import './App.css';

function Section({ title, children }) {
  return (
    <section style={{
      background: '#fff',
      borderRadius: '10px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
      padding: '1.5em',
      margin: '1.5em 0',
      width: '100%',
      maxWidth: 600
    }}>
      <h3 style={{borderBottom: '1px solid #eee', paddingBottom: '0.5em', marginBottom: '1em', color: '#333'}}>{title}</h3>
      {children}
    </section>
  );
}

function App() {
  const [dogs, setDogs] = useState([]);
  const [dogId, setDogId] = useState('');
  const [breed, setBreed] = useState('');
  const [color, setColor] = useState('');
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);
  const [singleDog, setSingleDog] = useState(null);
  const [ownersDogs, setOwnersDogs] = useState([]);
  const [paginated, setPaginated] = useState(null);
  const [addDogInput, setAddDogInput] = useState({ name: '', age: '', breed: '', color: '', favouriteFood: '', ownerId: '' });
  const [updateDogInput, setUpdateDogInput] = useState({ id: '', name: '', age: '', breed: '', color: '', favouriteFood: '', ownerId: '' });
  const [deleteDogId, setDeleteDogId] = useState('');
  const [assignDog, setAssignDog] = useState({ dogId: '', ownerId: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Owner state
  const [owners, setOwners] = useState([]);
  const [ownerId, setOwnerId] = useState('');
  const [singleOwner, setSingleOwner] = useState(null);
  const [addOwnerInput, setAddOwnerInput] = useState({ firstName: '', lastName: '', age: '' });


  const [activeTab, setActiveTab] = useState('dogs');

  const fetchDogs = async () => {
    setLoading(true); setError(null); setMessage('');
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ allDogs { id name breed color } }' })
      });
      const result = await response.json();
      setDogs(result.data.allDogs);
    } catch (err) { setError('Failed to fetch dogs'); }
    finally { setLoading(false); }
  };

  // Fetch dog by id
  const fetchDogById = async () => {
    setLoading(true); setError(null); setMessage('');
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `query { dogById(id: \"${dogId}\") { id name breed color } }` })
      });
      const result = await response.json();
      setSingleDog(result.data.dogById);
    } catch (err) { setError('Failed to fetch dog by id'); }
    finally { setLoading(false); }
  };

  // Fetch dogs by breed
  const fetchDogsByBreed = async () => {
    setLoading(true); setError(null); setMessage('');
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `query { dogsByBreed(breed: ${breed}) { id name breed color } }` })
      });
      const result = await response.json();
      setDogs(result.data.dogsByBreed);
    } catch (err) { setError('Failed to fetch dogs by breed'); }
    finally { setLoading(false); }
  };

  // Fetch dogs by color
  const fetchDogsByColor = async () => {
    setLoading(true); setError(null); setMessage('');
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `query { dogsByColor(color: \"${color}\") { id name breed color } }` })
      });
      const result = await response.json();
      setDogs(result.data.dogsByColor);
    } catch (err) { setError('Failed to fetch dogs by color'); }
    finally { setLoading(false); }
  };

  // Fetch dogs with owners
  const fetchDogsWithOwners = async () => {
    setLoading(true); setError(null); setMessage('');
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ dogsWithOwners { id name breed color owner { id firstName lastName } } }' })
      });
      const result = await response.json();
      setOwnersDogs(result.data.dogsWithOwners);
    } catch (err) { setError('Failed to fetch dogs with owners'); }
    finally { setLoading(false); }
  };

  // Fetch paginated dogs
  const fetchDogsPaginated = async () => {
    setLoading(true); setError(null); setMessage('');
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `query { dogsPaginated(page: ${page}, size: ${size}) { content { id name breed color } totalElements totalPages pageNumber pageSize } }` })
      });
      const result = await response.json();
      setPaginated(result.data.dogsPaginated);
    } catch (err) { setError('Failed to fetch paginated dogs'); }
    finally { setLoading(false); }
  };

  // Add dog
  const addDog = async () => {
    setLoading(true); setError(null); setMessage('');
    const foods = addDogInput.favouriteFood.split(',').map(f => f.trim()).filter(f => f);
    const mutation = `mutation { addDog(input: { name: \"${addDogInput.name}\", age: ${parseInt(addDogInput.age)}, breed: ${addDogInput.breed}, color: \"${addDogInput.color}\", favouriteFood: [${foods.map(f => f).join(',')}], ownerId: \"${addDogInput.ownerId}\" }) { id name } }`;
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
      });
      const result = await response.json();
      if (result.errors) setError(result.errors[0].message || 'Failed to add dog');
      else setMessage('Dog added!');
    } catch (err) { setError('Failed to add dog'); }
    finally { setLoading(false); }
  };

  // Update dog
  const updateDog = async () => {
    setLoading(true); setError(null); setMessage('');
    const foods = updateDogInput.favouriteFood.split(',').map(f => f.trim()).filter(f => f);
    const mutation = `mutation { updateDog(id: \"${updateDogInput.id}\", input: { name: \"${updateDogInput.name}\", age: ${parseInt(updateDogInput.age)}, breed: ${updateDogInput.breed}, color: \"${updateDogInput.color}\", favouriteFood: [${foods.map(f => f).join(',')}], ownerId: \"${updateDogInput.ownerId}\" }) { id name } }`;
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
      });
      const result = await response.json();
      if (result.errors) setError(result.errors[0].message || 'Failed to update dog');
      else setMessage('Dog updated!');
    } catch (err) { setError('Failed to update dog'); }
    finally { setLoading(false); }
  };

  // Delete dog
  const deleteDog = async () => {
    setLoading(true); setError(null); setMessage('');
    const mutation = `mutation { deleteDog(id: \"${deleteDogId}\") }`;
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
      });
      const result = await response.json();
      if (result.errors) setError(result.errors[0].message || 'Failed to delete dog');
      else setMessage('Dog deleted!');
    } catch (err) { setError('Failed to delete dog'); }
    finally { setLoading(false); }
  };

  // Assign dog to owner
  const assignDogToOwner = async () => {
    setLoading(true); setError(null); setMessage('');
    const mutation = `mutation { assignDogToOwner(dogId: \"${assignDog.dogId}\", ownerId: \"${assignDog.ownerId}\") { id name owner { id firstName lastName } } }`;
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
      });
      const result = await response.json();
      if (result.errors) setError(result.errors[0].message || 'Failed to assign dog');
      else setMessage('Dog assigned to owner!');
    } catch (err) { setError('Failed to assign dog'); }
    finally { setLoading(false); }
  };

  // Fetch all owners
  const fetchOwners = async () => {
    setLoading(true); setError(null); setMessage('');
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: '{ allOwners { id firstName lastName age } }' })
      });
      const result = await response.json();
      setOwners(result.data.allOwners);
    } catch (err) { setError('Failed to fetch owners'); }
    finally { setLoading(false); }
  };

  // Fetch owner by id
  const fetchOwnerById = async () => {
    setLoading(true); setError(null); setMessage('');
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: `query { ownerById(id: \"${ownerId}\") { id firstName lastName age } }` })
      });
      const result = await response.json();
      setSingleOwner(result.data.ownerById);
    } catch (err) { setError('Failed to fetch owner by id'); }
    finally { setLoading(false); }
  };

  // Add owner
  const addOwner = async () => {
    setLoading(true); setError(null); setMessage('');
    const mutation = `mutation { addOwner(input: { firstName: \"${addOwnerInput.firstName}\", lastName: \"${addOwnerInput.lastName}\", age: ${parseInt(addOwnerInput.age)} }) { id firstName lastName age } }`;
    try {
      const response = await fetch('http://localhost:8080/graphql', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: mutation })
      });
      const result = await response.json();
      if (result.errors) setError(result.errors[0].message || 'Failed to add owner');
      else setMessage('Owner added!');
    } catch (err) { setError('Failed to add owner'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f0f4f8 0%, #e0e7ef 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'Segoe UI, Arial, sans-serif' }}>
      <header style={{ width: '100%', maxWidth: 700, margin: '2em auto 1em auto', textAlign: 'center' }}>
        <h1 style={{ color: '#2a3d66', fontWeight: 700, letterSpacing: 1 }}>Dog & Owner API Demo</h1>
        <nav style={{ display: 'flex', justifyContent: 'center', gap: '2em', margin: '2em 0 0.5em 0' }}>
          <button onClick={() => setActiveTab('dogs')} style={{
            background: activeTab === 'dogs' ? '#2a3d66' : '#e0e7ef',
            color: activeTab === 'dogs' ? '#fff' : '#2a3d66',
            border: 'none', borderRadius: '5px', padding: '0.7em 2em', fontWeight: 600, fontSize: '1em', cursor: 'pointer', boxShadow: activeTab === 'dogs' ? '0 2px 8px rgba(42,61,102,0.08)' : 'none'
          }}>Dogs</button>
          <button onClick={() => setActiveTab('owners')} style={{
            background: activeTab === 'owners' ? '#2a3d66' : '#e0e7ef',
            color: activeTab === 'owners' ? '#fff' : '#2a3d66',
            border: 'none', borderRadius: '5px', padding: '0.7em 2em', fontWeight: 600, fontSize: '1em', cursor: 'pointer', boxShadow: activeTab === 'owners' ? '0 2px 8px rgba(42,61,102,0.08)' : 'none'
          }}>Owners</button>
        </nav>
      </header>
      <main style={{ width: '100%', maxWidth: 700, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {activeTab === 'dogs' && (
          <>
            <Section title="Fetch Dogs">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em', marginBottom: '1em' }}>
                <button onClick={fetchDogs} disabled={loading}>All Dogs</button>
                <button onClick={fetchDogsWithOwners} disabled={loading}>With Owners</button>
                <button onClick={fetchDogsPaginated} disabled={loading}>Paginated</button>
              </div>
              <div style={{ display: 'flex', gap: '0.5em', marginBottom: '0.5em' }}>
                <input placeholder="Dog ID" value={dogId} onChange={e => setDogId(e.target.value)} style={{flex:1}} />
                <button onClick={fetchDogById} disabled={loading}>By ID</button>
              </div>
              <div style={{ display: 'flex', gap: '0.5em', marginBottom: '0.5em' }}>
                <input placeholder="Breed (e.g. HUSKY)" value={breed} onChange={e => setBreed(e.target.value)} style={{flex:1}} />
                <button onClick={fetchDogsByBreed} disabled={loading}>By Breed</button>
              </div>
              <div style={{ display: 'flex', gap: '0.5em', marginBottom: '0.5em' }}>
                <input placeholder="Color" value={color} onChange={e => setColor(e.target.value)} style={{flex:1}} />
                <button onClick={fetchDogsByColor} disabled={loading}>By Color</button>
              </div>
              <div style={{ display: 'flex', gap: '0.5em', marginBottom: '0.5em' }}>
                <input placeholder="Page" type="number" value={page} onChange={e => setPage(e.target.value)} style={{width: '4em'}} />
                <input placeholder="Size" type="number" value={size} onChange={e => setSize(e.target.value)} style={{width: '4em'}} />
              </div>
              <div style={{marginTop: '1em'}}>
                <strong>All Dogs:</strong>
                <ul style={{listStyle: 'none', padding: 0}}>
                  {dogs.map(dog => (
                    <li key={dog.id} style={{background: '#f6f8fa', margin: '0.2em 0', padding: '0.5em', borderRadius: '5px'}}>{dog.name} ({dog.breed}, {dog.color})</li>
                  ))}
                </ul>
              </div>
            </Section>
            <Section title="Add Dog">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
                <input placeholder="Name" value={addDogInput.name} onChange={e => setAddDogInput({...addDogInput, name: e.target.value})} />
                <input placeholder="Age" type="number" value={addDogInput.age} onChange={e => setAddDogInput({...addDogInput, age: e.target.value})} />
                <input placeholder="Breed" value={addDogInput.breed} onChange={e => setAddDogInput({...addDogInput, breed: e.target.value})} />
                <input placeholder="Color" value={addDogInput.color} onChange={e => setAddDogInput({...addDogInput, color: e.target.value})} />
                <input placeholder="Favourite Food (comma separated)" value={addDogInput.favouriteFood} onChange={e => setAddDogInput({...addDogInput, favouriteFood: e.target.value})} />
                <input placeholder="Owner ID" value={addDogInput.ownerId} onChange={e => setAddDogInput({...addDogInput, ownerId: e.target.value})} />
                <button onClick={addDog} disabled={loading}>Add</button>
              </div>
            </Section>
            <Section title="Update Dog">
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em' }}>
                <input placeholder="Dog ID" value={updateDogInput.id} onChange={e => setUpdateDogInput({...updateDogInput, id: e.target.value})} />
                <input placeholder="Name" value={updateDogInput.name} onChange={e => setUpdateDogInput({...updateDogInput, name: e.target.value})} />
                <input placeholder="Age" type="number" value={updateDogInput.age} onChange={e => setUpdateDogInput({...updateDogInput, age: e.target.value})} />
                <input placeholder="Breed" value={updateDogInput.breed} onChange={e => setUpdateDogInput({...updateDogInput, breed: e.target.value})} />
                <input placeholder="Color" value={updateDogInput.color} onChange={e => setUpdateDogInput({...updateDogInput, color: e.target.value})} />
                <input placeholder="Favourite Food (comma separated)" value={updateDogInput.favouriteFood} onChange={e => setUpdateDogInput({...updateDogInput, favouriteFood: e.target.value})} />
                <input placeholder="Owner ID" value={updateDogInput.ownerId} onChange={e => setUpdateDogInput({...updateDogInput, ownerId: e.target.value})} />
                <button onClick={updateDog} disabled={loading}>Update</button>
              </div>
            </Section>
            <Section title="Delete Dog">
              <div style={{ display: 'flex', gap: '0.5em' }}>
                <input placeholder="Dog ID" value={deleteDogId} onChange={e => setDeleteDogId(e.target.value)} />
                <button onClick={deleteDog} disabled={loading}>Delete</button>
              </div>
            </Section>
            <Section title="Assign Dog To Owner">
              <div style={{ display: 'flex', gap: '0.5em' }}>
                <input placeholder="Dog ID" value={assignDog.dogId} onChange={e => setAssignDog({...assignDog, dogId: e.target.value})} />
                <input placeholder="Owner ID" value={assignDog.ownerId} onChange={e => setAssignDog({...assignDog, ownerId: e.target.value})} />
                <button onClick={assignDogToOwner} disabled={loading}>Assign</button>
              </div>
            </Section>
            {message && <div style={{color: 'green', margin: '1em 0'}}>{message}</div>}
            {error && <div style={{color: 'red', margin: '1em 0'}}>{error}</div>}
            <Section title="Results">
              <div style={{marginBottom: '1em'}}>
                <strong>All Dogs:</strong>
                <ul style={{listStyle: 'none', padding: 0}}>
                  {dogs.map(dog => (
                    <li key={dog.id} style={{background: '#f6f8fa', margin: '0.2em 0', padding: '0.5em', borderRadius: '5px'}}>{dog.name} ({dog.breed}, {dog.color})</li>
                  ))}
                </ul>
              </div>
              {singleDog && <div style={{marginBottom: '1em'}}><strong>Dog By ID:</strong> {singleDog.name} ({singleDog.breed}, {singleDog.color})</div>}
              {ownersDogs.length > 0 && <div style={{marginBottom: '1em'}}><strong>Dogs With Owners:</strong><ul style={{listStyle: 'none', padding: 0}}>{ownersDogs.map(dog => <li key={dog.id} style={{background: '#f6f8fa', margin: '0.2em 0', padding: '0.5em', borderRadius: '5px'}}>{dog.name} - Owner: {dog.owner.firstName} {dog.owner.lastName}</li>)}</ul></div>}
              {paginated && <div style={{marginBottom: '1em'}}><strong>Paginated Dogs:</strong><ul style={{listStyle: 'none', padding: 0}}>{paginated.content.map(dog => <li key={dog.id} style={{background: '#f6f8fa', margin: '0.2em 0', padding: '0.5em', borderRadius: '5px'}}>{dog.name} ({dog.breed}, {dog.color})</li>)}</ul><div>Page {parseInt(paginated.pageNumber) + 1} of {paginated.totalPages}</div></div>}
            </Section>
          </>
        )}
        {activeTab === 'owners' && (
          <Section title="Owner Endpoints">
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em', marginBottom: '1em' }}>
              <button onClick={fetchOwners} disabled={loading}>All Owners</button>
              <input placeholder="Owner ID" value={ownerId} onChange={e => setOwnerId(e.target.value)} style={{flex:1}} />
              <button onClick={fetchOwnerById} disabled={loading}>By ID</button>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5em', marginBottom: '1em' }}>
              <input placeholder="First Name" value={addOwnerInput.firstName} onChange={e => setAddOwnerInput({...addOwnerInput, firstName: e.target.value})} />
              <input placeholder="Last Name" value={addOwnerInput.lastName} onChange={e => setAddOwnerInput({...addOwnerInput, lastName: e.target.value})} />
              <input placeholder="Age" type="number" value={addOwnerInput.age} onChange={e => setAddOwnerInput({...addOwnerInput, age: e.target.value})} />
              <button onClick={addOwner} disabled={loading}>Add Owner</button>
            </div>
            <div style={{marginTop: '1em'}}>
              <strong>All Owners:</strong>
              <ul style={{listStyle: 'none', padding: 0}}>
                {owners.map(owner => (
                  <li key={owner.id} style={{background: '#f6f8fa', margin: '0.2em 0', padding: '0.5em', borderRadius: '5px'}}>{owner.firstName} {owner.lastName} (Age: {owner.age})</li>
                ))}
              </ul>
            </div>
            {singleOwner && <div style={{marginTop: '1em'}}><strong>Owner By ID:</strong> {singleOwner.firstName} {singleOwner.lastName} (Age: {singleOwner.age})</div>}
          </Section>
        )}
      </main>
    </div>
  );
}

export default App;
