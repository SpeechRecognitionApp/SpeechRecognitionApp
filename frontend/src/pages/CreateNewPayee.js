import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TitleBox from "../components/TitleBox";
import { Grid, Box, TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import CreateNewPayeeRecorder from "../AudioRecorders/CreateNewPayeeRecorder";
import { useRef } from "react";

function CreateNewPayee() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [sortCode, setSortCode] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const [reference, setReference] = useState("");

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const sortCodeRef = useRef(null);
  const accountNumberRef = useRef(null);
  const referenceRef = useRef(null);
  const descroptionRef = useRef(null);

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

  const focusSortCodeTextField = () => {
    if (sortCodeRef.current) {
      sortCodeRef.current.focus();
    }
  };

  const focusAccountNumberTextField = () => {
    if (accountNumberRef.current) {
      accountNumberRef.current.focus();
    }
  };

  const focusReferenceTextField = () => {
    if (referenceRef.current) {
      referenceRef.current.focus();
    }
  };

  const focusDescriptionTextField = () => {
    if (descroptionRef.current) {
      descroptionRef.current.focus();
    }
  };

  const userId = "1"; // Assume this is the logged-in user's ID

  const handleSubmit = async () => {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !sortCode.trim() ||
      !accountNumber.trim()
    ) {
      alert("Please fill in all the required fields.");
      return;
    }

    // Format checks
    if (!/^\d+$/.test(sortCode)) {
      alert("Sort Code must be a number.");
      return;
    }

    if (!/^\d+$/.test(accountNumber)) {
      alert("Account Number must be a number.");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          second_name: lastName,
          account_number: accountNumber,
          user_id: userId,
          sort_code: sortCode,
          description: description,
          reference: reference,
        }),
      });

      if (response.status === 201) {
        alert("Contact created successfully");
        navigate("/selectamount");
      } else {
        alert("Failed to create contact");
      }
    } catch (error) {
      console.error("There was a problem with the server: ", error);
    }
  };

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
        <TitleBox buttonText="Create New Payee" />
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
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  label="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  inputRef={firstNameRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Sort Code"
                  value={sortCode}
                  onChange={(e) => setSortCode(e.target.value)}
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  inputRef={sortCodeRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  inputRef={lastNameRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Account Number"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  inputRef={accountNumberRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Payee Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  inputRef={descroptionRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Payee Reference"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  fullWidth
                  InputProps={{ style: textFieldStyle }}
                  inputRef={referenceRef}
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
            style={confirmButtonStyle}
            onClick={handleSubmit}
          >
            Confirm
          </Button>
        </Box>
      </Box>
      <CreateNewPayeeRecorder
        onFirstNameDetected={focusFirstNameTextField}
        onLastNameDetected={focusLastNameTextField}
        onSortCodeDetected={focusSortCodeTextField}
        onAccountNumberDetected={focusAccountNumberTextField}
        onReferenceDetected={focusReferenceTextField}
        onDescriptionDetected={focusDescriptionTextField}
      />
      <Footer />
    </Box>
  );
}

export default CreateNewPayee;
