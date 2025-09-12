const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const webRoutes = require('./route/web.js');
const configViewEngine = require('./config/viewEngine');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine
configViewEngine(app);

// Routes
app.use('/api', webRoutes);  // chạy ok

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
