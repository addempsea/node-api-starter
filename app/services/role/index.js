import { db, queries } from '../../db';
import { Helpers } from '../../utils';

const {
  getRoleById,
  editRole,
  getRoles,
  countRoles,
  countRolesBySearch,
  searchRoles,
  getAllRoles,
  deleteRole
} = queries.roleQueries;
const {
  GenericHelper: { fetchResourceByPage, calcPages }
} = Helpers;

/**
 * Contains a collection of service methods for managing Role resource on the app.
 * @class RoleService
 *
 */
class RoleServices {
  /**
   * Get Role details by id
   * @memberof RoleServices
   * @param {Number} id - id of Role
   * @returns { Promise<Object | Error> } A promise that resolves or objects
   * with an object of the Role resource or a DB Error.
   * @static
   */
  static async getRoleById(id) {
    return db.one(getRoleById, [id]);
  }

  /**
   * delete a Role by id
   * @memberof RoleServices
   * @param {Number} id - id of Role
   * @returns { Promise<Object | Error> } A promise that resolves or objects
   * with an object of the Role resource or a DB Error.
   * @static
   */
  static async deleteRole(id) {
    return db.one(deleteRole, [id]);
  }

  /**
   * Update Role details
   * @memberof RoleServices
   * @param {string} pin - randomly generated pin
   * @param {object} email - email of Role
   * @returns { Promise<Array | Error> } A promise that resolves or objects
   * with an object of the Role resource or a DB Error.
   */
  static async updateRole(id, data) {
    const oldData = await RoleServices.getRoleById(id);
    const newData = { ...oldData, ...data, id };
    return db.one(editRole, newData);
  }

  /**
   * Get all Roles
   * @memberof RoleServices
   * @param {object} query - query object
   * @returns { Promise<Array | Error> } A promise that resolves or objects
   * with an array of the Role resource or a DB Error.
   * @static
   */
  static async getRolesInPages({ page, limit = 10 }) {
    const [{ count }, roles] = await fetchResourceByPage({
      page,
      limit,
      getCount: countRoles,
      getResources: getRoles
    });
    return {
      total: count,
      currentPage: page,
      totalPages: calcPages(count, limit),
      roles
    };
  }

  /**
   * Get all Roles by search
   * @memberof RoleServices
   * @param {object} query - query object
   * @returns { Promise<Array | Error> } A promise that resolves or objects
   * with an array of the Role resource or a DB Error.
   * @static
   */
  static async getRolesBySearch({ page = 1, limit = 10, search }) {
    const [{ count }, roles] = await fetchResourceByPage({
      page,
      limit,
      getCount: countRolesBySearch,
      getResources: searchRoles,
      countParams: [`%${search}%`],
      params: [`%${search}%`]
    });
    return {
      total: count,
      currentPage: page,
      totalPages: calcPages(count, limit),
      roles
    };
  }

  /**
   * Get all Roles
   * @memberof RoleServices
   * @returns { Promise<Array | Error> } A promise that resolves or objects
   * with an array of the Role resource or a DB Error.
   * @static
   */
  static async getAllRoles() {
    return db.any(getAllRoles);
  }

  /**
   * fetch all roles or search for a role
   * @memberof RoleServices
   * @param {Object} queryObject - The query object
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with an Object of the cms resource or a DB Error.
   */
  static async fetchOrSearchRoles(queryObject) {
    if (queryObject.search) return RoleServices.getRolesBySearch(queryObject);
    return queryObject.page
      ? RoleServices.getRolesInPages(queryObject)
      : RoleServices.getAllRoles(queryObject);
  }
}

export default RoleServices;
