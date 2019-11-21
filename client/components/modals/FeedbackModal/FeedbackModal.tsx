import {useContext} from 'react'

import {
    Headline,
    Paragraph,
    Button,
    Icon,
    FormattedMessage,
    Textarea,
} from 'components/atoms'
import {colors, spaces, media} from 'styles'
import {ModalContext} from 'providers/ModalProvider'

interface Props {}

const FeedbackModal = ({}: Props) => {
    const {closeModal} = useContext(ModalContext)

    return (
        <>
            <div className="body">
                <a onClick={closeModal} className="close-button">
                    <Icon d={Icon.CLOSE} color={colors.DARK_GRAY} size={26} />
                </a>
                <Headline as="h1" variant="h3">
                    <FormattedMessage
                        id="feedback.title"
                        defaultMessage="Your feedback means a lot!"
                    />
                </Headline>
                <div className="subtitle">
                    <Paragraph as="p" color={colors.DARK_GRAY}>
                        <FormattedMessage
                            id="feedback.subtitle"
                            defaultMessage="To make Scapestory even better place!"
                        />
                    </Paragraph>
                </div>
                <div className="form">
                    <Textarea placeholder="Enter your feedback" />
                    <Button type="block">
                        <FormattedMessage
                            id="feedback.submit"
                            defaultMessage="Send"
                        />
                    </Button>
                </div>
            </div>

            <style jsx>{`
                .body {
                    height: auto;
                    padding: ${spaces.s36} ${spaces.s12} 0 ${spaces.s12};
                    position: relative;
                    overflow-x: hidden;
                }

                @media ${media.up('small')} {
                    :global(.modal) {
                        bottom: auto;
                        top: 50%;
                        transform: translate(-50%, -50%);
                    }
                }

                .body :global(.${Headline.classes.root}) {
                    padding-right: ${spaces.s42};
                }

                .body :global(.${Button.classes.root}) {
                    margin-top: ${spaces.s36};
                    margin-bottom: ${spaces.s60};
                }

                @media ${media.up('small')} {
                    .body {
                        padding: ${spaces.s60} 96px 0 96px;
                    }

                    .body :global(.${Headline.classes.root}) {
                        padding-right: 0;
                    }
                }

                .subtitle {
                    margin-top: ${spaces.s24};
                    margin-bottom: ${spaces.s42};
                }

                .form {
                    margin-bottom: ${spaces.s24};
                }

                .close-button {
                    cursor: pointer;
                    position: absolute;
                    top: ${spaces.s18};
                    right: ${spaces.s18};
                    padding: ${spaces.s6};
                }
            `}</style>
        </>
    )
}

export default FeedbackModal
