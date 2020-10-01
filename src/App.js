import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  //Update the information of the new user received.
  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  } 
  //We use componentDidMount to check the connection
  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }
  //I can use then(console.log) instead of then(data => console.log(data))
  
  

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace);
    console.log(width,height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      topRow: clarifaiFace.top_row * height
    }
  }

  //Assign leftCol, rightCol, bottomRow and topRow to the box State
  displayFaceBox = (box) => {
    // console.log(box)
    this.setState({ box: box})
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
          this.state.input)
          .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
          .catch(err => console.log(err));
              //console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
              
        }

  onRouteChange = (route) => {
    //Making some adjustment for the Navigation bar
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn:true})
    }

    this.setState({route: route})
  }

  render() {
    const {isSignedIn, imageUrl, route, box} = this.state;
    return (
      <div className="App">
        <Particles className="particles"
          params={particleOptions}
        />
        
        <Navigation isSignedIn = {isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home' ?
          <div>
            <Logo/>
            <Rank/>
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition box = {box} imageUrl={imageUrl}/>
          </div>
          : (
            route === 'signin' ?
              <Signin onRouteChange={this.onRouteChange}/> 
            :
              <Register onRouteChange={this.onRouteChange}
                        loadUser = {this.loadUser}/> 
          )
          
          }
      </div>
    );
  }
}

export default App;
