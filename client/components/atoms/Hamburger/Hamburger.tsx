import React from 'react'
import {spaces, colors, borderRadius} from 'styles'

interface Props {
    onClick: VoidFunction
    isOpen: boolean
}

const height = 20
const halfHeight = height / 2
const animationDuration = 400

const Hamburger: React.FunctionComponent<Props> = ({isOpen, onClick}) => {
    const getTransformValue = (defaultPosition: number, rotateDeg: number) =>
        `translate3d(0, ${isOpen ? halfHeight : defaultPosition}px, 0) rotate(${
            isOpen ? `${rotateDeg}deg` : '0'
        })`

    return (
        <>
            <div className="container" onClick={onClick}>
                <span className="line line--first"></span>
                <span className="line line--second"></span>
                <span className="line line--third"></span>
            </div>
            <style jsx>{`
                .container {
                    cursor: pointer;
                    width: ${spaces.s30};
                    height: ${height}px;
                    position: relative;
                    transform: rotate(0deg);
                }

                .line {
                    position: absolute;
                    display: block;
                    height: 2px;
                    width: 100%;
                    background: ${colors.DARK_GRAY};

                    transition-timing-function: 'ease';
                    transition-duration: ${animationDuration}ms;
                    border-radius: ${borderRadius.PRIMARY};
                    transform-origin: center;
                }

                .line--first {
                    transform: ${getTransformValue(0, 45)};
                }

                .line--second {
                    transition-timing-function: 'ease-out';
                    transition-duration: ${animationDuration / 4}ms;
                    opacity: ${isOpen ? 0 : 1};
                    top: ${halfHeight}px;
                }

                .line--third {
                    transform: ${getTransformValue(height, -45)};
                }
            `}</style>
        </>
    )
}

export default Hamburger
