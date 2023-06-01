const { mongoose } = require("mongoose");

mongoose.connect(process.env.REACT_APP_GOOGLEAPIKEY, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

const messageSchema = new mongoose.Schema({
  from: String,
  text: String,
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message
