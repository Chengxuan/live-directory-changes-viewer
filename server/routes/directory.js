var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");

const directoryToWatch =
  process.env.WATCH_DIR ||
  process.env.IDEN3_WORKDIR ||
  path.join(os.homedir(), "iden3");

var walkSync = function (
  dir,
  parent = {
    type: "root",
    name: directoryToWatch,
    children: [],
    path: "",
  }
) {
  files = fs.readdirSync(dir);
  files.forEach(function (file) {
    const nextDirPath = path.join(dir, file);
    const fileStatus = fs.statSync(nextDirPath);
    if (fileStatus.isDirectory()) {
      currentDir = {
        type: "dir",
        name: file,
        path: path.join(parent.path, file),
        children: [],
        timestamp: fileStatus.mtime,
      };
      parent.children.push(currentDir);
      walkSync(nextDirPath, currentDir);
    } else {
      parent.children.push({
        type: "file",
        name: file,
        path: path.join(parent.path, file),
        timestamp: fileStatus.mtime,
      });
    }
  });
  return parent;
};

router.get("/", function (req, res, next) {
  let directoryInfo = {};
  try {
    directoryInfo = walkSync(directoryToWatch);
  } catch (e) {
    console.log(e);
  }
  res.json(directoryInfo);
});

module.exports = {
  directoryToWatch,
  directoryRouter: router,
};
