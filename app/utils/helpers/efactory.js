import ApiError from '../errors/api.error';
import GenericHelpers from './generic';
import DBError from '../errors/db.error';
import constants from '../constants';

const { DB_UNIQUE_CONSTRAINTS, RESOURCE_NOT_FOUND } = constants;

const {
  moduleErrLogMessager
} = GenericHelpers;

/**
 *Contains ErrorFactory methods
 * @class ErrorFactory
 */
export default class ErrorFactory {
  static resolveError(e) {
    let message = 'Error while processing request. It is not you, it is us.';
    let status = 500;
    let errorObj = { status: e.status, message: e.message, name: 'CodeError' };
    if (e.code >= 0) {
      delete errorObj.name;
      errorObj = new DBError(errorObj);
      if (e.code === '23505') {
        message = DB_UNIQUE_CONSTRAINTS[e.constraint];
        status = 409;
      }
      if (e.code === '23503') {
        message = DB_UNIQUE_CONSTRAINTS[e.constraint];
        status = 404;
      }
      if (e.received === 0) {
        status = 404;
        message = RESOURCE_NOT_FOUND(e.resource);
      }
    }
    moduleErrLogMessager(errorObj);
    return new ApiError({ message, status });
  }
}
