// import { google } from 'googleapis';

// const defaultScope = [
//     'https://www.googleapis.com/auth/userinfo.email',
//     // 'https://www.googleapis.com/auth/userinfo.profile',
//     // 'openid'
// ];


// const googleConfig = {
//     clientId: '1027672846288-1cplsl3m6pl2p3ngjn1k1msqr07s4at7.apps.googleusercontent.com',
//     clientSecret: 'tT0IDORNYDz67SGyb4Wb4eUh',
//     redirect: 'https://mechaadii.web.app'
// };

// function createConnection() {
//     return new google.auth.OAuth2(
//         googleConfig.clientId,
//         googleConfig.clientSecret,
//         googleConfig.redirect
//     );
// }

// function getConnectionUrl(auth) {
//     return auth.generateAuthUrl({
//         access_type: 'offline',
//         prompt: 'consent', // access type and approval prompt will force a new refresh token to be made each time signs in
//         scope: defaultScope
//     });
// }

// function urlGoogle() {
//     const auth = createConnection(); // this is from previous step
//     const url = getConnectionUrl(auth);
//     return url;
// }

// function getGooglePlusApi(auth) {
//     return google.plus({ version: 'v1', auth });
// }

// async function getGoogleAccountFromCode(code) {
//     const auth = createConnection();
//     const data = await auth.getToken(code);
//     const tokens = data.tokens;
//     auth.setCredentials(tokens);
//     const plus = getGooglePlusApi(auth);
//     const me = await plus.people.get({ userId: 'me' });
//     const userGoogleId = me.data.id;
//     const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
//     return {
//         id: userGoogleId,
//         email: userGoogleEmail,
//         tokens: tokens,
//     };
// }

// export { urlGoogle, getGoogleAccountFromCode };