import AdminWorker from './workers/admin';
import { constants } from '../utils';

const { updateAdminPassword } = AdminWorker;
const {
  events: { UPDATE_ADMIN_PASSWORD }
} = constants;

export default (queue) => {
  queue.process(UPDATE_ADMIN_PASSWORD, updateAdminPassword);
};
