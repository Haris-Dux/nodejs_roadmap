
import { Task } from "../models/task.js";

export const addNewTask = async (req,res) =>{
    try {
        const {title,description} = req.body;
     await Task.create({
        title,
        description,
        user:req.user
    });
    res.status(200).json({
        success:true,
        message:"Task added Succesfully"
    })  
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while adding the task",
          });
    }
};

export const getMyTask = async (req,res) => {
 try {
    const userid = req.user._id;
    const task = await Task.find({ user: userid})  
    res.status(200).json({
        success:true,
        task
    })  
 } catch (error) {
    res.status(404).json({
        success: false,
        message: "Error occurred while retriving the Data",
      });
 }
};

export const updateTask = async (req,res) => {
   try {
    const task = await Task.findById(req.params.id) 
    task.isCompleted = !task.isCompleted
   await task.save(); 
    res.status(200).json({
        success:true,
        message:"Task Updated"
    }) 
   } catch (error) {
    res.status(404).json({
        success: false,
        message: "Invalid ID",
      });
   }
};

export const deleteTask = async (req,res) => {
   try {
    const task = await Task.findById(req.params.id)
    await task.deleteOne();
    res.status(200).json({
        success:true,
        message:"Task Deleted"
    })
   } catch (error) {
    res.status(404).json({
        success: false,
        message: "Task Not Found",
      });
   }   
};
