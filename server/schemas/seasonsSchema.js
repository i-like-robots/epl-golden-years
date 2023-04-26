module.exports = {
  // tags: ['season'],
  // summary: 'List seasons',
  // description: 'Returns a list of all seasons',
  response: {
    200: {
      // description: 'success',
      type: 'array',
      items: {
        type: 'string',
        format: 'uri',
      },
    },
  },
}
