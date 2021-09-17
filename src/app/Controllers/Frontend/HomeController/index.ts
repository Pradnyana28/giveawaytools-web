import { Request, Response, NextFunction } from 'express';

import Controller from '@controllers/Controller';

class HomeController extends Controller {
    constructor() {
        super();
    }

    /**
     * Home Page
     * ------------------------------------------
     * Display the home page view to the template manager
     * ------------------------------------------
     * @param req express Request
     * @param res express Response
     * @param next express NextFunction
     */
    public Index = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        return res._render.html('index', {
            pageTitle: this.pageTitle(res.__('home')),
            pageMeta: {
                title: "Dafis Node.js Boilerplate",
                description: "Welcome to Dafis open source project. This project will help you to boost up your timeline by ignoring the boilerplate phase.",
                keyword: "open source, dafis boilerplate, typescript boilerplate, nodejs boilerplate"
            }
        });
    }

    /**
     * Giveaway
     * --------------------------------------------
     * Scrape the social media based on the app type
     * --------------------------------------------
     * @param req express request
     * @param res express Response
     * @param next express NextFunction
     */
    public Giveaway = (req: Request, res: Response, next: NextFunction): void => {
        return res._render.ajax({
            winner: []
        });
    }
}

export default new HomeController();