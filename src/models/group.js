import mongoose from 'mongoose';
import db from '../db';

const { Schema } = mongoose;

const schema = new Schema(
  {
    name: String,
    people: [Schema.Types.ObjectId],
  },
  { timestamps: true }
);

export default db.model('Group', schema);
