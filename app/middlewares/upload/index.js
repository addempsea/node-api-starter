import { Helpers, ApiError, constants } from '../../utils';

const {
  UploadHelper: { upload, isFileSizeOverLimit, isFileTypeIsAllowed },
  GenericHelper: { errorResponse },
  ErrorFactory: { resolveError }
} = Helpers;
const {
  LARGE_FILE_ERROR_MSG,
  LARGE_FILE_ERROR_STATUS,
  FILE_LIMITS,
  UPLOAD_FAIL_STATUS,
  INVALID_FILE_TYPE
} = constants;
/**
 * A collection of middleware methods used to validate requests
 * @class UploadMiddleware
 */
class UploadMiddleware {
  /**
   * @static
   * @param {request} req - request made through the endpoint
   * @param {response} res - response gotten from the API
   * @param {function} next - The function that calls the next handler
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UploadMiddleware
   */
  static async uploadFile(req, res, next) {
    try {
      const { tempFilePath: path, name: fileName, mimetype } = req.files.file;
      const { Location } = await upload(path, fileName, mimetype);
      req.image = Location;
      next();
    } catch (e) {
      e.status = UPLOAD_FAIL_STATUS;
      next(resolveError(e));
    }
  }

  /**
   * @static
   * @param {request} req - request made through the endpoint
   * @param {response} res - response gotten from the API
   * @param {function} next - The function that calls the next handler
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UploadMiddleware
   */
  static async checkIfFileSizeOverLimit(req, res, next) {
    try {
      const { file } = req.files;
      return isFileSizeOverLimit(file, FILE_LIMITS[file.mimetype])
        ? errorResponse(
          req,
          res,
          new ApiError({ status: 400, message: LARGE_FILE_ERROR_MSG })
        )
        : next();
    } catch (e) {
      e.status = LARGE_FILE_ERROR_STATUS;
      next(resolveError(e));
    }
  }

  /**
   * @static
   * @param {request} req - request made through the endpoint
   * @param {response} res - response gotten from the API
   * @param {function} next - The function that calls the next handler
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof UploadMiddleware
   */
  static async checkIfFileTypeIsAllowed(req, res, next) {
    const { file } = req.files;
    return isFileTypeIsAllowed(file, Object.keys(FILE_LIMITS))
      ? next() : errorResponse(
        req,
        res,
        new ApiError({ status: 400, message: INVALID_FILE_TYPE })
      );
  }
}

export default UploadMiddleware;
