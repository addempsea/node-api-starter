import { db, queries } from '../db';

const { createRole } = queries.roleQueries;

/**
 * @class RoleModel
 */
class RoleModel {
  /**
   * This is a constructor for creating an instance of a Role.
   * @param { Object } options - contains the required properties for creating
   * the Role.
   * @returns { RoleModel } - An instance of the Role profile.
   * @constructor RoleModel
   */
  constructor(options) {
    this.name = options.name;
    this.permissions = options.permissions;
    this.description = options.description;
  }

  /**
   * Persists a new Role to the DB.
   * @memberof RoleModel
   * @returns { Promise<Object | Error> } A promise that resolves or rejects
   * with a Role object or a DB Error.
   */
  async save() {
    return db.one(createRole, [this.name, this.permissions, this.description]);
  }
}

export default RoleModel;
