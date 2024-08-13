import { NestExpressApplication } from '@nestjs/platform-express';

var morgan = require('morgan');

export function userLogger(app: NestExpressApplication) {
  app.use(
    morgan(':method :url :status', {
      skip: function (req, res) {
        return req.url === '/' || res.statusCode === 404;
      },
    }),
  );
}
