import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const registeruser = () => {
    navigate("/registerd-users");
  };

  const registernow = () => {
    navigate("/register-now");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" sx={{ padding: 0 }} color="secondary">
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              padding: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              CodeFusion
            </Typography>
            <Box display="flex" alignItems="center">
              <Button color="inherit" onClick={registernow}>
                Register Now
              </Button>
              <Button color="inherit" onClick={registeruser}>
                Registerd Users
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
export default Header;
