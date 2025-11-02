const express = require('express');
const session = require('express-session');
const path = require('path');
require('dotenv').config();

const connectDB = require('./config/database');
const { startCleanupJob } = require('./utils/cronJobs');
const errorHandler = require('./middleware/errorHandler');

const uploadRoutes = require('./routes/upload');
const downloadRoutes = require('./routes/download');
const dashboardRoutes = require('./routes/dashboard');
const deleteRoutes = require('./routes/delete');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to database
connectDB();
// Start cleanup cron job
startCleanupJob();

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
// TODO: Add production session config
app.use(session({
  secret: process.env.SESSION_SECRET || 'devsecret',
  resave: false,
  saveUninitialized: true,
}));

// Routes
app.get('/', (req, res) => {
  res.render('index');
});
app.use('/upload', uploadRoutes);
app.use('/download', downloadRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/delete', deleteRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Page Not Found',
    message: 'The page you are looking for does not exist.',
    statusCode: 404
  });
});

// Error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
