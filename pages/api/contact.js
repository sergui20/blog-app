/**
 * 17.1: Adding our contact API route.
 * This creates a new endpoint "/api/contact".
 */
import { MongoClient } from 'mongodb';

/**
 * This is the standard on how to build this endpoint.
 * We always have a handler which receives 'req' and 'res'. Similar to express handlers.
 * @param {*} req 
 * @param {*} res 
 */
async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    // Validate our data. Make sure users always send data.
    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    const newMessage = {
      email,
      name,
      message,
    };

    let client;

    /**
     * 19.1: Storing our messages to MongoDB.
     * So let's add a real database now. And for this, we'll again use MongoDB, 
     * because it's easy to use, very popular, scalable, works great with JavaScript,
     * and we can get started for free.
     * 
     * First, install "mongodb" npm package. Then, as you can see below we want to
     * connecto to MongoDB after we've validated the data from the client. You
     * need to get the "connection string" from the MongoDB console and plug in your
     * database credentials.
     */
    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ntrwp.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }
    
    // In here you could also switch to a different database by passing its name 
    // as an argument.
    const db = client.db();

    try {
      // Now in MongoDB, data is stored in so-called connections, 
      // and hence the db object has a collection method which allows us to work 
      // on a specific collection.
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage.id = result.insertedId;
    } catch (error) {
      client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }
}

export default handler;
