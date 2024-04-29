import './ToDoList.css';
import { useState } from 'react';

function ToDoList () {

    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
  
    function handleInputChange(event){
      setNewTask(event.target.value);
    }
  
    function addTask(){
        setTasks
    }
  
    function deleteTask(id){
  
    }
  
    function prioritizeTask(id){
  
    }
  
    return (
      <div className="to-do-list">
        <h1>To Do List</h1>
        <section>
          <input
            type="text"
            placeholder="Enter a task..."
            value={newTask}
            onChange={handleInputChange}
          />
          <button onClick={addTask}>Add Task</button>
        </section>
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
    );
  }

  export default ToDoList