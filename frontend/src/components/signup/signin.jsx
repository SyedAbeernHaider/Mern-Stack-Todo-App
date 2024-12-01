import React, { useState } from 'react';
import Head from './headingComp';
import './signup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store';

const signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Inputs, setInputs] = useState({ email: '', password: '' });

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${window.location.origin}/user/signin`, Inputs);

      // Check if the response includes the user ID
      if (response.data._id) {
        sessionStorage.setItem('id', response.data._id);  // Save the user ID
        alert("Signned in successfully")
        dispatch(authActions.login()); // Update Redux state
        navigate('/todo'); // Navigate to the To-Do app
      } else {
        // Show backend error messages if present
        alert(response.data.message || 'Sign-in failed. Please try again.');
      }
    } catch (error) {
      alert('wrong email or password');
    }
  };

  return (
    <div>
      <div className="signup">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 column col-left d-lg-flex justify-content-center align-items-center p-3 d-none">
              <Head first="Sign" second="In" />
            </div>
            <div className="col-lg-8 column d-flex justify-content-center align-items-center">
              <div className="d-flex flex-column w-100 p-5">
                <input
                  className="p-2 my-3 input-signup"
                  type="email"
                  name="email"
                  placeholder="Enter Your Email"
                  value={Inputs.email}
                  onChange={change}
                />
                <input
                  className="p-2 my-3 input-signup"
                  type="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={Inputs.password}
                  onChange={change}
                />
                <button className="btn p-2" onClick={submit}>
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default signin;

