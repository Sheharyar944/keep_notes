import React from "react";
import "./NotepadPage.css";
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
    <div className="notepad-container">
      <div className="notepad-title">
        <input
          type="text"
          placeholder={"title"}
          defaultValue={note?.title}
          className="title-input"
          onChange={handleTitleChange}
        />
      </div>
      <hr className="divider" />
      <div className="notepad-content">
        <textarea
          defaultValue={note?.content}
          placeholder={"start typing here..."}
          className="content-textarea"
          onChange={handleNoteChange}
        ></textarea>
      </div>
    </div>
  );
};

export default NotepadPage;
