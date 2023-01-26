# live-directory-changes-viewer

This is a simple react webapp that lists all directories and files inside a given directory. 

To help spotting recently created & updated files in the watched directory, all the directories and files are colored in lightgreen when changes are detected and reset to the default background color once you hover over them.


## Running locally

To start the webapp locally:

### Build and start server
```bash
cd server
npm i
export WATCH_DIR=path_to_the_directory
npm start
```

### Build and start UI
```bash
cd client
npm i
npm start
```

### Build and start both on mac
The following script opens two new terminals to build and run UI & server simultaneously:
```bash
export ws_root_dir=$(pwd)
osascript -e "tell application \"Terminal\" to do script \"cd $ws_root_dir/server && npm i && export WATCH_DIR=path_to_the_directory && npm start\""
osascript -e "tell application \"Terminal\" to do script \"cd $ws_root_dir/client && npm i && npm start\""
```