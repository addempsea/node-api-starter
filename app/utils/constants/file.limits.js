const IMAGE_LIMIT = 3000000;
const DOCUMENT_LIMIT = 1000000;

export default {
  FILE_LIMITS: {
    'image/jpeg': IMAGE_LIMIT,
    'image/png': IMAGE_LIMIT,
    'application/pdf': DOCUMENT_LIMIT,
    'application/msword': DOCUMENT_LIMIT,
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      DOCUMENT_LIMIT
  }
};
