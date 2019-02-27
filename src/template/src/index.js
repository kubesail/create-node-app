module.exports = process.env.REACT_APP_LAUNCH_WWW ? require('./www') : require('./api')
