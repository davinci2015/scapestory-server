// next.config.js
module.exports = {
    webpack(config) {
        config.resolve.modules.unshift(__dirname)
        return config
    },
}