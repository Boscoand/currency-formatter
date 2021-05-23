const create = async (req, res, next) => {
  try {
    res.send('Hello World!');
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    res.send('Hello World!');
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    res.send('Hello World!');
  } catch (err) {
    next(err);
  }
};

const deleteFormat = async (req, res, next) => {
  try {
    res.send('Hello World!');
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  read,
  update,
  deleteFormat,
};
