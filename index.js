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

    app.get("/getUser", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      // console.log("line61 back", users);
      res.send(users);
    });

    app.get("/getUser/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const cursor = await userCollection.findOne(query);
      console.log("line69 back", cursor);
      res.send(cursor);
    });

    /* app.delete("/deleteUser", async (req, res) => {
      const query = {};
      const result = await userCollection.deleteMany(query);
      console.log("back 75", result);
    }); */

    app.delete("/deleteUser/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      console.log("back 81", result);
      res.send(result);
    });

    app.post("/postUser", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      user.id = result.insertedId;
      console.log("89 back", user, result);
      res.send(result);
    });

    try {
      app.put("/getUser/:id", async (req, res) => {
        const id = req.params.id;
        const filter = { _id: ObjectId(id) };
        // const options = { upsert: true };
        const updateDoc = req.body;
        console.log("back 100", updateDoc);
        const result = await userCollection.updateOne(
          filter,
          updateDoc
          // options
        );

        console.log("line 99 back", result, req.body);
        res.send(result);
      });
    } catch (error) {
      console.log(error, "line 98 back");
    }
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
