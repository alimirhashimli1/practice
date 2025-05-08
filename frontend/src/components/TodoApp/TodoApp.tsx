
import React, { useState, useEffect, ChangeEvent } from "react";
import { Suspense } from "react";

const TodoItem = React.lazy(() => import("./TodoItem"))


interface Todo {
    id: string,
    task: string,
    completed: boolean
  };


  const LOCAL_STORAGE_KEY = "my-todo-list"

 export const TodoApp: React.FC = () => {
    const [task, setTask] = useState<string>("");
    const [todosArr, setTodosArr] = useState<Todo[]>([]);
    const [editTask, setEditTask] = useState<string>("");
    const [editId, setEditId] = useState<string | null>(null);
    const [loaded, setLoaded] = useState(false);
    const [taskError, setTaskError] = useState<string | null>(null)

    useEffect(() => {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if(stored){
        try {
          setTodosArr(JSON.parse(stored));
        } catch (error) {
          console.error("Invalid local storage data", error)
        }
      }
      setLoaded(true)
    }, [])

    useEffect(() => {
      if(loaded){
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todosArr))
      }
    }, [todosArr, loaded])

    const handleAdd = () => {
     

      if(!task.trim()){
        setTaskError("Task cannot be empty")
        return
      };

      try {
        const newTodo:Todo = {
          id: Date.now().toString(),
          task,
          completed: false
        };
        setTodosArr([newTodo, ...todosArr]);
      setTask("");
      } catch (error: unknown) {
       if (error instanceof Error){
        setTaskError(error.message)
       } else {
        setTaskError("An unexpected error occurred")
       }
      }
    }

    const handleDelete = (index: string) => {
      const findElement = todosArr.filter(todo => todo.id !== index)
      setTodosArr(findElement)
    }

    const handleEdit = (todoId: string, todoTask: string ) => {
      setEditId(todoId)
      setEditTask(todoTask)
    }

    const handleSave = (index: string) => {
      setTodosArr(prev => prev.map(todo => todo.id === index ? {...todo, task: editTask.trim()}:todo))
      setEditId(null)
      setEditTask("")
    }

    const handleToggle = (index: string) => {
      setTodosArr(prev => prev.map(
        todo => todo.id === index ? { ...todo, completed: !todo.completed,} : todo
      ))
    }
    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") handleAdd();
    };
  

  return (
    <main className="min-h-screen flex flex-col items-center justify-center "> 
    <section className="w-1/2 flex flex-col justify-center items-center">
      <div className="flex gap-2  justify-between">
      <input className="border border-amber-500" type="text" value={task} aria-label="New Task" onChange={(e: ChangeEvent<HTMLInputElement>) => setTask(e.target.value)} onKeyDown={handleKeyPress}/>
      <button className="ml-2 bg-blue-500 hover:bg-blue-700 transition p-2"  onClick={handleAdd}>Add</button>
      </div>
      {taskError && (
        <p aria-live="polite">{taskError}</p>
      )}
      <ul>
        <Suspense fallback={<p>Data loading...</p>}>
        {
          todosArr.map(todo => (
           <TodoItem 
           key={todo.id}
           todo={todo}
           handleDelete={handleDelete}
           handleEdit={handleEdit}
           handleSave={handleSave}
           editId={editId === todo.id}
           editTask={editTask}
           setEditTask={setEditTask}
           handleToggle={handleToggle}
           />
          ))
        }
        </Suspense>
      </ul>
      {taskError && (
  <p className="text-red-500 mt-2" role="alert" aria-live="assertive">
    {taskError}
  </p>
)}
</section>
    </main>
  )


  }