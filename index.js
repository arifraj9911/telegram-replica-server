const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors({
  origin: [
    "http://localhost:5173",
  ]
}));

// arifraj9911
// 3MAjkVdYRKYEC5LO

const uri =
  "mongodb+srv://arifraj9911:3MAjkVdYRKYEC5LO@cluster0.byhl9o0.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const chatCollection = client.db("dbChat").collection("chat");

    app.get("/chats", async (req, res) => {
      const result = await chatCollection.find().toArray();
      res.send(result);
    });
    app.get("/reply-chats", async (req, res) => {
      const result = await replyChatCollection.find().toArray();
      res.send(result);
    });

    // app.post('/chats',async(req,res)=>{
    //     const message = req.body;
    //     const result = await replyChatCollection.insertOne(message);
    //     res.send(result);
    // })

    app.put("/chats/:id", async (req, res) => {
      const id = req.params.id;
      const replyMessage = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };

      const updateDoc = {
        $set: {
          reply: replyMessage,
        },
      };

      const result = await chatCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Telegram replica server running");
});

app.listen(port, () => {
  console.log(`telegram replica running on port ${port}`);
});
