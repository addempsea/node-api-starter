import { db, queries } from '../../db';

const {
  fetchAdminByEmail,
  fetchAdminById,
  updateAdmin,
  updateAdminPassword
} = queries.adminQueries;

/**
 * Contains a collection of service methods for managing Admin resource on the app.
 * @class AdminService
 */
class AdminServices {
  /**
   * Fetches Admin by email
   * @memberof AdminService
   * @param {string} email - email of Admin
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Admin resource or a DB Error.
   */
  static async getAdminByEmail(email) {
    return db.oneOrNone(fetchAdminByEmail, [email.toLocaleLowerCase()]);
  }

  /**
   * Fetches Admin by Id
   * @memberof AdminService
   * @param {uuid} id - Admin id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the Admin resource or a DB Error.
   */
  static async getAdminById(id) {
    return db.one(fetchAdminById, [id]);
  }

  /**
   * Update Admin profile
   * @memberof UserService
   * @param {Object} userData - Contains information to update
   * @param {uuid} id - Admin id
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async updateProfile(userData, id) {
    const dbData = await AdminServices.getAdminById(id);
    const data = {
      ...dbData,
      ...userData
    };
    return db.one(updateAdmin, data);
  }

  /**
   * Update Admin password
   * @memberof AdminService
   * @param {Object} adminData - Contains information to update
   * @returns { Promise<Array | Error> } A promise that resolves or rejects
   * with an Array of the User resource or a DB Error.
   */
  static async updatePassword({ salt, password, email }) {
    return db.one(updateAdminPassword, [password, salt, email]);
  }
}

export default AdminServices;
