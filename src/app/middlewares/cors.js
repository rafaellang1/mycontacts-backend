module.exports = (request, response, next) => {
  // Liberação de CORS por middleware
  response.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // liberar para todos *
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');
  next();
};
