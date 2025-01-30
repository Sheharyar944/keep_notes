import { Box, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";
import { AuthContext } from "./AuthContext";

const NoteCard = ({ note, onClick }) => {
  return (
    <Tooltip title="click to edit note" placement="top">
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "16px",
          margin: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#f9f9f9",
        }}
        onClick={onClick}
      >
        <h3 style={{ margin: "0 0 8px 0", fontSize: "18px" }}>
          {note.title || "Untitled Note"}
        </h3>
        <p style={{ margin: "0", fontSize: "14px", color: "#555" }}>
          {note.content.length > 50
            ? `${note.content.substring(0, 50)}...`
            : note.content}
        </p>
      </div>
    </Tooltip>
  );
};

const NotesList = ({ notes }) => {
  const { userDetails } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box
      //   border={1}
      style={{ padding: "16px", fontFamily: "Arial, sans-serif" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "24px",
            marginLeft: "8px",
          }}
        >
          {userDetails?.username || "My Notes"}
        </h1>
        <Tooltip title="Create note" placement="right-end">
          <IconButton
            sx={{
              marginRight: "8px",
              backgroundColor: "primary.main", // Change to any color you want
              color: "white", // Icon color
              width: 56, // Increase button size
              height: 56, // Keep it a perfect circle
              borderRadius: "50%", // Makes it circular
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            }}
            onClick={() => navigate("/add-note")}
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
          gap: "16px",
        }}
      >
        {notes &&
          notes.map((note, index) => (
            <NoteCard
              key={index}
              note={note}
              onClick={() => navigate("/editor", { state: { note } })}
            />
          ))}
      </div>
    </Box>
  );
};

export default NotesList;
