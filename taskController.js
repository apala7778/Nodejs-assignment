const Task = require('./taskModel');
const fs = require('fs');
const path = require('path');

async function processTask(req, res) {
  const { user_id } = req.body;

 
  const task = new Task({ user_id });
  await task.save();

  // Log task completion
  const logMessage = `${user_id} - task completed at - ${new Date().toISOString()}\n`;
  const logFilePath = path.join(__dirname, 'taskLog.json');

  fs.appendFileSync(logFilePath, logMessage);

  res.status(200).json({ message: 'Task processed successfully.' });
}

module.exports = { processTask };
