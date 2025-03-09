const asyncHandler = require("express-async-handler")
const db = require("../config/sqlConnection.js")

//get All tasks
const getTasks = asyncHandler((req, res)=>{
    const sql = "SELECT * FROM tasks";
    db.query(sql,(err, results)=>{
        if (err)  return res.status(500).json({message:"something went wrong while fetching data..."});
        res.status(200).json(results);
    })
})

//create single task
const createTask = asyncHandler((req,res)=>{
    const {title, description, status} = req.body;
    if(!title) {
        return res.status(400).json({message:"title or description is missing..."})
    }

    const sql = "INSERT INTO tasks (title, description, status) VALUES (?, ?, ?)"

    db.query(sql, [title, description, false], (err, results)=>{
        if(err) return res.status(500).json({message:"something went wrong while inserting...."})
        res.status(200).json({message:"Created successfully!", response:results})
    })
})

//get task by id
const getById = asyncHandler((req, res)=>{
    const sql = "SELECT * FROM tasks WHERE id = ?"
    db.query(sql, [req.params.id], (err, results)=>{
        if(err ) return res.status(500).json({message:"something went wrong while fetching..."})
        if(results.length == 0) return res.status(404).json({message:"there is no task like that... create one!"})
        res.status(200).json(results)
    })
})

//update the task by id
const updateById = asyncHandler((req, res)=>{
    const {title, description, status} = req.body;
    const sql = "UPDATE tasks SET title=?, description=?, status=? WHERE id=?"
    db.query(sql, [title, description, status || false, req.params.id], (err, results)=>{
        if(err) return res.status(500).json({message:"something went wrong while inserting...."})
        res.status(200).json({message:"Task updated successfully!", response:results})
    })
})

//delete the task by id
const deleteById = asyncHandler((req, res)=>{
    const sql = "DELETE FROM tasks WHERE id = ?";
    db.query(sql, [req.params.id], (err, results)=>{
        if(err) return res.status(500).json({message:"something went wrong while inserting...."})
        res.status(200).json({message:"Deleted successfully!", response:results})
    })
})

module.exports = {getTasks, createTask, getById, updateById, deleteById}