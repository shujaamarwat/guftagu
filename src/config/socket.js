const { authenticateUser } = require('../redux/authSlice');


const io = require('socket.io')(3001, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('login', (user, callback) => {
    // handle login logic here
    // assume authenticateUser is a function that returns a success response object with a token
    const authResponse = authenticateUser(user.username, user.password);
    callback(authResponse);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
