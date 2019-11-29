let fn_index = async (ctx, next) => {
  ctx.response.body = `<h1>Index</h1>
  <form action="/signin" method="post">
    <p>Name: <input name="name" value="koa"></p>
    <p>Password: <input type="password" name="password"></p>
    <p><input type="submit" value="submit"></p>
  </form>`;
};

var fn_signin = async (ctx, next) => {
  let name = ctx.request.body.name || '';
  let password = ctx.request.body.password || '';
  console.log(`signin with name: ${name}, password: ${password}`);
  if (name === 'koa' && password === '12345') {
    ctx.response.body = `<h1>Welcome, ${name}!</h1>`;
  }
  else {
    ctx.response.body = `<h1>Login failed!</h1>
  <p><a href="/">Try again</a></p>`;
  }
};

module.exports = {
  "GET /": fn_index,
  "POST /signin": fn_signin
};