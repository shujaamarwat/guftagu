import { mongoose } from "mongoose";

mongoose.connect('mongodb://localhost:27017/chat', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });


const userSchema = new mongoose.Schema({
  id: String,
  email: String,
  password: String
});

const messageSchema = new mongoose.Schema({
  from: String,
  text: String,
});

export const Message = mongoose.model('Message', messageSchema);
export const User = mongoose.model('User', userSchema);
