const handleResponse = (res, statusCode, data) => res.status(statusCode).json({
  data: data || null,
});

const success = (res, data) => handleResponse(res, 200, data);

module.exports = {
  success,
};
