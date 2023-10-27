module.exports = (error, request, response, next) => {
  console.log('#### Error Handler');
  console.log('errorHandler', error);
  response.sendStatus(500);
};
