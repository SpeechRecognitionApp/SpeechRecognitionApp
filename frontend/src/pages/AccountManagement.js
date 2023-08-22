import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";
import { Grid, Box, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import AccountManageRecorder from "../AudioRecorders/AccountManageRecorder";
import { useRef,useState,useEffect } from "react";
import swal from "sweetalert";
import axios from "axios";

function AccountManagePage() {
  const [userData, setUserData] = useState({
    first_name: "",
    second_name: "",
    email: "",
    house_name: "",
    street_line: "",
    postcode: "",
  });

  

  

  useEffect(() => {
    // Fetch user info when the component mounts
    fetchUserInfo();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/user/1");
      const user = response.data;
      setUserData(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const updateUserDetails = async () => {
    try {
      await axios.put("http://127.0.0.1:5000/user/1", userData);
      console.log("User details updated successfully!");
    } catch (error) {
      console.error("Error updating user details:", error);
    }
    swal({
      timer:3000,
      title:"Success",
      text:"Details have been updated",
      icon:"success"});
    
  };

  const navigate = useNavigate();

  const firstNameRef = useRef(null); 
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const houseRef = useRef(null);
  const streetRef = useRef(null);
  const postRef = useRef(null);

  const focusFirstNameTextField = () => {
    if (firstNameRef.current) {
      firstNameRef.current.focus();
    }
  };

  const focusLastNameTextField = () => {
    if (lastNameRef.current) {
      lastNameRef.current.focus();
    }
  };

  const focusEmailTextField = () => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  };

  const focusStreetTextField = () => {
    if (streetRef.current) {
      streetRef.current.focus();
    }
  };

  const focusHouseTextField = () => {
    if (houseRef.current) {
      houseRef.current.focus();
    }
  };

  const focusPostTextField = () => {
    if (postRef.current) {
      postRef.current.focus();
    }
  };



  



  function handleClick2() {
    window.location.reload();
  }
  const textFieldStyle = {
    backgroundColor: "white",
    // width: "80%",
    borderRadius: "8px",
  };

  const resetButtonStyle = {
    backgroundColor: "#6B6BFF",
    color: "white",
    marginRight: "10px",
    textTransform: "none",
    borderRadius: "8px",
    width: 150,
  };

  const confirmButtonStyle = {
    backgroundColor: "#7AFF6F",
    color: "white",
    textTransform: "none",
    borderRadius: "8px",
    width: 150,
  };

  return (
    <Box
      sx={{
        display: "grid",
        backgroundColor: "#F5F5F9",
        gridTemplateRows: "auto 1fr auto",
        height: "100vh",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Header />
      <Box
        sx={{
          display: "grid", // Make this Box a grid container
          gridTemplateRows: "auto auto auto", // Divide the container into three equal rows
          gap: "20px", // Add some gap between rows
          padding: "20px", // Add some padding around the Box
        }}
      >
        <TitleBox buttonText="Account Management" />
        <Container maxWidth="lg">
          <Box
            sx={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Grid
              container
              spacing={5}
              // sx={{ mt: 5, mx: "auto", height: "55vh" }}
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                fullWidth
                InputProps={{ style: textFieldStyle }}
                value={userData.first_name} // Use value prop instead of defaultValue
                inputRef={firstNameRef}
                onChange={(e) => setUserData({ ...userData, first_name: e.target.value })} // Handle changes
              />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Street Line"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  value={userData.street_line}
                  inputRef ={streetRef}
                  onChange={(e) => setUserData({ ...userData, street_line: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  value={userData.second_name}
                  inputRef ={lastNameRef}
                  onChange={(e) => setUserData({ ...userData, second_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="House Name"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  value={userData.house_name}
                  inputRef={houseRef}
                  onChange={(e) => setUserData({ ...userData, house_name: e.target.value })}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Email Address"
                  fullWidth
                  value={userData.email}
                  InputProps={{ style: textFieldStyle }}
                  inputRef={emailRef}
                  onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                  
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Post code"
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  inputRef={postRef}
                  value = {userData.postcode}
                  onChange={(e) => setUserData({ ...userData, postcode: e.target.value })}
                  
                  

                />
              </Grid>
            </Grid>
          </Box>
        </Container>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
        >
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "20px",
              width: "20%",
              padding: "10px",
              textAlign: "center",
              fontSize: 28,
              marginBottom: "auto",
            }}
            style={resetButtonStyle}
            onClick={handleClick2}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#fff",
              color: "#000",
              borderRadius: "20px",
              width: "20%",
              padding: "10px",
              textAlign: "center",
              fontSize: 28,
              marginBottom: "auto",
            }}
            style={confirmButtonStyle}
            onClick={updateUserDetails}
          >
            Confirm
          </Button>
        </Box>
      </Box>
      <AccountManageRecorder onFirstKeywordDetected={focusFirstNameTextField}
        onLastKeywordDetected={focusLastNameTextField}
        onEmailKeywordDetected={focusEmailTextField}
        onStreetKeywordDetected={focusStreetTextField}
        onHouseKeywordDetected={focusHouseTextField}
        onPostKeywordDetected={focusPostTextField}
        onConfirmKeywordDetected={updateUserDetails}
        
        />
      <Footer />
    </Box>
  );
}

export default AccountManagePage;