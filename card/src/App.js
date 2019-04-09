import React, { Component } from 'react';
import './App.css';
import {Image, CloudinaryContext, Transformation} from 'cloudinary-react';
import axios from 'axios';
import  {MenuItem,TwitterShareButton, IconMenu}  from 'react-share';

class App extends Component {
  state = {
    name: '',
    imageUpload: '',
    image: '',
    progress: 0
  }

  handleFile=(event)=>{
    this.setState({
      imageUpload: event.target.files[0]
    })
  }
  
  handleChange=(event)=>{
    this.setState({
      [event.target.name]: event.target.value
    })
  }

handlePost = (e)  => {
  e.preventDefault();
  let {name, imageUpload} = this.state;

  let data = new FormData();
  data.append('name', name);
  data.append('imageUpload', imageUpload)
  console.log(imageUpload)
  axios({
    method: 'post',
    url: 'http://localhost:3030/uploadFile',
    data: data,
    headers: {
      'Content-Type': 'mulTipart/form-data'
    },
}).then(res =>{
  console.log(res.data.create_upload)
  this.setState({
    image: res.data.create_upload.imageUpload
  })
})
}


render() {
  
  let {image, name} = this.state
  var text = name
  var url = image
  var fileName = url.substring(url.lastIndexOf('/')+1)
  console.log(fileName)
  // let pathname = new URL(url).pathname
  return (
    <div className="App">
        <form onSubmit={this.handlePost}>
          <input
            type="file"
            name="imageUpload"
            onChange={this.handleFile}
          />
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <button>Submit</button>
        </form>

         <CloudinaryContext
                cloudName={this.props.cloudName}
                uploadPreset={this.props.uploadPreset}
         >
        <Image publicId="conference_tag_yjtgac" >
        {/* <Transformation width="400" height="250" gravity="north"  /> */}
        <Transformation overlay={fileName} radius="100" width="120" x="6" y="18"/>
        {text ? <Transformation overlay={{fontFamily: "Arial", fontSize: 18, text}} y="120" />: <Transformation overlay={{fontFamily: "Arial", fontSize: 18, text: "name"}} y="120" />}
        {/* <Transformation overlay={{fontFamily: "Arial", fontSize: 18, text}} y="120" /> */}
        {/* <Transformation overlay={this.state.imageUpload.name} radius="100" width="120" x="6" y="24" /> */}
        </Image>

         {/* <Image publicId={image.imageUpload} >
        
        
      </Image> */}
        </CloudinaryContext>

        <button>
        <a href={`http://res.cloudinary.com/code-freak/image/upload/l_${fileName},r_100,w_120,x_6,y_18/l_text:Arial_18:${text},y_120/conference_tag_yjtgac`} download>
        Download
        </a>
        </button>
        {console.log(`http://res.cloudinary.com/code-freak/image/upload/l_${fileName},r_100,w_120,x_6,y_18/l_text:Arial_18:${text},y_120/conference_tag_yjtgac`)}
      </div>
    );
  }
}

export default App;
