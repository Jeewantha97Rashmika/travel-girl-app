import React, { useEffect, useState } from "react";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Header from "./commen/Header";
import ContactCard from "../components/ContactCard";
import { db } from "../firebase/services";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function MtCircelLayout() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [tpNumber, setTpNumber] = useState("");
  const [contacts, setContacts] = useState([]); // State to store fetched contacts

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to save data to Firebase
  const handleSave = async () => {
    if (name && tpNumber) {
      try {
        await addDoc(collection(db, "contacts"), {
          name: name,
          tpNumber: tpNumber,
        });
        // Reset the form and close the dialog
        setName("");
        setTpNumber("");
        setOpen(false);
        alert("Data saved successfully!");

        // Fetch the updated data after adding a new contact
        fetchContacts();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      alert("Please fill in both fields.");
    }
  };

  // Function to fetch contacts from Firebase
  const fetchContacts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "contacts"));
      const contactList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactList);
    } catch (error) {
      console.error("Error fetching contacts: ", error);
    }
  };

  // Fetch contacts when the component mounts
  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div>
      <Header title="My Circle" />
      <Container>
        {/* Map over the fetched contacts and render ContactCard for each */}
        {contacts.map((contact) => (
          <ContactCard key={contact.id} name={contact.name} tpNumber={contact.tpNumber} />
        ))}
      </Container>

      {/* Invite button */}
      <Box
        sx={{
          position: "fixed",
          bottom: "100px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "90%",
        }}
      >
        <Button
          variant="contained"
          sx={{
            width: "100%",
          }}
          onClick={handleClickOpen} // Open the dialog when clicked
        >
          Invite
        </Button>
      </Box>

      {/* Dialog for adding Name and TP Number */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="TP Number"
            type="tel"
            fullWidth
            value={tpNumber}
            onChange={(e) => setTpNumber(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
