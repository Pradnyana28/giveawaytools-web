import { Router, Application } from 'express';

import route from '@routes/route';

import HomeController from '@app/Controllers/Frontend/HomeController';
import validate from '@utils/validator';
import * as validation from '@app/Validators';

/**
 * @param app is an express application
 * @param cache is optional parameter to cache a route
 */
export default (app: Application, cache): Router => {
    const router = Router();

    /**
     * @route Front End
     * -------------------------------------------
     * Initiate your front end web route here
     * -------------------------------------------
     */
    router.get(route.home, cache, HomeController.Index);
    router.get(route.giveaway, validation.instagram, validate, HomeController.Giveaway);

    return router;
}