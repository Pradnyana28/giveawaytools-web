import { Router, Application } from 'express';
import route from '@routes/route';
import HomeController from '@app/Controllers/Frontend/HomeController';

const router = Router();

/**
 * @param app is an express application
 * @param cache is optional parameter to cache a route
 */
export default (app: Application, cache): Router => {
    router.get(route.home, cache, HomeController.Index);

    return router;
}