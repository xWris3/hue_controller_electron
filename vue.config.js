module.exports = {
    pluginOptions: {
        electronBuilder: {
            preload: 'src/preload.js',
            builderOptions: {
                "appId": "fr.ebasile.hue-controller",
                "publish": ["github"], 
              },
        }
    }
}