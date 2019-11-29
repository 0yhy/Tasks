let hello = async (ctx, next) => {
  ctx.response.body = `
    
  `
};

module.exports = {
  "GET /hello": hello
};