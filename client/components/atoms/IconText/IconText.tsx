import {colors, spaces} from 'styles'
import {Icon, Paragraph} from 'components/atoms'

interface Props {
    icon: string
    text: React.ReactNode
}

const IconText = ({
    icon,
    text
}: Props) => (
    <div className="icon-text">

        <Icon d={icon} color={colors.WHITE} />
        <Paragraph color={colors.WHITE} as="span" type="s2" weight="semibold">
            {text}
        </Paragraph>

        <style jsx>{`
            .icon-text {
                display: inline-flex;
                align-items: center;
                opacity: .8;
            }  

            .icon-text :global(svg) {
                margin-right: ${spaces.s6};
            }
        `}</style>
    </div>
)

export default IconText