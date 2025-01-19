import {
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool,
    AuthenticationDetails,
  } from "amazon-cognito-identity-js";
  import { cognitoConfig } from "./cognitoConfig";
  
  const userPool = new CognitoUserPool({
    UserPoolId: cognitoConfig.userPoolId,
    ClientId: cognitoConfig.clientId,
  });
  
  export const signUp = (email: string, password: string, name: string): Promise<void> => {
    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
      new CognitoUserAttribute({ Name: "name", Value: name }),
    ];
  
    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, [], (err, result) => {
        if (err) reject(err.message || JSON.stringify(err));
        else resolve();
      });
    });
  };
  
  export const signIn = (
    email: string,
    password: string
  ): Promise<{ accessToken: string; idToken: string }> => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    console.log(user)
  
    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
  
    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (session) => {
          resolve({
            accessToken: session.getAccessToken().getJwtToken(),
            idToken: session.getIdToken().getJwtToken(),
          });
        },
        onFailure: (err) => reject(err.message || JSON.stringify(err)),
      });
    });
  };
  