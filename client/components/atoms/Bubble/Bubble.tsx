import {colors} from 'styles';

interface Props {
    size?: string
    opacity?: number
}

const Bubble = ({
    size = '300px',
    opacity = 0.05
}: Props) => (
    <div className="bubble">
        <style jsx>{`
            .bubble {
                width: ${size};
                height: ${size};
                border-radius: 50%;
                border: 14px solid ${colors.PRIMARY};
                opacity: ${opacity};
            }
        `}</style>
    </div>
)

export default Bubble