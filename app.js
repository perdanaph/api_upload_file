if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const route = require('./routers/index');

const app = express();
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(express.json());

app.use(route);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
