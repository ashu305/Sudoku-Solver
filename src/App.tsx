import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar";
import Header from "./Components/Header";
import "./App.css";
import MainSection from "./Components/MainSection";
import { generateUnsolvedBoard } from "./Constants/GenerateUnsolvedBoard";
import { MyGridCell } from "./Interfaces/MyGridCell";

const App: React.FC = () => {
  const [valuesToAdd, setValuesToAdd] = useState<number[][]>(generateUnsolvedBoard());
  const [showSteps, setShowSteps] = useState(false);
  const [autoCheck, setAutoCheck] = useState(true);
  const [myGrid, setMyGrid] = useState<MyGridCell[][] | undefined>(undefined);

  return (
    <div className="container">
      <Navbar />
      <Header
        myGrid={myGrid}
        showSteps={showSteps}
        autoCheck={autoCheck}
        setAutoCheck={setAutoCheck}
        setShowSteps={setShowSteps}
        valuesToAdd={valuesToAdd}
        setValuesToAdd={setValuesToAdd}
      />
      <MainSection
        autoCheck={autoCheck}
        myGrid={myGrid}
        setMyGrid={setMyGrid}
        valuesToAdd={valuesToAdd}
        setValuesToAdd={setValuesToAdd}
      />
    </div>
  );
};

export default App;
