const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;

// middle ware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xktvg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    await client.connect();
    const serviceCollection = client.db("geniusCar").collection("service");
    const orderCollection = client.db("geniusCar").collection("order");

    // auth
    app.post("/login", async (req, res) => {
      const user = req.body;
      const accesToken = jwt.sign(user, process.env.ACCESS_TOKEN, {
        expiresIn: "1d",
      });
      res.send({ accesToken });
    });

    // services api

    app.get("/service", async (req, res) => {
      const query = {};
      const cursor = serviceCollection.find(query);
      const services = await cursor.toArray();
      res.send(services);
    });

    app.get("/service/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const service = await serviceCollection.findOne(query);
      res.send(service);

      // post service
      app.post("/service", async (req, res) => {
        const newService = req.body;
        const result = await serviceCollection.insertOne(newService);
        res.send(result);
      });

      // delete service
      app.delete("/service/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await serviceCollection.deleteOne(query);
        res.send(result);
      });

      // order collection api

      app.post("/orders", async (req, res) => {
        const order = req.body;
        const result = await orderCollection.insertOne(order);
        res.send(result);
      });

      // =========================================
      // ===========(Have to do it again)=============
      // =========================================
      // 68-7 (advanced) Send jwt token in the server, verify and decode jwt token
      // =========================================
      // =========================================
      // =========================================

      app.get("/orders", async (req, res) => {
        const authHeader = req.headers.authorization;
        console.log(authHeader);
        const email = req.query.email;
        const query = { email: email };
        const cursor = orderCollection.find(query);
        const orders = await cursor.toArray();
        res.send(orders);
      });
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Hello World! 5");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
