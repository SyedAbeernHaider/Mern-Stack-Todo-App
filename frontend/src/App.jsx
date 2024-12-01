import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/navbar/navbar'
import Home from './components/home/home.jsx'
import Footer from "./components/footer/footer.jsx"
import About from "./components/about/about.jsx"
import Signup from "./components/signup/signup.jsx"
import Signin from "./components/signup/signin.jsx"
import Todo from "./components/todo/todo.jsx"
import { useDispatch } from "react-redux"
import { authActions } from './store'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Slider from './components/slider/slider.jsx'
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const id = sessionStorage.getItem("id");
    if (id) {
      dispatch(authActions.login());
    }

  }, [])


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>

      </Router>
      <Slider />
      <Footer />

    </>
  )
}

export default App
