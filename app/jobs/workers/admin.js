import { AdminServices, EmailServices } from '../../services';
import { Helpers } from '../../utils';

const {
  GenericHelper: { generateId },
  AuthHelper: { hashString }
} = Helpers;

const { updatePassword } = AdminServices;
const { adminForgotPassword } = EmailServices;
/**
 * A collection of worker methods that handles admin events.
 *
 * @class AdminWorker
 */
export default class AdminWorker {
  /**
   * updates an admin password on the database
   * @static
   * @memberof AdminWorker
   * @param { Object } data - The job object containing details of the school.
   * @param { Function } done - The type of the job.
   * @returns { null } - It returns null.
   */
  static async updateAdminPassword({ data: { email } }, done) {
    try {
      const randomString = generateId(10);
      const { salt, hash } = hashString(randomString);
      const { firstName } = await updatePassword({ salt, password: hash, email });
      await adminForgotPassword({ firstName, email, password: randomString });
      done();
    } catch (error) {
      done(error);
    }
  }
}
