import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', owner: '', command: '' });
  const [search, setSearch] = useState('');
  const [output, setOutput] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAdd = e => {
    e.preventDefault();
    setTasks([...tasks, { ...form, output: '' }]);
    setForm({ id: '', name: '', owner: '', command: '' });
  };

  const handleDelete = id => setTasks(tasks.filter(t => t.id !== id));

  const handleRun = task => {
    // Simulate command output
    const simulated = `Output for command: ${task.command}`;
    setTasks(tasks.map(t => t.id === task.id ? { ...t, output: simulated } : t));
    setOutput(simulated);
  };

  const filtered = tasks.filter(t => t.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 24 }}>
      <h2>Task Manager</h2>
      <form onSubmit={handleAdd} style={{ marginBottom: 16 }}>
        <input name="id" placeholder="ID" value={form.id} onChange={handleChange} required />
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="owner" placeholder="Owner" value={form.owner} onChange={handleChange} required />
        <input name="command" placeholder="Command" value={form.command} onChange={handleChange} required />
        <button type="submit">Add Task</button>
      </form>
      <input
        placeholder="Search by name"
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ marginBottom: 16, width: '100%' }}
      />
      <table border="1" cellPadding="8" style={{ width: '100%', marginBottom: 16 }}>
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Owner</th><th>Command</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.name}</td>
              <td>{task.owner}</td>
              <td>{task.command}</td>
              <td>
                <button onClick={() => handleRun(task)}>Run</button>
                <button onClick={() => handleDelete(task.id)} style={{ marginLeft: 8 }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {output && (
        <div style={{ background: '#f0f0f0', padding: 12 }}>
          <strong>Command Output:</strong>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
}

export default App;
