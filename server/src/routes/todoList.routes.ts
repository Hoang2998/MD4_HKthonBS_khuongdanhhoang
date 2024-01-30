import express from "express";
import { todoController } from "../controller/todoList.controller";
const todoRoutes = express.Router();
 
todoRoutes.get('/api/v1/todo',todoController.getTodos)
todoRoutes.post('/api/v1/todo',todoController.addTodos)
todoRoutes.delete('/api/v1/todo/:id',todoController.deleteTodo)
todoRoutes.put('/api/v1/todo/:id',todoController.changeStatusTodo)
todoRoutes.patch('/api/v1/todo/:id',todoController.changeNameTodo)


export default todoRoutes
