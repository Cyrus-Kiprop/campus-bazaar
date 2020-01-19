import React from "react";
import "./imageUpload.css";

export default function ImageUpload({ files, setFiles }) {
  // handleImageUpload
  const handleImageUpload = event => {
    event.preventDefault();
    setFiles(event.target.files[0]);
  };

  return (
    <div className="Neon Neon-theme-dragdropbox">
      <input
        style={{
          zIndex: 999,
          opacity: 0,
          width: "320px",
          height: "200px",
          position: "absolute",
          right: "0px",
          left: "0px",
          marginRight: "auto",
          marginLeft: "auto"
        }}
        name="files"
        id="filer_input2"
        multiple="multiple"
        type="file"
        onChange={handleImageUpload}
      />
      <div className="Neon-input-dragDrop">
        <div className="Neon-input-inner">
          <div className="Neon-input-icon">
            <i className="fa fa-file-image-o" />
          </div>
          <div className="Neon-input-text">
            <h3>Drag&amp;Drop files here</h3>{" "}
            <span style={{ display: "inline-block", margin: "15px 0" }}>
              or
            </span>
          </div>
          <button className="Neon-input-choose-btn blue">Browse Files</button>
        </div>
      </div>
    </div>
  );
}
