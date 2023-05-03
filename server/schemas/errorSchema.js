module.exports = {
  400: {
    description: 'Bad request',
    type: 'object',
    properties: {
      statusCode: {
        type: 'integer',
        example: 400,
      },
      error: {
        type: 'string',
        example: 'Bad request',
      },
      message: {
        type: 'string',
        example: 'querystring/team must match pattern "^[a-z]{3}$"',
      },
    },
  },
  404: {
    description: 'Resource not found',
    type: 'object',
    properties: {
      error: {
        type: 'string',
        example: 'Resource not found',
      },
    },
  },
}
