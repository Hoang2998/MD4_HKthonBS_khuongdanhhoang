import express,{Request,Response} from "express";
import { servicesTodo } from "../services/todoList.services";

export const todoController = {
    getTodos:async(req:Request,res:Response)=>{
        try {
            const result = await servicesTodo.getTodos()
            console.log(result)
            res.status(200).json({
                result:result,
                message:"Get todos successfully",

            })
        } catch (error) {
            res.status(500).json(error)
        }
    },
    addTodos:async(req:Request,res:Response)=>{
        const {name} = req.body
        console.log(name)
        try {
            const result = await servicesTodo.addTodos(name)
            res.status(201).json({
                message:"Add todos successfully",
            })
        } catch (error) {
            res.status(401).json(error)
        }
    },
    deleteTodo:async(req:Request,res:Response)=>{
        const {id} = req.params
        try {
            const result = await servicesTodo.deleteTodo(Number(id))
            res.status(201).json({
                message:"Delete todos successfully",
            })
        } catch (error) {
            res.status(401).json(error)
        }
    },
    changeStatusTodo:async(req:Request,res:Response)=>{
        const {id} = req.params
        const {status} = req.body
        console.log(status,id)
        try {
            const result = await servicesTodo.changeStatusTodo(Number(id),Number(status))
            res.status(201).json({
                message:"Change status todos successfully",
            })
        } catch (error) {
            res.status(401).json(error)
        }
    },
    changeNameTodo:async(req:Request,res:Response)=>{
        const {id} = req.params
        const {name} = req.body
        try {
            const result = await servicesTodo.changeNameTodo(Number(id),name)
            res.status(201).json({
                message:"Change name todos successfully",
            })
        } catch (error) {
            res.status(401).json(error)
        }
    }

    }
