import { Schema, model } from 'mongoose';


const schema = new Schema({
	title: String,
	content: String,
})

module.exports = model("Character", schema)
