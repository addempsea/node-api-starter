import { Helpers } from '../../utils';
import { AdminServices } from '../../services';

const { updateProfile, getAdminById } = AdminServices;

const {
  GenericHelper: { successResponse },
  ErrorFactory: { resolveError }
} = Helpers;

/**
 * @class AdminController
 */
export default class AdminController {
  /**
   * Updates the admin's profile by the id
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AdminController
   */
  static async updateProfile(req, res, next) {
    try {
      await updateProfile(req.body, req.data.id);
      successResponse(res, {
        message: 'Profile updated successfully'
      });
    } catch (e) {
      next(
        resolveError({
          ...e,
          resource: 'Admin',
          status: 'ADMIN_PROFILE_UPDATE',
          message: e.message
        })
      );
    }
  }

  /**
   * Gets the admin by the id
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof AdminController
   */
  static async getAdminById(req, res, next) {
    try {
      const { salt, password, ...admin } = await getAdminById(req.data.id);
      req.unused = { salt, password };
      successResponse(res, {
        message: 'Admin retrieved successfully',
        data: admin
      });
    } catch (e) {
      next(
        resolveError({
          ...e,
          resource: 'Admin',
          status: 'GET_ADMIN_PROFILE',
          message: e.message
        })
      );
    }
  }
}
