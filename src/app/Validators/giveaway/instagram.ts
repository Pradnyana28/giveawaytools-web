import { check } from 'express-validator';

export default () => [
  check('giveawayName', 'validation.required').notEmpty(),
  check('postShortcode', 'validation.required').notEmpty(),
  check('username', 'validation.required').notEmpty(),
  check('password', 'validation.required').notEmpty()
];