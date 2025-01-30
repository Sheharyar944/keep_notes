import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import NotesList from "../components/NotesList";
import { AuthContext } from "../components/AuthContext";
import { useContext } from "react";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://127.0.0.1:8000/notes/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("notes response", response.data);
      setNotes(response.data);
    } catch (error) {
      console.log("error fetching notes", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchNotes();
    }
  }, []);

  if (user && loading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Loading Notes...
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100vw" }}>
      <Box
        //   border={1}
        sx={{ margin: "0vh 40vh", height: "70vh" }}
      >
        <NotesList notes={notes} />
      </Box>
    </Box>
  );
};

export default Home;
