import { Express } from 'express';
import next from 'next';
import { Server } from 'http';
import { log } from './vite';

const dev = process.env.NODE_ENV !== 'production';

export async function setupNextJs(app: Express, server: Server) {
  try {
    // Initialize the Next.js application
    const nextApp = next({ dev });
    const nextHandler = nextApp.getRequestHandler();
    
    // Prepare the Next.js application
    await nextApp.prepare();
    log("Next.js initialized successfully", "next");

    // Explicitly handle Next.js static files
    app.get('/_next/*', (req, res) => {
      return nextHandler(req, res);
    });
    
    // Create a catch-all route that passes requests to Next.js
    app.use((req, res, next) => {
      // Special handling for Next.js API routes
      // Let Next.js handle API routes that aren't explicitly defined in Express
      const isApiRoute = req.originalUrl.startsWith('/api/');
      
      // Check if there's a route handler in Express for this API route
      if (isApiRoute) {
        const hasExpressHandler = app._router.stack.some((layer: any) => {
          if (!layer.route) return false;
          return layer.route.path === req.path && layer.route.methods[req.method.toLowerCase()];
        });
        
        // If there's no Express handler, let Next.js handle it
        if (!hasExpressHandler) {
          log(`Forwarding API request to Next.js: ${req.originalUrl}`, "next");
          return nextHandler(req, res);
        }
        
        // Otherwise, let Express handle it
        return next();
      }
      
      // Forward non-API request to Next.js
      return nextHandler(req, res);
    });
    
    log("Next.js middleware added successfully", "next");
    return nextApp;
  } catch (err) {
    console.error('Error setting up Next.js:', err);
    throw err;
  }
}