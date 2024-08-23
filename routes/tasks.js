const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Task = require('../models/Task');
const Subtask = require('../models/Subtask');

const router = express.Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Crear una nueva tarea
router.post('/', authMiddleware, async (req, res) => {
  const { title, description } = req.body;

  try {
    const newTask = new Task({
      title,
      description,
      user: req.user.id,
    });

    const task = await newTask.save();
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Actualizar una tarea
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, description, status } = req.body;

  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    task = await Task.findByIdAndUpdate(req.params.id, { $set: { title, description, status } }, { new: true });
    res.json(task);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Eliminar una tarea
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: 'Task not found' });

    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await Task.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Obtener todas las subtareas de una tarea específica
router.get('/:taskId', authMiddleware, async (req, res) => {
  try {
    const subtasks = await Subtask.find({ task: req.params.taskId });
    res.json(subtasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Crear una nueva subtarea
router.post('/', authMiddleware, async (req, res) => {
  const { title, task } = req.body;

  try {
    const existingTask = await Task.findById(task);
    if (!existingTask) return res.status(404).json({ msg: 'Task not found' });

    const newSubtask = new Subtask({
      title,
      task,
    });

    const subtask = await newSubtask.save();
    res.json(subtask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Actualizar una subtarea
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, status } = req.body;

  try {
    let subtask = await Subtask.findById(req.params.id);
    if (!subtask) return res.status(404).json({ msg: 'Subtask not found' });

    subtask = await Subtask.findByIdAndUpdate(req.params.id, { $set: { title, status } }, { new: true });
    res.json(subtask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Eliminar una subtarea
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    let subtask = await Subtask.findById(req.params.id);
    if (!subtask) return res.status(404).json({ msg: 'Subtask not found' });

    await Subtask.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Subtask removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;