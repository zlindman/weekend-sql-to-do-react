import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App () {
  
  const [toDoItem, setToDoItem] = useState('');
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const getTaskList = () => {
    axios.get('/api/todo').then(response => {
      setToDoItem(response.data);
    }).catch(error => {
      console.log(error);
      alert('Something went wrong!');
    })
  }

  useEffect(() => {
    console.log('useEffect!');
    getTaskList();
  }, []);


  function addTask(){
      setTasks
  }

  function deleteTask(id){

  }

  function prioritizeTask(id){

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
        <ol>
            {tasks.map((task, id) => 
                <li key={id}>
                    {task}
                    <button onClick={() => deleteTask(id)}>Delete</button>
                    <button onClick={() => prioritizeTask(id)}>Priority</button>
                </li>
        )}
        </ol>
      </div>
    </div>
  );

}



export default App;
