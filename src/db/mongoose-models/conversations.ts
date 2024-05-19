import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

// Define the conversation schema
const conversationSchema = new mongoose.Schema({
  // _id: ObjectId,
  type: String,
  group_name: String,
  group_id: String,
  is_created_by_owner: Boolean,
  practice: {
    id: Number,
    name: String,
    logo: String,
  },
  icon: String,
  participants: [
    {
      user_id: Number,
      is_room_admin : Boolean,
      is_deleted : Boolean,
      first_name: String,
      last_name: String,
      profile: String,
    },
  ],
  archived_for: [ Number ],
  messages: [
    {
      _id: ObjectId,
      user_id: Number,
      message: String,
      created_at: Date,
      updated_at: Date,
      is_system_message: Boolean,
      is_edited: Boolean,
      is_deleted: Boolean,
      parent_message: {
        _id: ObjectId,
        id : String,
        user_id: Number,
        message: String,
        created_at: Date,
        updated_at: Date,
      },
      forwarded_from: Number,
      read_by: [Number],
      deleted_for: [Number],
    },
  ],
});

// Create the conversation model
const ConversationModel = mongoose.model('Conversation', conversationSchema);

// module.exports = ConversationModel;
export default ConversationModel;