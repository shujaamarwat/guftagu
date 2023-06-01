const { PubSub } = require("graphql-subscriptions");
const { Message } = require("./db.js");

const pubSub = new PubSub();

function rejectIf(condition) {
  if (condition) {
    throw new Error("Unauthorized");
  }
}

const resolvers = {
  Query: {
    messages: async (_root, _args, { userId }) => {
      rejectIf(!userId);
      const messages = await Message.find({});
      return messages;
    },
  },

  Mutation: {
    addMessage: async (_root, { input }, { userId }) => {
      rejectIf(!userId);
      const message = await Message.create({ from: userId, text: input.text});
      await Message.findOneAndUpdate({_id: message._id}, {id:message._id});
      pubSub.publish("MESSAGE_ADDED", { messageAdded: message });
      return message;
    },
  },

  Subscription: {
    messageAdded: {
      subscribe: (_root, _args, { userId }) => {
        rejectIf(!userId);
        return pubSub.asyncIterator("MESSAGE_ADDED");
      },
    },
  },
};

module.exports = resolvers