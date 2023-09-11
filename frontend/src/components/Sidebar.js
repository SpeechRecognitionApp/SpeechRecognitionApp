import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Button,
} from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import HistoryIcon from "@mui/icons-material/History";
import AssistantIcon from "@mui/icons-material/Assistant";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const [selected, setSelected] = useState(null);
  const [expanded, setExpanded] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  const listItemStyle = {
    padding: "30px 20px",
    height: "25%",
    borderRadius: "10px",
    margin: "10px 0 0 0",
    backgroundColor: "#2196f3",
    color: "#ffffff",
    "&:hover": {
      backgroundColor: "#03a9f4",
      color: "#ffffff",
    },
    "&:active": {
      backgroundColor: "#283593",
      color: "#ffffff",
    },
  };

  const logoutButtonStyle = {
    position: "relative",
    bottom: 0,
    width: "80%",
    color: "white",
    margin: "200px 0 0 0", 
  };

  const onClick = (key) => {
    setSelected(key);
  };
  useEffect(() => {}, [onClick]);

  return (
    <Box sx={{ position: "relative", height: "100%" }}>
      <List>
        <ListItem component={Link} to="/account-info" sx={listItemStyle}>
          <ListItemIcon>
            <AccountBoxIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem component={Link} to="/transaction-history" sx={listItemStyle}>
          <ListItemIcon>
            <HistoryIcon />
          </ListItemIcon>
          <ListItemText primary="Transaction History" />
        </ListItem>
        <ListItem component={Link} to="/ai-assistant" sx={listItemStyle}>
          <ListItemIcon>
            <AssistantIcon />
          </ListItemIcon>
          <ListItemText primary="AI Assistant" />
        </ListItem>
        <ListItem component={Link} to="/account-management" sx={listItemStyle}>
          <ListItemIcon>
            <ManageAccountsIcon />
          </ListItemIcon>
          <ListItemText primary="Account Management" />
        </ListItem>
      </List>
      <Button
        variant="contained"
        style={logoutButtonStyle}
        startIcon={<LogoutIcon />}
        component={Link}
        to="/logout"
      >
        Log Out
      </Button>
    </Box>
  );
};

export default Sidebar;
