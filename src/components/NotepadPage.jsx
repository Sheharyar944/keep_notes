import React from "react";
import { useLocation } from "react-router";

const NotepadPage = ({ setTitle, setNote }) => {
  const location = useLocation();
  const note = location.state?.note;

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };
  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        margin: "auto",
        padding: "20px",
        backgroundColor: "#fff9c4",
        border: "1px solid #fdd835",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ marginBottom: "10px" }}>
        <input
          type="text"
          placeholder="title"
          defaultValue={note?.title}
          onChange={handleTitleChange}
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "18px",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
          }}
        />
      </div>
      <hr
        style={{
          border: "none",
          borderBottom: "2px solid #fdd835",
          margin: "10px 0",
        }}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <textarea
          defaultValue={note?.content}
          placeholder="start typing here..."
          onChange={handleNoteChange}
          style={{
            width: "100%",
            height: "300px",
            padding: "10px",
            fontSize: "16px",
            border: "none",
            outline: "none",
            resize: "none",
            backgroundColor: "transparent",
          }}
        ></textarea>
      </div>
    </div>
  );
};

export default NotepadPage;
