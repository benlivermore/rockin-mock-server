const mockServer = require('../dist/mockServer'); 

function UsersRouter() {
  const router = mockServer.Router();
  router.route('/login').post(mockServer.Mock('userLogin'));
  router.route('/apiToken').post(mockServer.Mock('userApiToken'));
  return router;
}

const app = mockServer.App({
  appName: 'Example Mock Server',
  port: 8888,
  host: '127.0.0.1',
  scenariosAppPath: '../dist/scenariosApp.js'
});

 /* ----- start: mock routes ----- */
app.use('/users/', UsersRouter());

 /* ----- end: mock routes ----- */

app.get('/login', (req, res) => {
  res.send('<html><body><div id="login-view">Mock Login Page</div></body></html>');
});

app.start();
