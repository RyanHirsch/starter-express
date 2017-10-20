import mongoose from 'mongoose';

const { Schema } = mongoose;

const groupsSchema = new Schema({
  name: String,
  people: [Schema.Types.ObjectId],
  timestamps: true,
});

export default groupsSchema;
