import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Update = ({ display, update }) => {
  const [Inputs, setInputs] = useState({ title: '', body: '' });

  useEffect(() => {
    if (update) {
      setInputs({ title: update.title, body: update.body });
    }
  }, [update]);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    await axios.put(`${window.location.origin}/list/updateTask/${update._id}`, Inputs)
      .then(() => { toast.success("Your task is Updated"); })
    display("none");
  };

  return (
    <div className='p-5 d-flex justify-content-center align-items-start flex-column update'>
      <h3>Update Your Task</h3>
      <input type='text'
        className='todo-inputs w-100 my-4 p-3'
        value={Inputs.title}
        name='title'
        onChange={change} />
      <textarea
        className='todo-inputs w-100 p-3'
        value={Inputs.body}
        name='body'
        onChange={change} />
      <div>
        <button className='btn btn-dark my-4' onClick={submit}>Update</button>
        <button className='btn btn-danger my-4 mx-3' onClick={() => display("none")}>Close</button>
      </div>
    </div>
  );
};

export default Update;
