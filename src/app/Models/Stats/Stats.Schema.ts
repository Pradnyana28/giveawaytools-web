import { model, Schema } from 'mongoose';

export const schemaName = 'Stats';

const StatsSchema = new Schema({
  giveawayName: String,
  postShortcode: String,
  ownerName: String,
  ownerEmail: String,
  options: Map,
  deletedAt: { type: Date, default: null }
}, { timestamps: true });

export default model(schemaName, StatsSchema);