const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./route/web');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// View engine
configViewEngine(app);

// Routes
app.use('/', webRoutes);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
