import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';
// import { logDOM } from '@testing-library/react';
import 'tachyons';
import Particles from 'react-particles-js';

const particleOptions = {
  particles: {
    number:{
      value:100,
      density:{
        enable:true,
        value_area: 500
      }
    }
  },
  interactivity:{
    detect_on: "window",
    events:{
      onhover:{
        enable: true,
        mode: 'repulse'
      }
    }
    
  }
}

function App() {
  return (
    <div className="App">
      <Particles className="particles"
        params={particleOptions}
      />
      <Navigation />
      <Logo/>
      <Rank/>
      <ImageLinkForm/>
      {/* {<FaceRecognition/>} */}
    </div>
  );
}

export default App;
