const model = require("../models/user.model");

class UserService {
	async findUser(username) {
		const user = await model.findOne({ username });
		return user;
	}

	async findUserById(id) {
		const user = await model.findById(id);
		return user;
	}

	async findUsers() {
		const users = await model.find();
		return users;
	}

	async postUser(username) {
		const user = await this.findUser(username);
		if (user) {
			return { msg: "User already exists", user };
		}
		const newUser = await model.create({ username });
		return newUser;
	}
}

module.exports = UserService;
