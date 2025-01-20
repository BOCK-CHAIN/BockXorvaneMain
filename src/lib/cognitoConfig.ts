// this is not required....

export const cognitoConfig = {
    region: process.env.AWS_REGION! , 
    userPoolId:  process.env.AWS_USER_POOL_ID! , 
    clientId:  process.env.AWS_USER_POOL_CLIENT_ID! , 
  };
  