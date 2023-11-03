const User = require("../model/User");
const pkg = require('agora-token');
const { RtcTokenBuilder, RtcRole, ChatTokenBuilder } = pkg;


exports.generateAgoraTokenControler = async (uid) => {
    const appId = process.env.AGORA_APP_ID;
    const appCertificate = process.env.AGORA_APP_CERTIFICATE;
    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;
    let token;
   console.log(appId)
   console.log(appCertificate)
    const user = await User.findOne({ uid });
    if (!user) {
      throw new Error("User Not Found For The Given uid");
    }
    let channelName;
    if (user.userName) {
      channelName = user.userName;
    } else {
      user.userName = `${user.firstName}${user.lastName}${user.uid}`
    }
    console.log(channelName)
  
    // Generate the Agora token
    token = RtcTokenBuilder.buildTokenWithUid(
      appId,
      appCertificate,
      channelName,
      0,
      role,
      privilegeExpiredTs
    );
    user.agoraToken = token;
    await user.save();
  
    return {
      rtcToken: token,
      channelName
    };
  };