if (process.env.NODE_ENV !== 'production') require('dotenv').config();
const express = require('express');
const cors = require('cors');
const route = require('./routers/index');

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(route);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});
