import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addNewTask, deleteTask, getMyTask, updateTask } from "../controllers/task.js";

const router = express.Router();

router.post("/new", isAuthenticated,addNewTask);
router.get("/my", isAuthenticated, getMyTask );
router
.route("/:id")
.put(isAuthenticated,updateTask)
.delete(isAuthenticated,deleteTask);

export default router;