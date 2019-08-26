import React from 'react'
import {Paragraph} from 'components/atoms'
import {colors} from 'styles';

const classes = {
    root: 'image-stack'
}

interface Props {
    images: string[]
    text: React.ReactNode
}

const ImageStack = ({
    images,
    text
}: Props) => (
        <div className={classes.root}>
            <div className="images">
                {images.map((image, index) => (
                    <div key={index} className="image" style={{
                        backgroundImage: `url("${image}")`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}></div>
                ))}
            </div>
            <div className="text">
                <Paragraph color={colors.SHADE_DEEP} type="body">
                    {text}
                </Paragraph>
            </div>

            <style jsx>{`
                .${classes.root} {
                    display: flex;
                    align-items: center;
                    margin-left: 15px;
                }

                .images {
                    display: flex;
                }

                .image {
                    width: 30px;
                    height: 30px;
                    margin: 0;
                    margin-left: -15px;
                    border: 1px solid ${colors.WHITE};
                    border-radius: 50%;
                }

                .text {
                    margin-left: 15px;  
                }
            `}</style>
        </div>
    )

ImageStack.classes = classes

export default ImageStack