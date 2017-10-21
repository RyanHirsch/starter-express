import mongoose from 'mongoose';
import db from '../db';

const { Schema } = mongoose;

export const schema = new Schema(
  {
    name: String,
    voicePhone: String,
    textPhone: String,
    groups: [Schema.Types.ObjectId],
    isActive: Boolean,
  },
  { timestamps: true }
);

export default db.model('Person', schema);
