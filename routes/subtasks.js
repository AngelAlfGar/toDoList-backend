const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Subtask = require('../models/Subtask');
const router = express.Router();

// Obtener subtareas por ID de tarea
router.get('/task/:taskId', authMiddleware, async (req, res) => {
  try {
    const subtasks = await Subtask.find({ task: req.params.taskId });
    res.json(subtasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Crear una nueva subtarea para una tarea
router.post('/task/:taskId', authMiddleware, async (req, res) => {
  const { title } = req.body;
  const taskId = req.params.taskId;

  try {
    const newSubtask = new Subtask({
      title,
      task: taskId,
    });

    const subtask = await newSubtask.save();
    res.json(subtask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Modificar una subtarea
router.put('/:id', authMiddleware, async (req, res) => {
  const { title, status } = req.body;

  try {
    let subtask = await Subtask.findById(req.params.id);
    if (!subtask) return res.status(404).json({ msg: 'Subtask not found' });

    subtask.title = title || subtask.title;
    subtask.status = status || subtask.status;

    await subtask.save();
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

    await Subtask.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Subtask removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Cambiar el estado de una subtarea
router.patch('/:id/status', authMiddleware, async (req, res) => {
  try {
    let subtask = await Subtask.findById(req.params.id);
    if (!subtask) return res.status(404).json({ msg: 'Subtask not found' });

    subtask.status = subtask.status === 'pending' ? 'completed' : 'pending';
    await subtask.save();

    res.json(subtask);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
