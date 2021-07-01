# Scratch Card Tracker
[Robyn F H Veitch](https://robynveitch.com/) © 2020 / 2021

https://radical-experienced-lobster.glitch.me/

A work in progress system to graph data concerning National Lottery scratch card stock levels over time, for the purpose of rapidly identifying discrepancies, and reconciling misscounts.

Not officially associated with or comissioned by Watirose & Partners or the National Lottery.

## Installation
```
$ git clone https://github.com/Oddert/wr-scratchcard-tracker.git
$ cd wr-scratchcard-tracker
$ npm run install_all
$ npm start
```
## Development
```
$ npm run dev
```
## Deployment
```
$ npm build
$ npm start
```

## Scripts
### Primary
| script | command | action
|--------|---------|----------|
| dev | concurrently \"npm run client_dev\" \"npm run server_dev\" | runs both the server and client in development mode |
| start | node dist/js/index.js | runs the server |
| build | npm run ts_build | builds the server by running tsc |
| install_all | npm run server_install && npm run client_install | runs both client and server installs |
| server_dev | concurrently \"npm run ts_watch\" \"npm run server_auto_restart\" | runs the typescript watcher and start the server in auto-restart mode |
| client_dev | cd client && npm run start | runs the client development server |
### Supporting
| script | command | action
|--------|---------|----------|
| client_install | cd client && npm i | installs the client development dependancies |
| server_install | npm i | installs the server dependancies |
| prebuild | npm run client_deploy && npm run ts_lint | runs before "build", creates a client build and copies it to the server, runs the ts linter |
| ts_lint | tslint -c tslint.json -p tsconfig.json --fix | runs the ts linter in fix mode |
| ts_watch | tsc -w | runs typescript in watch mode for development |
| ts_build | tsc | runs typescript |
| server_auto_restart | nodemon dist/js/index.js | runs the server with auto restart on file changes |
| client_build | cd client && npm run build | runs the client build process |
| client_deploy | npm run client_build && cp -r client/build dist/build | runs the client build process then copies the result to the server |
