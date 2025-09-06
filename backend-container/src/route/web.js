import express from 'express';
import * as UserControllers from './controllers/UserControllers.js';
import * as ContainerControllers from './controllers/ContainerControllers.js';

const router = express.Router();

function AppRoute(app) {

    // user routers
    router.get('/users', UserControllers.getUsers);
    router.post('/users', UserControllers.insertUser);
    router.put('/users/:id', UserControllers.updateUser);
    router.delete('/users/:id', UserControllers.deleteUser);
    router.get('/users/:id', UserControllers.getUserById);

    // container routers
    router.get('/containers', ContainerControllers.getContainers);
    router.post('/containers', ContainerControllers.insertContainer);
    router.put('/containers/:id', ContainerControllers.updateContainer);
    router.delete('/containers/:id', ContainerControllers.deleteContainer);
    router.get('/containers/:id', ContainerControllers.getContainerById);

    app.use('/', router);
}

export default AppRoute;
