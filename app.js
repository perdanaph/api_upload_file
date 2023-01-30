if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const route = require('./routers/index');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.use(route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
