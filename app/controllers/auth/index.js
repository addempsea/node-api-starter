import { constants, Helpers } from '../../utils';
import { createJob } from '../../jobs';

const {
  LOGIN_SUCCESSFULLY,
  events: { UPDATE_ADMIN_PASSWORD }
} = constants;

const {
  GenericHelper: { successResponse },
  AuthHelper: { addTokenToData }
} = Helpers;

/**
 * @class AuthController
 */
export default class AuthController {
  /**
   * Logs in an admin.
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the user's details and a JWT.
   * @memberof AuthController
   */
  static async adminSignIn(req, res) {
    const { token } = addTokenToData({ ...req.user });
    const { id, firstName, email } = req.user;
    successResponse(res, {
      data: {
        token,
        id,
        firstName,
        email
      },
      message: LOGIN_SUCCESSFULLY
    });
  }

  /**
   * reset admin password
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AdminController
   */
  static async resetPassword(req, res) {
    successResponse(res, {
      message:
        'Password reset successfully, kindly check your email for new password'
    });
    createJob({
      type: UPDATE_ADMIN_PASSWORD,
      data: { email: req.data.email },
      attempts: 1
    });
  }

  /**
   * reset admin password
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AdminController
   */
  static async forgotPassword(req, res) {
    successResponse(res, {
      message:
        'Password reset successfully, kindly check your email for new password'
    });
    createJob({
      type: UPDATE_ADMIN_PASSWORD,
      data: { email: req.body.email },
      attempts: 1
    });
  }
}
