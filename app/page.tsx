'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";

type todo={name:string,isDone:boolean};

let todos:todo[]=[];
todos.push({name:"Todo 1",isDone:false});
todos.push({name:"Todo 2",isDone:false});
todos.push({name:"Todo 3",isDone:false});
todos.push({name:"Todo 4",isDone:false});
todos.push({name:"Todo 5",isDone:false});


export default function Home() {
  const [checked,setChecked] = useState(false);
  const [text,setText]=useState("");
  const router = useRouter();
  const handleChecked = (x:todo)=>{
   
     const newTodos = todos.map(y=>{
      if(y.name===x.name)
      {
        y.isDone= !y.isDone;
        
      }
      return y;
    });
    todos = newTodos;
    setChecked(!checked);
  }

  const handleAddTodo = (refresh:()=>void)=>{
    todos.push({name:text,isDone:false});
    refresh();
    
  }

  const handleDeletTodo = (text:string,refresh:()=>void)=>
  {
    const newTodos = todos.filter(x=>{
      return x.name!=text
    });
    todos = newTodos;
    refresh();
  }

  return (
    <>
    <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
    <button value="Add Todo" onClick={()=>handleAddTodo(router.refresh)}>Add Todo</button>
      <ul>
          {todos.map((x)=>(
                <li key={x.name}>
                  <input type="checkbox" checked={x.isDone} onChange={()=>handleChecked(x)}/>{x.name}
                  <button onClick={(e)=>handleDeletTodo(x.name, router.refresh)}>Delete</button>
                </li>
          ))}
      </ul>
    </>
  )
}
