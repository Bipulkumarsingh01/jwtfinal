
const express = require('express');
const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;

const corsOptions = {
  origin: `http://localhost:3000`,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(express.json());
app.use(cors(corsOptions));

const connectionString = 'mongodb+srv://bipul6690:ePN6KhJJj5ys8B1C@cluster1.op8wymv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1';

mongoose
  .connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to the database', error);
    process.exit(1); 
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  console.log('Signup request received:', req.body);
  const { username, email, password, confirmPassword } = req.body;
  
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    console.log('User registered:', newUser);
    res.send('User registered successfully');
  } catch (error) {
    console.error('Error saving user:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/', async (req, res) => {
  console.log('Login request received:', req.query);
  const { email, password } = req.query;

  // Validation and checks
  if (!email || !password) {
    console.log('Invalid email or password');
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
   
    const user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid email or password');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid email or password');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    console.log('User logged in:', user);
    res.send('User logged in successfully');
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Server error' });
  }
});
 app.listen(port,()=>{
  console.log('User listening on port:', port);
 })