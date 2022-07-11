export default Object.freeze({
  Welcome: 'Welcome',
  Login: 'Login',
  Register: 'Register',
  OTPVerification: 'OTPVerification',
  ForgotPassword: 'ForgotPassword',
  PasswordChanged: 'PasswordChanged',
  CreateNewPassword: 'CreateNewPassword',
});

export const configRoutes = {
  screens: {
    HomeStack: {
      initialRouteName: 'Favorites',
      screens: {
        Welcome: 'Welcome',
        Login: 'Login',
        Register: 'Register',
        OTPVerification: 'OTPVerification',
        ForgotPassword: 'ForgotPassword',
        PasswordChanged: 'PasswordChanged',
        CreateNewPassword: 'CreateNewPassword',
      },
    },
    Account: 'Account',
  },
};
