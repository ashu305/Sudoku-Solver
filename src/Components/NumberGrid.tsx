import { RedoTwoTone } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import React from "react";
import { SelectedCellData } from "../Interfaces/SelectedCellData";

interface Props {
  dissableNumbers: boolean;
  selectedCell: SelectedCellData | undefined;
  valuesToAdd: number[][];
  setValuesToAdd: (value: number[][]) => void;
}
const NumberGrid: React.FC<Props> = ({
  dissableNumbers,
  selectedCell,
  valuesToAdd,
  setValuesToAdd,
}) => {
  const handelNumberClicked = (number: number) => {
    if (!selectedCell) {
      return;
    }
    const newValues = [...valuesToAdd];
    newValues[selectedCell.mainCell[0]][selectedCell.mainCell[1]] = number;
    setValuesToAdd(newValues);
  };

  return (
    <Grid sx={{ marginTop: "0.3rem", marginBottom: "0.45rem" }} container spacing={2}>
      {[...Array(9)].map((_, i) => {
        return (
          <Grid item xs={4} sm={4} md={4} lg={4} key={i}>
            <Box sx={setHowerEffect}>
              <Button
                onClick={() => handelNumberClicked(i + 1)}
                sx={numberContainer}
                variant="contained"
                style={{
                  backgroundColor: dissableNumbers ? "#01397a86" : "#0075fc85",
                  color: "#fff",
                }}
                disabled={dissableNumbers}
              >
                {i + 1}
              </Button>
            </Box>
          </Grid>
        );
      })}
    </Grid>
  );
};

const numberContainer = [
  {
    display: "flex",
    color: "#fff",
    padding: "0.3rem",
    width: { xs: "100%", md: "100%" },
    height: { md: "6rem" },
    borderRadius: "0.5rem",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",

    fontSize: { xs: "1.85rem", sm: "2rem", md: "3rem" },
  },
];

const setHowerEffect = [
  {
    borderRadius: "0.5rem",
    transform: "0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "#0011ff",
      zindex: "100",
    },
  },
];

export default NumberGrid;
