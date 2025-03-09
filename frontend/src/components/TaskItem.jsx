import React, { useState } from 'react';
import axios from 'axios';
import "../styles/taskitem.css";
import Edit from '../components/Edit';
import dlt from "../assets/dlt.png";
import edit from "../assets/edit.png";

const TaskItem = ({ task }) => {
  const [status, setStatus] = useState(task.status)
  const [showEdit, setShowEdit] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEdit = () => {
    setShowEdit(true);
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/tasks/${task.id}`, formData);
      console.log("Task updated:", response.data);
      setUpdatedTask(response.data); 
      setShowEdit(false);
    } catch (e) {
      console.log("Error updating task:", e);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/tasks/${task.id}`);
      console.log("Deleted successfully");
      onDelete(task.id); 
    } catch (e) {
      console.log("Error while deleting:", e);
    }
  };

  const handleStatusToggle = async () => {
    const newStatus = !status;
    try {
      await axios.put(`http://localhost:8080/api/tasks/${task.id}`, {
        ...updatedTask,
        status: newStatus,
      });
      setStatus(newStatus);
      setUpdatedTask({ ...updatedTask, status: newStatus });
    } catch (e) {
      console.log("Error updating status:", e);
    }
  };


  return (
    <>
      <div className="task-item-container">
        <h1 className="task-title">
          {updatedTask.title} <span className="task-date">2025 Jan 20</span>
        </h1>
        <p>{updatedTask.description}</p>

        <div className="task-item-footer">
        <button className={status ? "completed" : "pending"} onClick={handleStatusToggle}>
            {status ? "Completed" : "Pending"}
            </button>
          <div className="operations">
            <img src={edit} alt="Edit" onClick={handleEdit} />
            <img src={dlt} alt="Delete" onClick={handleDelete}/>
          </div>
        </div>
      </div>

      {showEdit && <Edit header="Update" setShowEdit={setShowEdit} task={updatedTask} onUpdate={handleUpdate} />}
    </>
  );
};

export default TaskItem
