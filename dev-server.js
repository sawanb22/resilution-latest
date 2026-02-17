// Local development server for api/subscribe.js
// Run with: node local-api-server.js

import express from 'express';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env file
const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: join(__dirname, '.env') });

// Verify BREVO_API_KEY is loaded
if (!process.env.BREVO_API_KEY) {
  console.error('⚠️  BREVO_API_KEY not found in .env file');
  console.log('Current env keys:', Object.keys(process.env).filter(k => k.includes('BREVO')));
} else {
  console.log('✓ BREVO_API_KEY loaded from .env');
}

const app = express();
app.use(express.json());

// Import and mount the subscribe handler
import('./api/subscribe.js').then(mod => {
  const handler = mod.default;
  
  app.post('/api/subscribe', (req, res) => {
    console.log('📧 Subscribe request received:', req.body.email);
    handler(req, res);
  });

  const PORT = 8787;
  app.listen(PORT, () => {
    console.log(`✓ Local API server running at http://localhost:${PORT}`);
    console.log(`  Subscribe endpoint: http://localhost:${PORT}/api/subscribe`);
    console.log(`  Vite proxy will forward /api requests here`);
  });
}).catch(err => {
  console.error('Failed to load api/subscribe.js:', err);
  process.exit(1);
});
