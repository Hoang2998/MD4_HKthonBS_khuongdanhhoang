import React, { useEffect, useState } from 'react'
import './TodoList.css'
import axios from 'axios'
export default function TodoList() {
    interface todo {
        id: number,
        name: string,
        status: number
    }
    type State = {
        todoList: todo[]
    }
    const [todoList, setTodoList] = useState<todo[]>([])
    const [newTodo, setNewTodo] = useState<string>('')
    const [flag, setFlag] = useState<boolean>(false)
    const [status, setStatus] = useState<string>("Add")
    const [id, setId] = useState<number>(0)
    useEffect(() => {
        const result = axios.get('http://localhost:8080/api/v1/todo')
            .then(res => {
                setTodoList(res.data.result)
            })
    }, [flag])
    const addNewTodo = () => {
        if(status === "Add"){
           if(newTodo === '') return
        axios.post('http://localhost:8080/api/v1/todo', { name: newTodo })
        .then(res => {
           console.log(res.data.message) 
           setFlag(!flag)
           setNewTodo('')
        }) 
        }else{
        axios.patch(`http://localhost:8080/api/v1/todo/${id}`,{name:newTodo})
            .then(res => {
                console.log(res.data.message)
                setFlag(!flag)
                setStatus("Add")
                setNewTodo('')
            })
        }
        
    }
    const deleteTodo = (id: number) => {
        axios.delete(`http://localhost:8080/api/v1/todo/${id}`)
        .then(res => {
            console.log(res.data.message)
            setFlag(!flag)
        })
    }
    const completed = (e: React.ChangeEvent<HTMLInputElement> , id: number) => {
        console.log(e.target.checked)
        axios.put(`http://localhost:8080/api/v1/todo/${id}`,{status:e.target.checked?1:0})
        .then(res => {
            console.log(res.data.message)
            setFlag(!flag)
        })

    } 
    const changeEdit = (todo: todo) => {
        setNewTodo(todo.name)
        setId(todo.id)
        setStatus("Edit")
    }
    return (
        <>
            <div className='container'>
                <div className='table'>
                    <h1>Todo List</h1>
                    <p>Get things done, one item at a time</p>
                    <div className='renderTodo'>
                        {
                            todoList.map((todo: todo) => {
                                return <div className="todo">
                                    <p style={{ textDecoration: todo.status === 1 ? 'line-through' : '' }}> {todo.name} </p>
                                    <div className='action'>
                                        <input type="checkbox" checked={todo.status === 1 ? true : false}  onChange={(e) => completed(e,todo.id)}/>
                                        <span className="material-symbols-outlined" onClick={() => changeEdit(todo)}>
                                            edit
                                        </span>
                                        <span className="material-symbols-outlined" onClick={()=>deleteTodo(todo.id)}>
                                            delete
                                        </span>
                                    </div>
                                </div>
                            })
                        }

                    </div>
                    <h4>Add to the todo list </h4>
                    <div>
                        <input type="text" onChange={(e) => setNewTodo(e.target.value)} value={newTodo}/>
                        <button onClick={addNewTodo}>{status}</button>
                    </div>
                </div>
            </div>
        </>
    )
}
