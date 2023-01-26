import { Dialog, DialogTitle, Grid, Paper, Typography } from "@mui/material";
import { ArticleOutlined } from "@mui/icons-material";
import { useState } from "react";
import Editor from "@monaco-editor/react";
interface Props {
  name: string;
  path: string;
}

export const File: React.FC<Props> = ({ name, path }) => {
  const [fileContent, setFileContent] = useState<string | undefined>();
  const [showFileContent, setShowFileContent] = useState<boolean>(false);
  const [entered, setEntered] = useState<boolean>(false);

  const fetchFileContent = () => {
    if (typeof fileContent === "undefined") {
      fetch("http://localhost:9000/filecontent/" + path)
        .then((res) => res.text())
        .then((text) => {
          setFileContent(text);
          setShowFileContent(true);
        })
        .catch((err) => console.log(err));
    } else {
      setShowFileContent(true);
    }
  };
  return (
    <Grid
      onMouseEnter={() => {
        setEntered(true);
      }}
    >
      <Paper
        sx={{
          background: entered ? "" : "lightgreen",
        }}
        onClick={fetchFileContent}
        elevation={2}
      >
        <ArticleOutlined></ArticleOutlined>
        <Typography>{name}</Typography>
      </Paper>
      <Dialog
        maxWidth="xl"
        onClose={() => setShowFileContent(false)}
        open={showFileContent}
      >
        <DialogTitle>{name}</DialogTitle>
        <Editor
          theme="light"
          defaultLanguage="json"
          value={fileContent}
          options={{
            readOnly: true,
            minimap: {
              enabled: false,
            },
            lineNumbers: "off",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            scrollbar: {
              alwaysConsumeMouseWheel: false,
            },
          }}
          height="80vh"
          width="50vw"
        />
      </Dialog>
    </Grid>
  );
};
