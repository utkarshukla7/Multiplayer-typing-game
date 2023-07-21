import {Server} from 'socket.io'


export default function initializeSocket(server) {
  const io = new Server(server);

  io.on('connection', (socket) => {

    const playerId = socket.id;

    // Emit the current text to the newly connected player
    socket.emit('text', currentText);

    // Listen for user input updates from the frontend
    socket.on('input', (inputText) => {
      // Update game state, check correctness, update scores, etc.
      // Broadcast updates to all players
      io.emit('update', updatedGameState);
    });

    // Handle player disconnection
    socket.on('disconnect', () => {
      // Remove the disconnected player from the game state
      // Broadcast updates to all remaining players
      io.emit('update', updatedGameState);
    });
  });
}



