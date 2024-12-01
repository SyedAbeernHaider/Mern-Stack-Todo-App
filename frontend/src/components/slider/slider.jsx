import React from 'react'
/*import html from '../../../public/html.png';
import css from '../../../public/css.png';
import js from '../../../public/javascript.png';
import react from '../../../public/react.png';
import node from '../../../public/nodejs.png';
import express from '../../../public/express.png';
import mongodb from '../../../public/mongo-db.png';*/
import "./slider.css"
import html from "./images/icons8-html-logo-48.png"
import css from "./images/icons8-css-logo-48.png"
import js from "./images/icons8-js-48.png"
import react from "./images/icons8-react-native-48.png"
import redux from "./images/icons8-redux-48.png"
import jwt from "./images/icons8-json-web-token-48.png"
import node from "./images/icons8-node-js-48.png"
import express from "./images/icons8-express-js-48.png"
import mongodb from "./images/icons8-mongo-db-48.png"


const Slider = () => {
  return (
    <>
      <h2><i>Technologies Used</i></h2>
      <div className='slider'>
        <div className="logos">
          <div class="logos-slide">
            <img src={html} />
            <img src={css} />
            <img src={js} />
            <img src={react} />
            <img src={redux} />
            <img src={jwt} />
            <img src={node} />
            <img src={express} />
            <img src={mongodb} />
          </div>

          <div class="logos-slide">

            <img src={html} />
            <img src={css} />
            <img src={js} />
            <img src={react} />
            <img src={redux} />
            <img src={jwt} />
            <img src={node} />
            <img src={express} />
            <img src={mongodb} />

          </div>

        </div>


      </div>
    </>
  )
}

export default Slider