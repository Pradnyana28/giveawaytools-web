import { Router, Application } from 'express';
import route from './route';

import validate from '@utils/validator';
import * as validation from '@app/Validators';
import HomeController from '@app/Controllers/Frontend/HomeController';

const router = Router();

/**
 * @param app is an express application
 * @param cache is optional parameter to cache a route
 */
export default (app: Application, cache: any): Router => {
    router.post(route.giveaway, validation.instagram(), validate, HomeController.Giveaway);

    return router;
}