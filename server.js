const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;

// Static file declaration
app.use(express.static(path.join(__dirname, 'dist')));

// Route setup
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/dist/index.html'));
})

// Start server
app.listen(port, (req, res) => {
  console.log(`server listening on port: ${port}`);
});
