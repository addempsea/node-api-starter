import { Helpers, constants, genericErrors } from '../../utils';
import { AdminServices } from '../../services';

const { getAdminByEmail } = AdminServices;

const {
  GenericHelper: { errorResponse },
  ErrorFactory: { resolveError }
} = Helpers;

const {
  ADMIN_EMAIL_EXIST_VERIFICATION_FAIL
} = constants;

/**
 * A collection of middleware methods used to verify the authenticity
 * of requests through protected routes.
 *
 * @class AdminMiddleware
 */

class AdminMiddleware {
  /**
   * Validates admin's login credentials, with emphasis on the
   * existence of an admin with the provided email address.
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UserMiddleware
   *
   */
  static async adminLoginEmailValidator(req, res, next) {
    try {
      req.user = await getAdminByEmail(req.body.email);
      return req.user
        ? next()
        : errorResponse(req, res, genericErrors.inValidLogin);
    } catch (e) {
      e.status = ADMIN_EMAIL_EXIST_VERIFICATION_FAIL;
      next(resolveError(e));
    }
  }
}

export default AdminMiddleware;
