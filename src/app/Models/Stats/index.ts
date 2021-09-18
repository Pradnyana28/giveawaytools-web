import { Model } from 'mongoose';

import BaseModel from '@models/BaseModel';
import StatsSchema from './Stats.Schema';

interface IStatsParams {
  giveawayName: string;
  postShortcode: string;
  ownerName: string;
  ownerEmail: string;
  numberOfTaggedPeople: number;
  respectedWinner: number;
}

class Stats extends BaseModel {
  public model: Model<any>;

  constructor() {
    super();
    this.model = StatsSchema;
  }

  async saveStats(data: IStatsParams) {
    try {
      const existStat = await this.find({ giveawayName: data.giveawayName, ownerEmail: data.ownerEmail });
      if (existStat) {
        return;
      }

      const { numberOfTaggedPeople, respectedWinner, ...rest } = data;

      const options = new Map();
      options.set('numberOfTaggedPeople', numberOfTaggedPeople);
      options.set('respectedWinner', respectedWinner);

      await this.create({
        ...rest,
        options
      });
      this.logger.info('Stats successfully saved', options, __filename);
    } catch (err) {
      this.logger.error('Stats failed to save', err, __filename);
    }
  }
}

export default new Stats();