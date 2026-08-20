import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './server/config/db';
import { ENV } from './server/config/env';
import apiRouter from './server/routes/apiIndex';
import { rateLimiter, securityHeaders, requestLogger } from './server/middleware/security';
import { logger } from './server/utils/logger';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // 1. Connect to Database (MongoDB or high-performance cached fallback)
  await connectDB();

  // 2. Global Middlewares
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));
  app.use(securityHeaders);
  app.use(rateLimiter);
  app.use(requestLogger);

  // 3. Static Files (Uploads)
  const uploadsPath = path.join(process.cwd(), 'uploads');
  app.use('/uploads', express.static(uploadsPath));

  // 4. API Routes
  app.use('/api/v1', apiRouter);
  app.use('/api', apiRouter); // Alias for convenience

  // 5. Global Error Handling Middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    logger.error('Unhandled API Exception:', err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal server error occurred.',
      error: ENV.NODE_ENV === 'development' ? err.stack : undefined
    });
  });

  // 6. Vite Middleware Integration (SPA support)
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  // 7. Bind to 0.0.0.0:3000
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Options IT Ltd Server running on http://0.0.0.0:${PORT}`);
    console.log(`📡 REST API Documentation available at http://0.0.0.0:${PORT}/api/v1/docs`);
  });
}

startServer().catch((err) => {
  console.error('Fatal error starting Options IT Ltd server:', err);
});
