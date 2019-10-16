// next.config.js
module.exports = {
    webpack(config, options) {
        config.resolve.modules.unshift(__dirname)

        return config
    }
}