# flemeth-web
Flemeth web interface as hapi plugin


## Development

#### Install dependencies
```
npm install -g gulp bower
```

#### JS rebuilds Linux
This command runs webpack dev server under linux (dowsn't work for me on windows)
```
gulp dev-server
```
Webpack is running on port 8090 and upon changes to js sources, your browser is automatically reloaded

#### JS rebuilds Windows
```
webpack --watch --config ./gulp_tasks/webpack.settings.js
```
This runs webpack in watch and build mode. No auto-reload of browser

#### Dev server with proxy
```
node testServer.js
```
This runs hapi dev server, registering UI plugin and creating proxy to dev daemon running on 8098
Server runs on port 8097


### Dev tools Todo:
 - [ ] CSS rebuilds
 - [ ] Assets rebuild
 - [ ] Env variables for config
