import React from "react";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Box, IconButton, Tooltip } from "@mui/material";
import { SelectedCellData } from "../Interfaces/SelectedCellData";

interface Props {
  dissableNumbers: boolean;
  selectedCell: SelectedCellData | undefined;
  valuesToAdd: number[][];
  setValuesToAdd(value: number[][]): void;
  solvedGrid: number[][] | undefined;
}

const Extras: React.FC<Props> = ({
  valuesToAdd,
  setValuesToAdd,
  selectedCell,
  solvedGrid,
  dissableNumbers,
}) => {
  const handelRemoveClicked = () => {
    if (!selectedCell) return;

    const newValuesToAdd = [...valuesToAdd];
    newValuesToAdd[selectedCell.mainCell[0]][selectedCell.mainCell[1]] = 0;
    setValuesToAdd(newValuesToAdd);
  };

  const handelHintClicked = () => {
    if (!selectedCell || !solvedGrid) return;

    const newValuesToAdd = [...valuesToAdd];
    const correctValue: number = solvedGrid[selectedCell.mainCell[0]][selectedCell.mainCell[1]];
    solvedGrid.map((row, rowIndex) => {
      row.map((cell, colIndex) => {
        if (cell === correctValue && newValuesToAdd[rowIndex][colIndex] === 0) {
          newValuesToAdd[rowIndex][colIndex] = correctValue;
        }
      });
    });
    setValuesToAdd(newValuesToAdd);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
      <Tooltip title="Remove">
        <IconButton disabled={dissableNumbers} onClick={handelRemoveClicked} sx={ButtonStyle}>
          <DeleteOutlineOutlinedIcon sx={StyleIcon} />
        </IconButton>
      </Tooltip>
      {/* <Tooltip title="Note">
        <IconButton sx={ButtonStyle}>
          <DescriptionOutlinedIcon sx={StyleIcon} />
        </IconButton>
      </Tooltip> */}
      <Tooltip title="Hint">
        <IconButton disabled={dissableNumbers} onClick={handelHintClicked} sx={ButtonStyle}>
          <LightbulbOutlinedIcon sx={StyleIcon} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

const ButtonStyle = [
  {
    background: "#E4E4E4",
    borderRadius: "50%",
    marginTop: "0.7em",
    width: { md: "60px", sm: "65px", xl: "80px" },
    height: { md: "60px", sm: "65px", xl: "80px" },
    marginLeft: "2em",
    marginRight: "2em",
    opacity: "0.8",

    "&:hover": {
      background: "#E4E4E4",
    },
  },
];

const StyleIcon = [
  {
    width: { sm: "2.3rem", md: "2.8rem", xl: "3.5rem" },
    height: { sm: "2.3rem", md: "2.8rem", xl: "3.5rem" },
    color: "#1f2eff",
  },
];

export default Extras;
