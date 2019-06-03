export default {
	index: '/',
	login: '/login',
	signUp: '/signup',
	signUpEmail: '/signup/email',
	about: '/about',
	news: '/news'
}

export const routeMapping = {
	profile: {
		as: (username: string) => `/profile/${username}`,
		href: (username: string) => `/profile?username=${username}`
	}
}