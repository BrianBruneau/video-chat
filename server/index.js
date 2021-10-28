const http = require('http');
const redis = require('socket.io-redis');

const app = require('./app');
const config = require('./config');

const server = http.createServer(app);

app.io.attach(server); // Attach server to the socket
app.io.origins([config.ORIGINS]); // Origin socket configuration

// We configure the adapter through configuration, so we can get 
// all the values from enviornment variables from deploying.
app.io.adapter(redis({
  host: config.REDIS_HOST,
  post: config.REDIS_PORT
}))

server.listen(config.PORT, () => {
  console.log(`Server listening on port ${config.PORT}`);
});
