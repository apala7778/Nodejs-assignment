const Task = require('./taskModel');

const TASK_LIMIT_PER_SECOND = 1;
const TASK_LIMIT_PER_MINUTE = 20;
// Rate limiter middleware
async function rateLimiter(req, res, next) {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ error: 'user_id is required' });
  }

  const now = new Date();

  // Fetching task count in last second and minute
  const tasksInLastSecond = await Task.countDocuments({
    user_id,
    timestamp: { $gte: new Date(now.getTime() - 1000) },
  });
  const tasksInLastMinute = await Task.countDocuments({
    user_id,
    timestamp: { $gte: new Date(now.getTime() - 60000) },
  });

  if (tasksInLastSecond >= TASK_LIMIT_PER_SECOND || tasksInLastMinute >= TASK_LIMIT_PER_MINUTE) {
    // Add task to queue if rate limit exceeded
    return res.status(429).json({ error: 'Rate limit exceeded. Task queued.' });
  }

  next();
}

module.exports = rateLimiter;
