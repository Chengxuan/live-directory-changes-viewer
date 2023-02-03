import { CircularProgress } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Directory } from "./Directory";
import { IFile } from "./interfaces";

const App: React.FC = () => {
  const [directoryInfo, setDirectoryInfo] = useState<IFile>();

  const fetchLatestState = () => {
    fetch("http://localhost:9000/directory")
      .then((res) => res.json())
      .then((file: IFile) => {
        setDirectoryInfo(file);
      })
      .catch((err) => console.log(err))
      .finally(() => setTimeout(fetchLatestState, 1000));
  };

  useEffect(() => {
    fetchLatestState();
  }, []);

  return (
    <div className="App">
      {directoryInfo ? (
        <Directory
          name={directoryInfo.name}
          type={directoryInfo.type}
          children={directoryInfo.children}
        ></Directory>
      ) : (
        <CircularProgress></CircularProgress>
      )}
    </div>
  );
};

export default App;
