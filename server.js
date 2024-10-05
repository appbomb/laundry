const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

app.post('/api/updateStatus', (req, res) => {
  const { id, status } = req.body;
  const logEntry = `Machine ${id} status updated to ${status}\n`;

  fs.appendFile('machine_status.log', logEntry, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return res.status(500).send('Server error');
    }
    res.send('Status updated');
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});