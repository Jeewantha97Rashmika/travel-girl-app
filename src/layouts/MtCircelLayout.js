import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Alert ,
} from "@mui/material";
import Header from "./commen/Header";
import ContactCard from "../components/ContactCard";
import { db, storage } from "../firebase/services"; // import Firebase storage
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"; // import Firebase storage methods

export default function MtCircelLayout() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [tpNumber, setTpNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null); // State for profile photo
  const [contacts, setContacts] = useState([]); // State to store fetched contacts

  // Function to open the dialog
  const handleClickOpen = () => {
    setOpen(true);
  };

  // Function to close the dialog
  const handleClose = () => {
    setOpen(false);
  };

  // Function to handle file input change
  const handlePhotoChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  // Function to save data to Firebase
  const handleSave = async () => {
    if (name && tpNumber && profilePhoto) {
      try {
        // Step 1: Upload the photo to Firebase Storage
        const storageRef = ref(storage, `profilePhotos/${profilePhoto.name}`);
        const snapshot = await uploadBytes(storageRef, profilePhoto);
        const photoURL = await getDownloadURL(snapshot.ref);

        // Step 2: Save the contact data in Firestore with the photo URL
        await addDoc(collection(db, "contacts"), {
          name: name,
          tpNumber: tpNumber,
          photoURL: photoURL, // Save the photo URL
        });

        // Reset the form and close the dialog
        setName("");
        setTpNumber("");
        setProfilePhoto(null);
        setOpen(false);
        <Alert severity="success">This is a success Alert.</Alert>

        // Fetch the updated data after adding a new contact
        fetchContacts();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      alert("Please fill in all fields and upload a photo.");
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
  const handleDeleteContact = async (id) => {
    try {
      // Code to delete the contact from Firestore
      await deleteDoc(doc(db, "contacts", id));
      <Alert severity="success">This is a success Alert.</Alert>
      fetchContacts(); // Refresh the contact list
    } catch (error) {
      console.error("Error deleting contact: ", error);
    }
  };
  
  return (
    <div>
      <Header title="My Circle" />
      <Container>
        {/* Map over the fetched contacts and render ContactCard for each */}
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            name={contact.name}
            tpNumber={contact.tpNumber}
            photoURL={contact.photoURL} 
            onDelete={() => handleDeleteContact(contact.id)}// Pass photo URL to ContactCard
          />
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
            borderRadius: "20px",
            background: "linear-gradient(135deg, #ff7e5f, #feb47b)", // Gradient color
          }}
          onClick={handleClickOpen} // Open the dialog when clicked
        >
          Add Contact
        </Button>
      </Box>

      {/* Dialog for adding Name, TP Number, and Photo */}
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
          {/* Add input for profile photo */}
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            style={{ marginTop: "16px" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
