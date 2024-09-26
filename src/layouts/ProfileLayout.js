import React, { useState, useEffect } from "react";
import { Box, Button, Avatar, Container, Typography } from "@mui/material";
import { db, storage, auth } from "../firebase/services"; // Ensure Firebase setup is done
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Header from "./commen/Header";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export default function ProfileLayout({ user }) {
  const [userData, setUserData] = useState({}); // To store user info
  const [profilePic, setProfilePic] = useState(null); // Profile picture file
  const [profilePicURL, setProfilePicURL] = useState(""); // Profile picture URL
  const [loading, setLoading] = useState(true); // To manage loading state
  console.log(userData, loading);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser; // Assuming user is authenticated
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserData(userData);
          if (userData.profilePicURL) {
            setProfilePicURL(userData.profilePicURL);
          }
        }
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  console.log(user);

  // Handle profile picture change
  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };
  const handleLogout = async () => {
    try {
      await signOut(auth); // Firebase signOut method
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };
  // Handle profile picture upload
  const handleProfilePicUpload = async () => {
    if (profilePic) {
      try {
        const user = auth.currentUser;
        const storageRef = ref(storage, `profilePics/${user.uid}`);
        const snapshot = await uploadBytes(storageRef, profilePic);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Update the user's Firestore document with the profile picture URL
        await updateDoc(doc(db, "users", user.uid), {
          profilePicURL: downloadURL,
        });
        setProfilePicURL(downloadURL); // Set the new URL to display the image
        alert("Profile picture updated successfully!");
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  return (
    <div>
      <Header title="Profile" />
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 4,
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Profile
        </Typography>

        {/* Display Profile Picture */}
        <Avatar
          src={profilePicURL}
          alt="Profile"
          sx={{ width: 100, height: 100, mb: 2, border: "1px solid gray" }}
        />
        <Typography
          sx={{
            fontSize: "16px",
            fontWeight: "bold",
            textAlign: "left",
            color: "#000000",
            backgroundColor: "#F5F5FA",
            padding: "10px",
            borderRadius: "20px",
            mb: 3,
          }}
        >
          {" "}
          {user.email}
        </Typography>
        {/* Upload Profile Picture */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "16px",
          }}
        >
          <Typography variant="body1" sx={{ mb: 2 }}>
            Upload Profile Picture
          </Typography>

          {/* Styled input for file */}
          <input
            accept="image/*"
            style={{ display: "none" }} // Hide the default input
            id="profile-pic-upload"
            type="file"
            onChange={handleProfilePicChange}
          />
          <label htmlFor="profile-pic-upload">
            <Button
              variant="contained"
              component="span"
              sx={{
                textTransform: "none",
                borderRadius: "30px",
                backgroundColor: "#333",
              }}
            >
              Choose File
            </Button>
          </label>
        </Box>
        <Button
          variant="contained"
          onClick={handleProfilePicUpload}
          sx={{
            mb: 1,
            textTransform: "none",
            borderRadius: "30px",
            width: "300px",
            backgroundImage: "linear-gradient(135deg, #ff7e5f, #feb47b)",
          }}
        >
          Upload
        </Button>

        {/* Display User Info */}
        {/* <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={userData.name || ''}
        InputProps={{
          readOnly: true,
        }}
      /> */}

        <Box>
          <Button
            variant="outlined"
            onClick={handleLogout}
            sx={{
              mt: 1,
              textTransform: "none",
              borderRadius: "30px",
              width: "300px",
              //   backgroundImage: "linear-gradient(135deg, #ff7e5f, #feb47b)",
            }}
          >
            Logout
          </Button>
        </Box>
      </Container>
    </div>
  );
}
