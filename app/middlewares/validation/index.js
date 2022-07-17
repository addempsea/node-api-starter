import { Helpers, ApiError, constants } from '../../utils';

const {
  GenericHelper: { errorResponse, validateInput }
} = Helpers;

/**
 * A collection of middleware methods used to validate requests
 * @class ValidationMiddleware
 */
class ValidationMiddleware {
  /**
   * @static
   */
  static validate(schema) {
    return (req, res, next) => {
      const { error } = validateInput(schema, req.body);
      if (!error) {
        return next();
      }
      const apiError = new ApiError({
        status: 400,
        message: error.details[0].message
      });
      errorResponse(req, res, apiError);
    };
  }

  /**
   * check if file exists
   * @static
   * @param { Object } req - The request from the endpoint.
   * @param { Object } res - The response returned by the method.
   * @param { function } next - Calls the next handle.
   * @returns { JSON | Null } - Returns error response if validation fails or Null if otherwise.
   * @memberof ValidationMiddleware
   */
  static validateFile(req, res, next) {
    return req.files
      ? next()
      : errorResponse(
        req,
        res,
        new ApiError({ status: 400, message: constants.EMPTY_FILE })
      );
  }
}

export default ValidationMiddleware;
