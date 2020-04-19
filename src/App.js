import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';
// import { logDOM } from '@testing-library/react';
import 'tachyons';
import Particles from 'react-particles-js';

// Require the client
import Clarifai from 'clarifai';

// initialize with your api key.
const app = new Clarifai.App({
  apiKey: 'fa3e1f141f1f49649af4210db5d3d3dd'
 });

 //Working with the background
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

class App extends Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
    // return console.log(event.target.value);
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
          this.state.input).then(
            function(response) {
              console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
            },
            function(err) {
              // there was an error
            }
          );
        }

  render() {
    return (
      <div className="App">
        <Particles className="particles"
          params={particleOptions}
        />
        <Navigation />
        <Logo/>
        <Rank/>
        <ImageLinkForm 
          onInputChange={this.onInputChange} 
          onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition imageUrl={this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
