// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

module.exports = getDefaultConfig(__dirname);

module.exports = (()=>{
    const defaultConfig = getDefaultConfig(__dirname);
    const {sourceExts} = defaultConfig.resolver;
    return {
        resolver: {
            // Add .bin to sourceExts
            sourceExts: [...sourceExts, 'bin', 'tflite', 'py'],
        },
    };
})();