const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', require('./routes/web'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  app.use(cors());
});
