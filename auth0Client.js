import { ManagementClient, AuthenticationClient } from 'auth0';

//Test Client - to get more use Auth0 dashboard
const auth0ManagementClient = new ManagementClient({
  domain: 'dsznajder.auth0.com',
  clientId: 'KOhJUjGt23IemZLYAiYuFSGA920UiUo5',
  clientSecret: 'BxCNscQ6dJrvd1tCqoREKW6pZchlKb-CdLSfkMLsCb5pRfH679cFjWvH01EeXlff',
  scope: 'read:users',
});

const auth0AuthenticationClient = new AuthenticationClient({
  domain: 'dsznajder.auth0.com',
  clientId: 'KOhJUjGt23IemZLYAiYuFSGA920UiUo5',
});

export default { management: auth0ManagementClient, authentication: auth0AuthenticationClient };