import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import "./ImageUpload.css";

const ImageUpload = (props) => {
  const filePickerRef = useRef();
  const [file, setFile] = useState();
  const [isValid, setIsValid] = useState(false);
  const [previewUrl, setPreviewUrl] = useState();


  useEffect(()=>{
    if(!file){
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = ()=>{
      setPreviewUrl(fileReader.result)
    };
    fileReader.readAsDataURL(file)
  },[file])

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };
  const pickedHandler = (event) => {
    // console.log(event.target)
    let pickedFile;
    let fileIsvalid = isValid;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      fileIsvalid = true;
      setIsValid(true);
    } else {
      setIsValid(false);
      fileIsvalid = false;
    }
    props.onInput(props.id, pickedFile, fileIsvalid);
  };
  return (
    <div className="form-control">
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
         {previewUrl && <img src={previewUrl} alt="Preview" />}
         {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          Pick Image
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
