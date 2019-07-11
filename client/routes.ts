export default {
	index: '/',
	signUp: '/signup',
	signUpEmail: '/signup/email',
	about: '/about',
	news: '/news'
}

export const routeMapping = {
	user: {
		as: (username: string) => `/user/${username}`,
		href: (username: string) => `/user?username=${username}`
	}
}