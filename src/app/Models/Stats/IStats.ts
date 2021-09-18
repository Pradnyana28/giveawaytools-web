import { Document } from 'mongoose';

export default interface IStats extends Document {
  giveawayName: string;
  postShortcode: string;
  ownerName: string;
  ownerEmail: string;
  options: Map<any, any>;
}