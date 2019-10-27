import BroadcastChannel from 'broadcast-channel'

const notificationChannel = new BroadcastChannel('broadcast')

const broadcastEvent = {
    LOGIN_SUCCESS: 'LOGIN_SUCCESS'
}

export const broadcastChannel = {
    login: {
        emit() {
            console.log('message emmitted...')
            notificationChannel.postMessage(broadcastEvent.LOGIN_SUCCESS)
        },
        listen(handler: () => void) {
            notificationChannel.onmessage = (message: string) => {
                console.log('message received...', message)
                message === broadcastEvent.LOGIN_SUCCESS && handler()
            } 
        }
    }
}