/* istanbul ignore file */
import Queue from 'bull';
import jobEvents from './events';
import config from '../../config/env';

export const queue = config.NODE_ENV === 'test' ? new Queue(' TEST') : new Queue('API');

queue.setMaxListeners(queue.getMaxListeners() + 100);

jobEvents(queue);

export const createJob = (options) => {
  const opts = { priority: 0, attempts: 6, ...options };
  queue.add(opts.type, opts.data, {
    attempts: opts.attempts,
    backoff: {
      type: 'exponential',
      delay: 60000
    },
    removeOnComplete: true,
    removeOnFail: true
  });
};

// Queue Events

// Fires when a job is added to queue
queue.on('active', ({ id, name }) => {
  logger.info(`The job ${id} of name: ${name} got added to queue`);
});

// Fires when a job is done with.
queue.on('completed', ({ id }) => {
  logger.info(`Job with the id: ${id} just completed`);
});

// Fires when a job fails after a certain retry.
queue.on('failed', ({ id, attemptsMade, name }, err) => {
  if (logger) {
    logger.info(
      `Job of id: ${id} and name: ${name} failed with the message: ${err.message} after ${attemptsMade} attempts`
    );
  }
});
