const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const UserService = require("./service/users.service");
const userServiceImpl = new UserService();
const ExerciseService = require("./service/exercise.service");
const exerciseServiceImpl = new ExerciseService();

require("dotenv").config();

app.use(cors());

app.use(express.static("public"));
app.use(bodyParser.urlencoded());
app.use(express.json());

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/users", async (req, res) => {
	try {
		const users = await userServiceImpl.findUsers();
		res.json(users);
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

app.post("/api/users", async (req, res) => {
	const { username } = req.body;
	if (username === undefined || username.length == 0) {
		return res.json({ error: "Username is required" });
	}
	try {
		const user = await userServiceImpl.postUser(username);
		if (user.msg == "User already exists") {
			return res.json({ error: "Username already taken" });
		}
		res.status(201).json(user);
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

app.post("/api/users/:id/exercises", async (req, res) => {
	const { description, duration, date } = req.body;
	const id = req.params._id || req.body[":_id"];
	if (!id) {
		return res.json({ error: "ID is required" });
	}
	if (!description) {
		return res.json({ error: "Description is required" });
	}
	if (!duration) {
		return res.json({ error: "Duration is required" });
	}

	try {
		const user = await userServiceImpl.findUserById(username);
		if (!user) {
			return res.json({ error: "User ID not found" });
		}
		const exercise = await exerciseServiceImpl.postExercise();
		res.status(201).json(exercise);
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

app.get("/api/users/:id/logs", async (req, res) => {
	const { from, to, limit } = req.query;
	const id = req.params._id || req.body[":_id"];
	if (!id) {
		return res.json({ error: "ID is required" });
	}
	from =
		new Date(from) === "Invalid Date"
			? res.json("Invalid Date Entered")
			: from;
	to =
		new Date(to) === "Invalid Date" ? res.json("Invalid Date Entered") : to;
	limit =
		new Number(limit) === isNaN(limit)
			? res.json("Invalid Limit Entered")
			: limit;
  try {
    const user = await userServiceImpl.findUserById(username);
		if (!user) {
			return res.json({ error: "User ID not found" });
		}
  } catch (error) {

  }
});

/**
 * App start
 */
require("./db/config");
const listener = app.listen(process.env.PORT || 3000, () => {
	console.log("Your app is listening on port " + listener.address().port);
});
