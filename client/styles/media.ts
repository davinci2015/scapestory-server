import breakpoints, {Breakpoints} from './breakpoints'

export default {
    up: (breakpoint: keyof Breakpoints) =>
        `only screen and (min-width: ${breakpoints[breakpoint]})`,

    down: (breakpoint: keyof Breakpoints) =>
        `@media only screen and (max-width: ${breakpoints[breakpoint]})`,

    between: (start: keyof Breakpoints, end: keyof Breakpoints) =>
        `only screen and (min-width: ${breakpoints[start]}) and (max-width: ${breakpoints[end]})`,
}
