import { check } from 'express-validator';

export default () => [
  check('ownerName', 'validation.required').notEmpty(),
  check('ownerEmail', 'validation.required').notEmpty(),
  check('giveawayName', 'validation.required').notEmpty(),
  check('postShortcode', 'validation.required').notEmpty(),
  check('validTaggedPeople', 'validation.required').notEmpty(),
  check('numberOfWinner', 'validation.required').notEmpty()
];