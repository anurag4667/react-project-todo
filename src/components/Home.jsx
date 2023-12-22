import React, { useEffect, useState }  from 'react'
import Task from './Task'
const Home = () => {
  
  const ls = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];

  const [tasks,setTask] = useState(ls);
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");

  
  const submitHandler = (e)=>{
    e.preventDefault();

    setTask([...tasks,{title,description}]);
    setTitle("");
    setDescription("");
  }

  const deleteTask = (index)=>{
    const arr = tasks.filter((val,i)=>{
      return i !== index;
    });

    setTask(arr);
  }

  useEffect(() => {
    localStorage.setItem("tasks" , JSON.stringify(tasks))
  }, [tasks])
  

  return (
    <div className='container'>
      <form onSubmit={submitHandler}>
        <input 
        type="text" 
        placeholder='Title'
        required
        value = {title}
        onChange = {(e) => setTitle(e.target.value)}
        />
        <textarea 
        placeholder='Description'
        required
        value = {description}
        onChange = {(e) => setDescription(e.target.value)}></textarea>

        <button type = "submit">ADD</button>
      </form>
      
      {tasks.map((item,index)=>{
        return <Task 
        key = {index} 
        title = {item.title} 
        description={item.description }
        deleteTask={deleteTask}
        index={index}
        />;
      })}
    </div>
  )
}

export default Home