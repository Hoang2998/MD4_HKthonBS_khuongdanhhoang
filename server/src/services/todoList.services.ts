import { pool } from "../config/database";

export const servicesTodo = {
    getTodos:async()=>{
        const [result] = await pool.query("SELECT * FROM todo")
        return result
    },
    addTodos:async(name:string)=>{
        const result = await pool.query("INSERT INTO todo (name) VALUES (?)",[name])
        return result
    },
    deleteTodo:async(id:number)=>{
        const result = await pool.query("DELETE FROM todo WHERE id = ?",[id])
        return result
    },
    changeStatusTodo:async(id:number,status:number)=>{
        const result = await pool.query("UPDATE todo SET status = ? WHERE id = ?",[status,id])
        return result
    },
    changeNameTodo:async(id:number,name:string)=>{
        const result = await pool.query("UPDATE todo SET name = ? WHERE id = ?",[name,id])
        return result
    }
}