const Task = require("../models/task");
const debug = require("debug")("app:task-controller");

const consultTasks = async (req, res) => {
	const tasks = await Task.find();
	// debug(tasks);
	return res.json(tasks);
};

const consultTask = async (req, res) => {
	const task = await Task.findById(req.params.id);
	return res.json(task);
};

const createTask = async (req, res) => {
	const { title, description } = req.body;
	const task = new Task({ title, description });
	await task.save();
	return res.json({ status: "tarea guardada" });
};

const updateTask = async (req, res) => {
	const { title, description } = req.body;
	const newTask = { title, description };
	await Task.findByIdAndUpdate(req.params.id, newTask);
	return res.json({ status: "tarea actualizada" });
};

const deleteTask = async (req, res) => {
	await Task.findByIdAndRemove(req.params.id);
	return res.json({ status: "tarea eliminada" });
};

module.exports = { consultTasks, createTask, updateTask, deleteTask, consultTask };
