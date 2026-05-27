const express = require('express');
const fs = require('fs');
const path = require('path');
const os = require('os');

const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3003');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use(express.json({ limit: '10mb' }));

const configPath = path.join(os.homedir(), '.config', 'karabiner', 'karabiner.json');

function handleError(err, res) {
  console.error('Server error:', err);
  res.status(500).json({ error: err.message || 'Unknown error' });
}

app.get('/api/config', (req, res) => {
  try {
    if (!fs.existsSync(configPath)) {
      return res.status(404).json({ error: 'karabiner.json not found' });
    }
    const data = fs.readFileSync(configPath, 'utf-8');
    res.json(JSON.parse(data));
  } catch (err) {
    handleError(err, res);
  }
});

app.post('/api/config', (req, res) => {
  try {
    const dir = path.dirname(configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let existing = {};
    if (fs.existsSync(configPath)) {
      existing = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
    }

    const incomingCm = req.body?.profiles?.[0]?.complex_modifications;
    if (!existing.profiles || existing.profiles.length === 0) {
      existing.profiles = [{ complex_modifications: incomingCm || { parameters: {}, rules: [] } }];
    } else if (incomingCm) {
      existing.profiles[0].complex_modifications = incomingCm;
    }

    fs.writeFileSync(configPath, JSON.stringify(existing, null, 2), 'utf-8');
    res.json({ ok: true });
  } catch (err) {
    handleError(err, res);
  }
});

app.listen(PORT, () => {
  console.log(`Karabiner config server running on http://localhost:${PORT}`);
});
