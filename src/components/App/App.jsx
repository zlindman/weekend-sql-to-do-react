import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App () {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const getTaskList = () => {
    axios.get('/api/todo').then(response => {
      console.log(response.data);
      setTasks(response.data);
    }).catch(error => {
      console.log(error);
      alert('Something went wrong!');
    })
  }

  useEffect(() => {
    console.log('useEffect!');
    getTaskList();
  }, []);


  const addTask = (e) => {
      e.preventDefault();
      console.log('add task', newTask);
      const data = { task: newTask }
      axios.post('/api/todo', data).then((response) => {
        getTaskList();
        setNewTask('');
      }).catch(error => {
        console.log(error);
        alert('Something went wrong!');
      })

  }

  const deleteTask = (id) => {
    console.log('remove task', id);
    axios.delete(`/api/todo/${id}`).then((response)  => {
        getTaskList();
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong!');
    })
  }

  const toggleTask = (id) => {
    console.log('toggle', id);
    axios.put(`/api/todo/${id}`).then((response) => {
        getTaskList();
    }).catch((error) => {
        console.log(error);
        alert('Something went wrong!');
    })
  }


  return (
    <div>
      <h1>TO DO APP</h1>
      <div className="to-do-list">
        <form onSubmit={addTask}>
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <input 
          type="submit" value="Add Task"
          /> 
        </form>
        <div>
          {
          tasks.map(task => (
            <div className={task.completed ? 'task-completed' : 'task-uncompleted'} key={task.id}>
              {task.task}
              <button onClick={() => deleteTask(task.id)}>Remove Task</button>
              {
                task.completed ?
                <button onClick={() => toggleTask(task.id)}>Undo</button> :
                <button onClick={() => toggleTask(task.id)}>Completed</button>
              }
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );

}



export default App;
