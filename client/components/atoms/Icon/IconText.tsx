import {spaces, typography, applyStyles} from 'styles'
import {Icon} from 'components/atoms'

interface Props {
    icon: string
    text: React.ReactNode
    size?: 'default' | 'small'
    color?: string
}

const classes = {
    root: 'icon-text'
}

const iconSizeMapping = {
    default: 20,
    small: 14
}

const IconText = ({
    icon,
    text,
    color,
    size = 'default'
}: Props) => (
        <div className={classes.root}>

            <Icon d={icon} color={color} size={iconSizeMapping[size]}/>
            <p className="paragraph">{text}</p>

        <style jsx>{`
            .icon-text {
                display: inline-flex;
                align-items: center;
            }

            .paragraph {
                margin: 0;
                
                font-size: ${typography.fontSize.fs16}
                font-weight: ${typography.fontWeight.semibold};
                color: ${color};

                ${applyStyles(size === 'small')(`
                    font-size: ${typography.fontSize.fs13};
                `)}
            }

            .icon-text :global(svg) {
                margin-right: ${spaces.s16};

                ${applyStyles(size === 'small')(`
                    margin-right: ${spaces.s6};
                `)}
            }
        `}</style>
        </div>
    )

IconText.classes = classes

export default IconText