import { Helpers, constants } from '../../utils';

const {
  GenericHelper: { successResponse },
} = Helpers;

const {
  FILE_UPLOAD_SUCCESS
} = constants;

/**
 * controllers that contains methods for generic resources
 * @class UploadController
 */
export default class UploadController {
  /**
   * upload files to s3
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response containing the details of the uploaded resource
   * @memberof UploadController
   */
  static async uploadMedia(req, res) {
    return successResponse(res, {
      message: FILE_UPLOAD_SUCCESS,
      data: { url: req.image }
    });
  }
}
