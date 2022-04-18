module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        //https://happymore-api-git-master-huongtn.vercel.app/api/users/login
        destination: 'https://happymore-api-git-master-huongtn.vercel.app/api/:path*',
      },
    ]
  },
  experimental: {
    outputStandalone: true,
  },
  // publicRuntimeConfig: {
  //   database: process.env['DATABASE'],
  //   jwtSecret: process.env.JWT_SECRET,
  //   codeVerifyExpiredSeconds: process.env.CODE_VERIFY_EXPIRED_SECONDS,
  //   twilio:
  //   {
  //     accountSid: process.env.TWILIO_ACCOUNTSID,
  //     authToken: process.env.TWILIO_AUTHTOKEN,
  //     phoneNumber: process.env.TWILIO_PHONENUMBER,
  //   },
  //   mqtt:
  //   {
  //     Con: process.env.Mqtt_Con,
  //     UserName: process.env.Mqtt_UserName,
  //     Password: process.env.Mqtt_Password,
  //     Port: process.env.Mqtt_Port
  //   }
  // }
}
