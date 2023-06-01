const { mongoose } = require("mongoose");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../..', '.env') });

mongoose.connect(process.env.REACT_APP_MONGOOSEURL, {
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
