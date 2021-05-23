const AJV = require('ajv').default;

const ajv = new AJV();

const formatSchema = {
  $id: '/format',
  type: 'object',
  properties: {
    market: {
      type: 'string',
    },
    code: {
      type: 'string',
    },
    symbol: {
      type: 'string',
    },
    currency: {
      type: 'string',
      enum: ['code', 'symbol'],
    },
    currencyOnLeft: {
      type: 'boolean',
    },
    thousandsSeparator: {
      type: 'string',
    },
    decimalSeparator: {
      type: 'string',
    },
    decimalDigits: {
      type: 'integer',
    },
  },
  required: ['market'],
};

const validateSchema = (data) => {
  const validate = ajv.compile(formatSchema);
  const valid = validate(data);

  if (!valid) {
    const { instancePath, message, params } = validate.errors[0];
    const prefix = (instancePath) ? `${instancePath} ` : 'body ';

    let errorMessage = `${prefix}${message}`;
    if (params.allowedValues) errorMessage += `: ${params.allowedValues}`;

    throw new global.ErrorHandler(400, errorMessage);
  }
};

module.exports = validateSchema;
