import { useState } from "react";
import "../styles/edit.css";
import axios from "axios";

const Edit = ({ header, setShowEdit, task, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      if (task) {
       
        await onUpdate(formData);
      } else {

        const response = await axios.post("http://localhost:8080/api/tasks", formData);
        console.log("Task Created:", response.data);
      }
      setShowEdit(false);
    } catch (e) {
      console.log("Error saving task:", e);
    }
  };

  return (
    <div className="edit-container">
      <form onSubmit={handleSubmit}>
        <div className="edit-container-header">
          <h1>{header} Task</h1>
        </div>

        <label>Title: </label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description: </label>
        <textarea name="description" value={formData.description} onChange={handleChange}></textarea>

        <button type="submit">Save & {header}</button>
        <button type="button" onClick={() => setShowEdit(false)}>Cancel</button>
      </form>
    </div>
  );
};

export default Edit;
