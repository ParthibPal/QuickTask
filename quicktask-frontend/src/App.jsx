import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

const styles = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #e0eafc, #cfdef3)',
    padding: '40px 20px',
    boxSizing: 'border-box',
  },
  container: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    fontFamily: 'Segoe UI, Roboto, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#2c3e50',
    fontSize: '32px',
    fontWeight: '600',
    marginBottom: '30px',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
  },
  progressContainer: {
    marginBottom: '20px',
    textAlign: 'center',
  },
  progressBar: {
    height: '8px',
    background: '#eee',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: '#28a745',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchTasks = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/tasks');
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (task) => {
    await fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    });
    fetchTasks();
  };

  const handleUpdate = async (id, updatedTask) => {
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: 'DELETE',
    });
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const completedCount = tasks.filter(t => t.completed).length;
  const progress = tasks.length ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>QuickTask</h1>
        <TaskForm onCreate={handleCreate} />

        <div style={styles.progressContainer}>
          <p style={{ fontSize: '14px', color: '#555' }}>Progress: {progress}%</p>
          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }}></div>
          </div>
        </div>

        <input
          style={{ ...styles.input, marginBottom: '20px' }}
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <TaskList
          tasks={filteredTasks}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}

export default App;
