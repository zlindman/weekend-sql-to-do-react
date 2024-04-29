import './App.css';
import ToDoList from './ToDoList';
import { useState } from 'react';

function App () {
  
  const [toDoItem, setToDoItem] = useState('');

  return (
    <div>
      <h1>TO DO APP</h1>
      <ToDoList/>
    </div>
  );

}



export default App;
