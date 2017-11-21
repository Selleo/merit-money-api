import { ManagementClient, AuthenticationClient } from 'auth0';

//Test Client - to get more use Auth0 dashboard
const auth0ManagementClient = new ManagementClient({
  domain: 'merit-money.auth0.com',
  clientId: '25fGeBbehf4apVZcBn6HwPO6z92Kq79d',
  clientSecret: '_Ezkl4dRLHbq7UEp5luwa5w1TC2S1KRSgK7nEZXwCxYe1uM1awZC33HpIXVqPOCO',
  scope: 'read:users',
});

const auth0AuthenticationClient = new AuthenticationClient({
  domain: 'merit-money.auth0.com',
  clientId: '25fGeBbehf4apVZcBn6HwPO6z92Kq79d',
});

export default { management: auth0ManagementClient, authentication: auth0AuthenticationClient };