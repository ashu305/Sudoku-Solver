import { Box, Container, Divider, Typography } from "@mui/material";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <>
      <Box sx={{ height: "80px" }}>
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Typography sx={Text} variant="h2" component="h1">
            Welcome To Sudoku Solver
          </Typography>
        </Container>
      </Box>
      <div />
      <Divider sx={divider} />
    </>
  );
};

const Text = [
  {
    color: "white",
    fontSize: { xs: "1.65rem", sm: "2.75rem", md: "3.25rem", lg: "4rem" },
    marginTop: { xs: "1rem", sm: "1.5rem", md: "1.2rem", lg: "2rem" },
  },
];
const divider = [
  {
    height: "1px",
    background: "#A1A1A1",
    marginTop: { xs: "-1.25rem", sm: "0.2rem", md: "0.25rem", lg: "2rem" },
  },
];
export default Navbar;
