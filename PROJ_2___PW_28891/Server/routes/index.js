import { Router } from 'express';
import { usersRoutes } from './user.routes.js';
import { curriculumRoutes } from './curriculum.routes.js';

const api = Router();


// Mount user routes
api.use('/user', usersRoutes);

// Mount curriculum routes
api.use('/curriculum', curriculumRoutes);

export { api };
