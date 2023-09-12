const model = require("../models/exercise.model");

class ExerciseService {
	async findUserExercises(id) {
		const exercises = await model.findOne({ username });
		return exercises;
	}

	async findExercises() {
		const exercises = await model.find();
		return exercises;
	}

	async postUserExercises(exercise) {
		const newExercise = await model.create({ exercise });
		return newExercise;
	}
}

module.exports = ExerciseService;
