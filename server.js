const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://mrawaissultan2002:lyliohv6UmIwjJBw@my-project-cluster.gqwav.mongodb.net/?retryWrites=true&w=majority&appName=my-project-cluster', 
  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
});

const User = mongoose.model('User', userSchema);

// Routes
// Create a user
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send(user);
});

// Get all users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Update a user
app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(user);
});

// Delete a user
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.send({ message: 'User deleted' });
});

// Start the server
const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
