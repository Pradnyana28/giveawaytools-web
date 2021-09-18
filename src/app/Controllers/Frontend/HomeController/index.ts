import { Request, Response, NextFunction } from 'express';

import Controller from '@controllers/Controller';
import Stats from '@app/Models/Stats';
import browser from '@utils/browser';
import SocMedService from '@app/Services/SocMedService';
import Instagram from '@app/Services/Instagram';
import { IComment, ILike } from '@app/Services/Instagram.interface';
import { chooseWinners, countTaggedPeople } from '@utils/common';

interface IGiveawayBody {
    ownerName: string;
    ownerEmail: string;
    giveawayName: string;
    postShortcode: string;
    validTaggedPeople: string;
    numberOfWinner: string;
}

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
    public Giveaway = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const data: IGiveawayBody = req.body;
        const app: string = req.params.app;

        this.logger.info('Start processing giveaway winners', { app, data }, __filename);

        // Save the giveaway information
        Stats.saveStats({
            ...data,
            numberOfTaggedPeople: Number(data.validTaggedPeople),
            respectedWinner: Number(data.numberOfWinner)
        });

        // Init browser
        const browserInstance = await browser();
        if (!browserInstance) {
            return res._render.isFail().json(null);
        }

        let classInjector = null;
        if (app === 'instagram') {
            classInjector = new Instagram({
                browser: browserInstance,
                is2faEnabled: false,
                tenantName: data.giveawayName
            });
        }
        const session = new SocMedService(classInjector);
        await session.boot();

        // Collecting likes
        const likes = await session.getPostLikes(data.postShortcode);
        const allLikes = likes.reduce((prev, next) => prev.concat(next.data), []) as ILike[];

        if (!allLikes.length) {
            return res._render.setErrors(['Opps! No likes! We can\'t decide it yet.']);
        }

        // Collecting comments
        const comments = await session.getPostComments(data.postShortcode);
        const allComments = comments.reduce((prev, next) => prev.concat(next.data), []) as IComment[];

        if (!allComments.length) {
            return res._render.setErrors(['Oops, no comments yet!']);
        }

        // get the comment stext
        const onlyValidComments = allComments.filter((comment) => countTaggedPeople(comment.text, Number(data.validTaggedPeople)));

        if (!onlyValidComments.length) {
            return res._render.setErrors(['Oops! Seems like we haven\'t found the winner yet.']);
        }

        const validUserWithCommentLike = onlyValidComments.filter((comment) => allLikes.some((like) => like.username === comment.owner.username));

        if (!validUserWithCommentLike.length) {
            return res._render.setErrors(['Oops! Seems no one followed the rules.']);
        }

        const theWinners = chooseWinners(validUserWithCommentLike, Number(data.numberOfWinner));

        return res._render.ajax({
            winner: theWinners
        });
    }
}

export default new HomeController();