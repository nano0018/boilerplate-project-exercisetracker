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

  async exerciseCount(filter) {
    const count = await model.count(filter);
    return count;
  }

  async findExercisesByFilter(filter) {
		const exercises = await model.find(filter);
		return exercises;
	}
}

module.exports = ExerciseService;
