import log from 'loglevel'

export default {
    warn: (message: string) => log.warn(message),
    info: (message: string) => log.info(message),
    error: (message: string) => log.error(message),
    debug: (message: string) => log.debug(message),
    trace: (message: string) => log.trace(message)
}
