import slugify from 'slugify'

export default {
    index: '/',
    signUp: '/signup',
    signUpEmail: '/signup/email',
    about: '/about',
    privacyPolicy: '/privacy',
    termsAndConditions: '/terms',
    aquascapeDetails: '/aquascape/[title]/[id]',
    aquascapeDetailsEdit: '/aquascape/edit/[title]/[id]',
    profile: '/profile/[slug]',
}

export const getAquascapeDetailsSlug = (title: string) =>
    slugify(title, {
        lower: true,
    })

export const createDynamicPath = (path: string, values: {[key: string]: string}) => {
    for (const property in values) {
        if (values.hasOwnProperty(property)) {
            path = path.replace(`[${property}]`, values[property])
        }
    }

    return path
}
