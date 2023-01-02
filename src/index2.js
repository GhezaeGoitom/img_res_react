import React, { Component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';
const [selectedImage, setSelectedImage] = useState();

const onSubmit = (e) => {
  e.preventDefault() 
  alert(URL.createObjectURL(selectedImage))
}

class App extends Component {
  state = {
    file: null
  };

  handleFile(e) {
    let file = e.target.files[0];
    this.setState({ file });
  }
  async handleUpload(e) {
    console.log(this.state.file);
    await uploadImage(this.state.file);
  }



  render() {
    return (
      <>
        <div className="container" >
          <h1> ReactJS Show Image Preview before Uploading </h1>
          <div className="row">
              <form onSubmit={ onSubmit } className="form-inline">
                  <div className="form-group">
                  <label>Choose File to Upload: </label>
                  <input type="file" className="form-control" onChange={e => this.handleFile(e)} accept="image/jpg"/>
                  </div> <br/>
                  <button className="btn btn-success" onClick={e => this.handleUpload(e)}>Upload</button>
              </form>
   
          {selectedImage && (
            <div style={styles.preview}>
              <img
                src={URL.createObjectURL(selectedImage)}
                style={styles.image}
                alt="Thumb"
              />
              <button onClick={removeSelectedImage} style={styles.delete}>
                Remove This Image
              </button>
            </div>
          )}
          </div>
        </div>
      </>
    );
  }
}

const uploadImage = async file => {
  try {
    console.log("Upload Image", file);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("type", "image/jpeg");
    const config = {
      headers: {
        "Accept": "application/json",
        "content-type": "multipart/form-data"
      }
    };
    const url = "http://localhost:8000/apps/srcnn/enhance";

    const result = await axios.post(url, formData, config);
    console.log("REsult: ", result);
  } catch (error) {
    console.error(error);
  }
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
