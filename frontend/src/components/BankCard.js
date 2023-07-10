import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const BankCard = () => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        margin: "0 0 0 0",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        borderRadius: 6,
        overflow: "hidden",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "0 0 10px 0",
        }}
      >
        <img
          src="/banklogo.png"
          alt="Bank Logo"
          style={{
            height: 50,
            position: "relative",
            top: 10,
          }}
        />
      </div>

      <div
        style={{
          // width: "100%",
          height: 260,
          background: "url(/bankcard.png)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          borderRadius: "10px",
          filter: "brightness(0.95)",
        }}
      />

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "16px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* <Typography
          variant="body2"
          color="text.secondary"
          gutterBottom
          sx={{ fontSize: "1.2rem", textAlign: "center" }}
        >
          Card Number:
        </Typography> */}
        <Typography
          variant="h5"
          component="div"
          gutterBottom
          sx={{ fontSize: "2rem", textAlign: "center", marginLeft: "20px" }}
        >
          1234 5678 9012 3456
        </Typography>

        {/* Bank Card Indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1rem" }}
          >
            Bank Name
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1rem" }}
          >
            Card Type: Credit Card
          </Typography>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1rem" }}
          >
            Expiry: 12/24
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontSize: "1rem" }}
          >
            Cardholder Name
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default BankCard;
