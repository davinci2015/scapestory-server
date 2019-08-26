import {spaces} from 'styles'
import {Icon, Paragraph} from 'components/atoms'

interface Props {
    icon: string
    text: React.ReactNode
}

const classes = {
    root: 'icon-text'
}

const IconText = ({
    icon,
    text
}: Props) => (
    <div className={classes.root}>
    
        <Icon d={icon} />
        <Paragraph as="span" type="s2" weight="semibold">
            {text}
        </Paragraph>

        <style jsx>{`
            .${classes.root} {
                display: inline-flex;
                align-items: center;
            }  

            .${classes.root} :global(svg) {
                margin-right: ${spaces.s6};
            }
        `}</style>
    </div>
)

IconText.classes = classes

export default IconText