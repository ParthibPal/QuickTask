import React from 'react';

const styles = {
  item: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '20px',
  },
  title: {
    fontSize: '16px',
    fontWeight: '500',
    color: '#333',
    marginBottom: '6px',
  },
  meta: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '6px',
  },
  description: {
    fontSize: '14px',
    color: '#555',
    marginTop: '6px',
  },
  badge: {
    display: 'inline-block',
    padding: '2px 6px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: 'bold',
    marginLeft: '6px',
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  button: {
    padding: '6px 10px',
    borderRadius: '4px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '14px',
    width: '100px',
  },
  complete: {
    backgroundColor: '#28a745',
    color: '#fff',
  },
  edit: {
    backgroundColor: '#ffc107',
    color: '#fff',
  },
  delete: {
    backgroundColor: '#dc3545',
    color: '#fff',
  },
};

function TaskItem({ task, onUpdate, onDelete }) {
  const handleToggleComplete = () => {
    onUpdate(task.id, { ...task, completed: !task.completed });
  };

  const handleEdit = () => {
    const newTitle = prompt('Edit task title:', task.title);
    if (newTitle && newTitle.trim() !== '') {
      onUpdate(task.id, { ...task, title: newTitle });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'HIGH': return '#dc3545';
      case 'MEDIUM': return '#ffc107';
      case 'LOW': return '#28a745';
      default: return '#6c757d';
    }
  };

  return (
    <li style={styles.item}>
      <div style={{ flex: 1 }}>
        <span style={styles.title}>
          {task.completed ? '✅ ' : ''}{task.title}
        </span>

        {(task.category || task.priority || task.dueDate) && (
          <p style={styles.meta}>
            {task.category && <span><strong>Category:</strong> {task.category} </span>}
            {task.priority && (
              <span style={{ ...styles.badge, backgroundColor: getPriorityColor(task.priority), color: '#fff' }}>
                {task.priority}
              </span>
            )}
            {task.dueDate && <span style={{ marginLeft: '10px' }}><strong>Due:</strong> {task.dueDate}</span>}
          </p>
        )}

        {task.description && (
          <p style={styles.description}>{task.description}</p>
        )}
      </div>

      <div style={styles.actions}>
        <button
          style={{ ...styles.button, ...styles.complete }}
          onClick={handleToggleComplete}
        >
          {task.completed ? 'Undo' : 'Complete'}
        </button>
        <button
          style={{ ...styles.button, ...styles.edit }}
          onClick={handleEdit}
        >
          Edit
        </button>
        <button
          style={{ ...styles.button, ...styles.delete }}
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
