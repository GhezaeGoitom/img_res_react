//src/App.js
import { useState } from "react";
import axios from "axios";


const App = () => {
     
    const [selectedImage, setSelectedImage] = useState();
     
    // This function will be triggered when the file field change
    const imageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
          setSelectedImage(e.target.files[0]);
        }
    };
 
    const onSubmit = (e) => {
        e.preventDefault() 
        alert(URL.createObjectURL(selectedImage))
        uploadImage(selectedImage)
    }
     

    const uploadImage = async file => {
      try {
        console.log("Upload Image", file);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "image/jpeg");
        const config = {
          responseType: 'arraybuffer',
          headers: {
            "Accept": "application/json",
            "content-type": "multipart/form-data"
          }
        };
        const url = "http://13.39.13.136:8000/apps/srcnn/enhance";
    
        const res = await axios.post(url, formData, config);
      const urls = window.URL.createObjectURL(new Blob([res.data]),{ type: "image/jpeg" });
			const link = document.createElement("a");
			link.href = urls;
			link.setAttribute("download", "file.jpeg");
			document.body.appendChild(link);
			link.click();      
      console.log("Result: ", res);
      } catch (error) {
        console.error(error);
      }
    };

    // This function will be triggered when the "Remove This Image" button is clicked
    const removeSelectedImage = () => {
        setSelectedImage();
    };
 
  return (
    <>
      <div className="container" >
        <h1> Image Enhancement </h1>
        <div className="row">
            <form onSubmit={ onSubmit } className="form-inline">
                <div className="form-group">
                <label> </label>
                <input type="file" className="form-control" onChange={imageChange} accept="image/jpeg"/>
                </div> <br/>
                <button type="submit" className="btn btn-success" >Enhance</button>
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
};
 
export default App;
 
// Just some styles
const styles = {
  preview: {
    marginTop: 50,
    display: "flex",
    flexDirection: "column",
  },
  image: { maxWidth: "100%", maxHeight: 320 },
  delete: {
    cursor: "pointer",
    padding: 15,
    background: "red",
    color: "white",
    border: "none",
  },
};

// function Download(arrayBuffer, type) {
//   var blob = new Blob([arrayBuffer], { type: type });
//   var url = URL.createObjectURL(blob);
//   window.open(url);
// }