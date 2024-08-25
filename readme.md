# Node.js API for Task Queuing with Rate Limiting

## Project Overview
This project implements a Node.js API with a task queuing system that enforces rate limiting per user. Each user can submit tasks to be processed, but they are limited to one task per second and 20 tasks per minute. Tasks exceeding this rate are queued and processed according to the limit.

## Project Structure
- `server.js`: Entry point of the application.
- `taskQueue.js`: Manages the task queue and enforces rate limiting.
- `logs/`: Directory where task completion logs are stored.

## Key Features
- Rate Limiting: Ensures that each user ID can only process 1 task per second and 20 tasks per minute.
- Task Queueing: Excess tasks are queued and processed later to respect the rate limits.
- Logging: Task completions are logged with user ID and timestamp in a log file.

## Setup and Run
1. Install dependencies:
  
   npm install
   nodemon server

## test 
i have attached a screenshot of my Postman Post request where we can verify the rate limiter    
