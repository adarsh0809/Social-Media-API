import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import http from 'http';
import { Server } from 'socket.io';

// Import routes
import AuthRoute from './Routes/AuthRoute.js';
import PostRoute from './Routes/PostRoute.js';
import CommentRoute from './Routes/CommentRoute.js';

// Initialize app and server
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Dotenv and mongoose setup
dotenv.config();
mongoose
  .connect(process.env.MONGO_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => 
    server.listen(process.env.PORT, () => 
      console.log(`Server is running on port ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error));

// Routes
app.use('/auth', AuthRoute);
app.use('/post', PostRoute);
app.use('/comment', CommentRoute); // Add Comment route

// Socket.io connection and event handling
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// New comment notification
import CommentModel from './Models/CommentModel.js';
export const addComment = async (req, res) => {
  try {
    const newComment = await CommentModel.create(req.body);
    // Emit the event for new comment
    io.emit("newComment", newComment); // Broadcast to all connected clients
    res.status(200).json(newComment);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Export server for testing
export default server;
export { io };
