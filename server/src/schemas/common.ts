const Error500Response = {
    type: 'object',
    properties: {
        statusCode: { type: 'number' },
        error: { type: 'string' },
        message: { type: 'string' },
    },
    required: ['statusCode', 'error', 'message'],
};

export { Error500Response };
