import { Box, Grid } from "@mui/material";
import { borderBottom } from "@mui/system";
import React, { useEffect } from "react";
import { isValid } from "../Constants/GenerateBoard";
import { arrayInArray } from "../Constants/Generic";
import { MyGridCell } from "../Interfaces/MyGridCell";
import { SelectedCellData } from "../Interfaces/SelectedCellData";

interface Props {
  autoCheck: boolean;
  myGridCell: MyGridCell[][] | undefined;
  selectedCell: SelectedCellData | undefined;
  setSelectedCell: (cell: SelectedCellData) => void;
  valuesToAdd: number[][] | undefined;
  setDisasbleNumbers: (value: boolean) => void;
  solvedGrid: number[][] | undefined;
}
const MyGrid: React.FC<Props> = ({
  myGridCell,
  setSelectedCell,
  selectedCell,
  valuesToAdd,
  setDisasbleNumbers,
  solvedGrid,
  autoCheck,
}) => {
  useEffect(() => {
    handelCellClicked(0, 0);
  }, []);

  const handelCellClicked = (rowIndex: number, colIndex: number): void => {
    checkForNumberDissable(rowIndex, colIndex);
    let mainCell = [rowIndex, colIndex];
    let subCells: number[][] = [];
    for (let i = 0; i < 9; i++) {
      if (i !== colIndex) {
        subCells.push([rowIndex, i]);
      }
    }

    for (let i = 0; i < 9; i++) {
      if (i !== rowIndex) {
        subCells.push([i, colIndex]);
      }
    }

    let newRow = Math.floor(rowIndex / 3) * 3;
    for (let i = 0; i < 3; i++) {
      let newCol = Math.floor(colIndex / 3) * 3;
      for (let j = 0; j < 3; j++) {
        if (newRow === rowIndex && newCol === colIndex) {
          newCol++;
        } else {
          subCells.push([newRow, newCol]);
          newCol++;
        }
      }
      newRow++;
    }
    setSelectedCell({ mainCell: mainCell, subCells: subCells });
  };

  const checkForNumberDissable = (rowIndex: number, colInedx: number) => {
    if (!myGridCell) {
      return;
    } else if (myGridCell[rowIndex][colInedx].value !== 0) {
      setDisasbleNumbers(true);
    } else {
      setDisasbleNumbers(false);
    }
  };

  const handelBorder = (i: number, j: number): string => {
    return "1px solid #8f8f8f";
  };

  const BottomCrossBorder = (i: number): string => {
    if (i === 2 || i === 5 || i === 8) {
      return "3.25px solid #535353";
    }
    return "1px solid #8f8f8f";
  };

  const RightCrossBorder = (j: number): string => {
    if (j === 2 || j === 5 || j === 8) {
      return "3.25px solid #535353";
    }
    return "1px solid #8f8f8f";
  };

  const handelColorOfFont = (num: number, i: number, j: number) => {
    if (!solvedGrid || !valuesToAdd || !myGridCell) return "black";

    if (myGridCell[i][j].value !== 0) return "#000000";

    if (autoCheck) {
      if (solvedGrid[i][j] === num) {
        return "#0097fc";
      } else {
        return "#ad0000";
      }
    } else {
      if (isValid(valuesToAdd, num, i, j)) {
        return "#0097fc";
      }
      return "#ad0000";
    }
  };

  if (!myGridCell || !valuesToAdd || !selectedCell || !solvedGrid) {
    return <div>Loading...</div>;
  } else {
    return (
      <Grid container spacing={0} sx={board}>
        {myGridCell?.map((row: MyGridCell[], i: number) => {
          return row.map((cell: MyGridCell, j: number) => {
            return (
              <Grid
                item
                key={j}
                sx={cellStyle}
                onClick={() => handelCellClicked(i, j)}
                xs={1.3}
                style={{
                  background: arrayInArray(selectedCell.subCells, [i, j])
                    ? "#ebebeb"
                    : selectedCell.mainCell[0] === i && selectedCell.mainCell[1] === j
                    ? "#acdcfc"
                    : "#fff",
                  border: handelBorder(i, j),
                  borderBottom: BottomCrossBorder(i),
                  borderRight: RightCrossBorder(j),
                }}
              >
                <Box
                  sx={{ textAlign: "center" }}
                  style={{
                    color: handelColorOfFont(valuesToAdd[i][j], i, j),
                  }}
                >
                  {valuesToAdd[i][j] === 0 ? "" : valuesToAdd[i][j]}
                </Box>
              </Grid>
            );
          });
        })}
      </Grid>
    );
  }
};

const board = [
  {
    marginTop: "1rem",
    marginBottom: { xs: "0rem", lg: "1rem" },
    marginLeft: "0.7em",
    width: { xs: "100%", md: "30rem", lg: "40rem", xl: "48rem" },
    borderLeft: "3.25px solid #535353",
  },
];
const cellStyle = [
  {
    background: "#fff",
    borderRadius: "0",
    border: "1px solid #585858",
    width: { xs: "2.2rem", sm: "2.3rem" },
    height: { xs: "3rem", sm: "3.25rem", md: "3.5rem", lg: "3.5rem", xl: "4rem" },
    fontSize: { xs: "2rem", lg: "3rem" },
    cursor: "pointer",
    "&:hover": {
      background: "#bebebe",
    },
  },
];
export default MyGrid;
