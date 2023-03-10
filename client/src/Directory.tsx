import { FolderOpenOutlined } from "@mui/icons-material";
import { Grid, Typography, Stack } from "@mui/material";
import { useState } from "react";
import { File } from "./File";
import { IFile, IFileType } from "./interfaces";

interface Props {
  name: string;
  type: string;
  children: IFile[];
}

export const Directory: React.FC<Props> = ({ name, type, children }) => {
  const [entered, setEntered] = useState<boolean>(false);
  return (
    <Grid
      onMouseEnter={() => {
        setEntered(true);
      }}
      container
      gridAutoFlow="row"
      sx={{
        padding: "20px",
        borderStyle: "dotted",
        borderRadius: "30px",
        background: entered ? "" : "lightgreen",
      }}
    >
      <Stack
        direction="row"
        sx={{
          height: "20px",
          alignItems: "center",
          width: type === "root" ? "100vw" : undefined,
        }}
      >
        <FolderOpenOutlined></FolderOpenOutlined>
        <Typography variant="h6" sx={{ paddingLeft: "2px" }}>
          {name}
        </Typography>
      </Stack>

      {children.length > 0 ? (
        children.map((c) => {
          return (
            <Grid key={c.name} sx={{ padding: "12px", paddingTop: "40px" }}>
              {c.type === IFileType.directory ? (
                <Directory
                  name={c.name}
                  type={c.type}
                  children={c.children}
                ></Directory>
              ) : (
                <File
                  key={`${c.name}-${c.timestamp}`}
                  name={c.name}
                  path={c.path}
                ></File>
              )}
            </Grid>
          );
        })
      ) : (
        <Grid sx={{ padding: "12px", paddingTop: "40px" }}>
          <Typography variant="body2">Empty folder</Typography>
        </Grid>
      )}
    </Grid>
  );
};
