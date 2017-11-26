if (process.env.NODE_ENV !== 'production') { require('dotenv').config(); }

import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

export const checkJwt = jwt({
  algorithms: ['RS256'],
  aud: `https://${process.env.AUTH0_DOMAIN}.auth0.com/api/v2/`,
  issuer: `https://${process.env.AUTH0_DOMAIN}.auth0.com/`,
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}.auth0.com/.well-known/jwks.json`
  }),
});
