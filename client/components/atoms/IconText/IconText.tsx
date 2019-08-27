import {spaces} from 'styles'
import {Icon, Paragraph} from 'components/atoms'

interface Props {
    icon: string
    text: React.ReactNode
    color?: string
}

const classes = {
    root: 'icon-text'
}

const IconText = ({
    icon,
    text,
    color
}: Props) => (
        <div className={classes.root}>

            <Icon d={icon} color={color} />
            <Paragraph as="span" type="s2" weight="semibold" color={color}>
                {text}
            </Paragraph>

        <style jsx>{`
            .icon-text {
                display: inline-flex;
                align-items: center;
            }  

            .icon-text :global(svg) {
                margin-right: ${spaces.s6};
            }
        `}</style>
        </div>
    )

IconText.classes = classes

export default IconText