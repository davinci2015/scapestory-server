import {spaces, colors, applyStyles, typography} from 'styles'

interface Props {
    children?: React.ReactNode
    icon: React.ReactNode | string
    background?: 'plain' | 'gradient'
}

const Badge = ({icon, children, background = 'plain'}: Props) => (
    <>
        <div className="badge">
            <div className="badge-icon">{icon}</div>
            {children}
        </div>
        <style jsx>{`
            .badge {
                display: flex;
                align-items: center;
            }

            .badge-icon {
                display: flex;
                align-items: center;
                justify-content: center;

                font-size: ${typography.fontSize.fs20};
                font-weight: ${typography.fontWeight.bold};
                color: ${colors.WHITE};
                text-transform: lowercase;

                margin-right: ${spaces.s18};
                height: ${spaces.s36};
                width: ${spaces.s36};

                border-radius: 50%;

                ${applyStyles(background === 'plain')(`
                    background: ${colors.SHADE_MIDDLE};
                `)}

                ${applyStyles(background === 'gradient')(`
                    background-image: linear-gradient(to bottom, ${colors.SECONDARY}, ${colors.SECONDARY_DARK});
                `)}
            }
        `}</style>
    </>
)

export default Badge
