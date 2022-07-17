import { RoleModel } from '../../models';
import { Helpers } from '../../utils';
import { RoleServices } from '../../services';
import config from '../../../config/env';

const { NODE_ENV } = config;

const {
  GenericHelper: { successResponse },
  ErrorFactory: { resolveError }
} = Helpers;

const { updateRole, getRoleById, fetchOrSearchRoles, deleteRole } = RoleServices;

/**
 * @class RoleController
 */
export default class RoleController {
  /**
   * Controllers used for creating a new Role
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the role added
   * @memberof RoleController
   */
  static async addRole(req, res, next) {
    try {
      const role = new RoleModel(req.body);
      const id = await role.save();
      successResponse(res, {
        message: 'Role created successfully',
        code: 201,
        ...(NODE_ENV === 'test' && { data: id })
      });
    } catch (e) {
      next(resolveError({ ...e, resource: 'Role', status: 'CREATE_ROLE_ERROR', message: e.message }));
    }
  }

  /**
   * Controllers used for updating a Role
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the role updated
   * @memberof RoleController
   */
  static async updateRole(req, res, next) {
    try {
      await updateRole(req.params.roleId, req.body);
      successResponse(res, {
        message: 'Role updated successfully',
        code: 200
      });
    } catch (e) {
      next(resolveError({ ...e, resource: 'Role', status: 'UPDATE_ROLE_ERROR', message: e.message }));
    }
  }

  /**
   * Controllers used for getting a Role
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the role
   * @memberof RoleController
   */
  static async getRole(req, res, next) {
    try {
      const role = await getRoleById(req.params.roleId);
      successResponse(res, {
        message: 'Role retrieved successfully',
        code: 200,
        data: role
      });
    } catch (e) {
      next(resolveError({ ...e, resource: 'Role', status: 'GET_ROLE_ERROR', message: e.message }));
    }
  }

  /**
   * Controllers used for fetching all Roles
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of all roles
   * @memberof RoleController
   */
  static async fetchAllRoles(req, res, next) {
    try {
      const data = await fetchOrSearchRoles(req.query);
      successResponse(res, {
        message: 'Roles fetched successfully',
        code: 200,
        data
      });
    } catch (e) {
      next(resolveError({ ...e, resource: 'Role', status: 'FETCH_ALL_ROLES_ERROR', message: e.message }));
    }
  }

  /**
   * Controllers used for deleting a Role
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @param {Next} next
   * @returns { JSON } A JSON response containing the details of the role updated
   * @memberof RoleController
   */
  static async removeRole(req, res, next) {
    try {
      await deleteRole(req.params.roleId);
      successResponse(res, {
        message: 'Role deleted successfully',
        code: 204
      });
    } catch (e) {
      next(resolveError({ ...e, resource: 'Role', status: 'UPDATE_ROLE_STATUS_ERROR', message: e.message }));
    }
  }
}
