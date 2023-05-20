const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

// JSON DATA
const courseData = require("./data/data.json");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/courses", (req, res) => {
  res.send(courseData);
});
// this one is working but i want to learn how to do it with query instead of params
app.get("/courses/:category", (req, res) => {
  const categoryName = req.params.category;
  const filteredCourses = courseData.filter((c) => c.category == categoryName);
  res.send(filteredCourses);
});

/* app.get("/courses/:category", (req, res) => {
  const categoryName = req.query.category;
  const filteredCourses = courseData.filter((c) => c.category == categoryName);
  res.send(filteredCourses);
});
 */

// this one sends details of an individual course from course data
app.get("/courseDetail/:id", (req, res) => {
  const courseId = req.params.id;
  const courseDetails = courseData.find((c) => c.id == courseId);
  res.send(courseDetails);
});

const uri = "mongodb://localhost:27017";
// const uri ="mongodb+srv://usingUser:L31VFqfnYjBd59Nf@cluster0.hgty8ov.mongodb.net/?retryWrites=true&w=majority";
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
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    const userCollection = client.db("simpleNode").collection("users");

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const result = await cursor.toArray();
      console.log("61 back", result);
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = userCollection.find(query);
      const result = await cursor.toArray();
      console.log("69 back", result);
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const cursor = await userCollection.insertOne(user);
      console.log("77 back", cursor);
      res.send(cursor);
    });
    app.delete("/deleteUsers", async (req, res) => {
      const query = {};
      const cursor = await userCollection.deleteOne(query);
      console.log("line 81", cursor);
      res.send(cursor);
    });
  } catch (err) {
    console.log(err);
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch((err) => console.log(err));

app.use("/test", async (req, res) => {
  console.log(req);
});

app.listen(port, () => {
  console.log("listening on port " + port);
});
