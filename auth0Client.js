if (process.env.NODE_ENV !== 'production') require('dotenv').config()

import { ManagementClient, AuthenticationClient } from 'auth0';

//Test Client - to get more use Auth0 dashboard
const auth0ManagementClient = new ManagementClient({
  domain: `${process.env.AUTH0_DOMAIN}.auth0.com`,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users',
});

const auth0AuthenticationClient = new AuthenticationClient({
  domain: `${process.env.AUTH0_DOMAIN}.auth0.com`,
  clientId: process.env.AUTH0_CLIENT_ID,
});

export default { management: auth0ManagementClient, authentication: auth0AuthenticationClient };