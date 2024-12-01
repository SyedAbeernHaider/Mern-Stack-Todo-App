import React, { useEffect, useState } from 'react';
import TodoCard from "./todoCard";
import "./todo.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Update from './update';
import axios from 'axios';

const Todo = () => {
  const [Inputs, setInputs] = useState({ title: "", body: "" });
  const [Array, setArray] = useState([]);
  const [id, setId] = useState(sessionStorage.getItem("id") || null);
  const [toUpdateArray, setToUpdateArray] = useState(null);

  useEffect(() => {
    const handleStorageChange = () => {
      setId(sessionStorage.getItem("id"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const show = () => {
    document.getElementById("textarea").style.display = "block";
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title === '' || Inputs.body === "") {
      toast.error("Title or Body should not be empty");
    } else {
      if (id) {
        try {
          await axios.post(`${window.location.origin}/list/addTask`, { title: Inputs.title, body: Inputs.body, id });
          setInputs({ title: "", body: "" });
          toast.success("Your task is added");
        } catch (error) {
          toast.error("Failed to add task");
        }
      } else {
        setArray([...Array, Inputs]);
        setInputs({ title: "", body: "" });
        toast.success("Your task is added");
        toast.error("Your task is not saved || Sign up please");
      }
    }
  };

  const del = async (Cardid) => {
    if (!id) {
      toast.error("You need to be logged in to delete tasks");
      return; // Prevent further execution
    }

    try {
      await axios.delete(`${window.location.origin}/list/deleteTask/${Cardid}`, { data: { id } });
      toast.success("Your task has been deleted");
      // Refetch tasks to update the UI
      const response = await axios.get(`${window.location.origin}/list/getTask/${id}`);
      setArray(response.data.list);
    } catch (error) {
      toast.error("An error occurred while deleting the task");
    }
  };

  const update = (value) => {
    setToUpdateArray(Array[value]);
  };

  useEffect(() => {
    if (id) {
      const fetch = async () => {
        try {
          const response = await axios.get(`${window.location.origin}/list/getTask/${id}`);
          setArray(response.data.list);
        } catch (error) {
          toast.error("Failed to fetch tasks");
        }
      };
      fetch();
    }
  }, [id, submit]); // Refetch on `id` or `submit` changes

  const dis = (value) => {
    console.log(value);
    document.getElementById("todo-update").style.display = value;
  };

  return (
    <>
      <div className='todo'>
        <ToastContainer />
        <div className="todo-main container d-flex justify-content-center align-items-center my-4 ">
          <div className=" d-flex flex-column todo-inputs-div w-50 p-1">
            <input type='text' placeholder='TITLE' className='my-2 p-2 todo-inputs' onClick={show} onChange={change} name='title' value={Inputs.title} />
            <textarea type="text" placeholder='BODY' id='textarea' className='todo-inputs p-2' name='body' onChange={change} value={Inputs.body} />
          </div>
          <div className=' btn-div'>
            <button className='todo-btn px-4 py-1' onClick={submit}>Add</button>
          </div>
        </div>
        <div className="todo-body">
          <div className="container-fluid">
            <div className='row'>
              {Array && Array.map((item, index) => (
                <div className='col-lg-3 col-11  mx-lg-5 mx-3 my-2'
                  key={index}>
                  <TodoCard title={item.title} body={item.body}
                    id={item._id}
                    delid={del}
                    display={dis}
                    updateId={index}
                    toBeUpdate={update} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="todo-update" id='todo-update'>
        <div className="container update">
          <Update display={dis} update={toUpdateArray} />
        </div>
      </div>
    </>
  );
};

export default Todo;
