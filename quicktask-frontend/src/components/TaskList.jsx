import React from 'react';
import TaskItem from './TaskItem';

const styles = {
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
};

function TaskList({ tasks, onUpdate, onDelete }) {
  return (
    <ul style={styles.list}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}

export default TaskList;
