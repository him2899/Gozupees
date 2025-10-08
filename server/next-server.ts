import express from 'express';
import { createServer } from 'http'; 
import next from 'next';
import { log } from './vite';

const dev = process.env.NODE_ENV !== 'production';
const port = 3000; // Use port 3000 for Next.js to avoid conflict with Express

// Initialize Next.js
const nextApp = next({ dev });
const nextHandler = nextApp.getRequestHandler();

// Create Express app
const app = express();

// Prepare Next.js then start the server
nextApp.prepare().then(() => {
  // API routes that need to be handled by this server
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });
  
  // Proxy API requests to the Express backend running on port 5000
  app.use('/api/wordpress', (req, res, next) => {
    const proxyUrl = `http://localhost:5000${req.originalUrl}`;
    log(`Proxying request to: ${proxyUrl}`, 'next-proxy');
    
    fetch(proxyUrl)
      .then(async (response) => {
        const data = await response.json();
        res.json(data);
      })
      .catch((error) => {
        console.error('Error proxying API request:', error);
        res.status(500).json({ error: 'An error occurred while fetching data from the API' });
      });
  });

  // Let Next.js handle all other routes
  app.all('*', (req, res) => {
    return nextHandler(req, res);
  });

  // Create server and listen
  createServer(app).listen(port, () => {
    log(`Next.js server running at http://localhost:${port}`, 'next');
  });
}).catch((ex) => {
  console.error('Error starting Next.js server:', ex);
  process.exit(1);
});