import { Router } from 'express';
import { apiRoutes } from './api/index.js';

export const routes = Router();

/**
 * all all the downstream api routes under /api
 */
routes.use('/api', apiRoutes);

// no other routes to add at this time
