const mongoose = require('mongoose');

const formatSchema = new mongoose.Schema({
  _id: {
    type: String,
  },
  code: {
    type: String, required: true,
  },
  symbol: {
    type: String, required: true,
  },
  thousandsSeparator: {
    type: String, default: ',',
  },
  decimalSeparator: {
    type: String, default: '.',
  },
  symbolOnLeft: {
    type: Boolean, default: false,
  },
  decimalDigits: {
    type: Number, defualt: 2,
  },
});

const Format = mongoose.model('Format', formatSchema);

const createFormat = async (body) => {
  const {
    market, code, symbol, thousandsSeparator, decimalSeparator, symbolOnLeft, decimalDigits,
  } = body;

  try {
    const newFormat = new Format({
      _id: market,
      code,
      symbol,
      thousandsSeparator,
      decimalSeparator,
      symbolOnLeft,
      decimalDigits,
    });

    const savedFormat = await newFormat.save();

    return savedFormat;
  } catch (err) {
    console.error(err);

    if (err.code === 11000) {
      throw new global.ErrorHandler(400, 'Format for the market sent already exist');
    }

    throw new global.ErrorHandler(500, 'Error saving the Format');
  }
};

const readFormat = async (market) => {
  try {
    const format = await Format.findById(market).exec();

    if (!format) throw new global.ErrorHandler(400, `Format for market ${market} does not exist`);

    const {
      code, symbol, thousandsSeparator, decimalSeparator, symbolOnLeft, decimalDigits,
    } = format;

    return {
      market,
      code,
      symbol,
      thousandsSeparator,
      decimalSeparator,
      symbolOnLeft,
      decimalDigits,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const updateFormat = async (body) => {
  try {
    const {
      market, code, symbol, thousandsSeparator, decimalSeparator, symbolOnLeft, decimalDigits,
    } = body;

    const _id = market;

    const newFormat = {
      code,
      symbol,
      thousandsSeparator,
      decimalSeparator,
      symbolOnLeft,
      decimalDigits,
    };

    Object.keys(newFormat).forEach((key) => newFormat[key] === undefined && delete newFormat[key]);

    const { nModified } = await Format.updateOne({ _id }, newFormat);
    if (!nModified) throw new global.ErrorHandler(400, `Format ${market} was not updated`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const deleteFormat = async (market) => {
  try {
    const { deletedCount } = await Format.deleteOne({ _id: market });
    if (!deletedCount) throw new global.ErrorHandler(400, `Format for market ${market} does not exist`);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  Format,
  createFormat,
  readFormat,
  updateFormat,
  deleteFormat,
};
