export default {
    isEmailValid: (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),

    isEmpty: (value?: string) => value === '' || value === undefined || value === null
}