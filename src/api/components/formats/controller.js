const { createFormat, readFormat, updateFormat, deleteFormat } = require('./model');
const validateSchema = require('./utils/validator');
const response = require('../../../utils/response');

const create = async (req, res, next) => {
  try {
    const { body } = req;
    validateSchema(body);

    const { _id } = await createFormat(body);

    response.success(res, {
      market: _id,
    });
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const { market } = req.query;
    if (!market) throw new global.ErrorHandler(400, 'The market param is mandatory');

    const format = await readFormat(market);

    response.success(res, { format });
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { body } = req;
    validateSchema(body);

    await updateFormat(body);

    response.success(res);
  } catch (err) {
    next(err);
  }
};

const delete_ = async (req, res, next) => {
  try {
    const { market } = req.query;
    if (!market) throw new global.ErrorHandler(400, 'The market param is mandatory');

    await deleteFormat(market);

    response.success(res);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  read,
  update,
  delete_,
};
