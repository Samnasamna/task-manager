import React from 'react'
import NavBar from '../components/NavBar'
import TaskItem from '../components/taskItem'
import Edit from "../components/Edit"
import add from "../assets/add.png"
import {useState, useEffect} from "react"
import axios from "axios"


const Home = () => {

  const [allTasks, setAllTasks] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(()=>{
    const fetchTasks = async ()=>{
      try{
        const response = await axios.get("http://localhost:8080/api/tasks");
        console.log(response)
        setAllTasks(response.data)
      }catch(error){
        console.log("Error fetching tasks: ", error);
      }
    }

    fetchTasks();
  },[])

  const handleDeleteTask = (taskId) => {
    setAllTasks((prevTasks) => prevTasks.filter(task => task.id !== taskId));
  };

  return (
    <div>

      <NavBar/>
      <div className='all-task-items'>
      {allTasks.length > 0 && (
        allTasks.map((task)=> <TaskItem key={task.id} task={task} onDelete={handleDeleteTask}/>)
      )}
      <div className='task-item-container new-task' onClick={()=>setShowEdit(true)}>
        <img src={add} alt="" />
        <button> ADD NEW TASK</button>
      </div>
      </div>
      {showEdit && <Edit header="Create" setShowEdit= {setShowEdit}/>}
    </div>
  )
}

export default Home
