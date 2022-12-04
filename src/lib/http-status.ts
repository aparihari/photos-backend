const httpStatus = Object.freeze({
  200: 'OK',
  OK: 200,

  400: 'Bad Request',
  BAD_REQUEST: 400,
  401: 'Unauthorized',
  UNAUTHORIZED: 401,
  403: 'Forbidden',
  FORBIDDEN: 403,
  404: 'Not Found',
  NOT_FOUND: 404,

  500: 'Internal Server Error',
  INTERNAL_SERVER_ERROR: 500,
  502: 'Bad Gateway',
  BAD_GATEWAY: 502,
});

export default httpStatus;
