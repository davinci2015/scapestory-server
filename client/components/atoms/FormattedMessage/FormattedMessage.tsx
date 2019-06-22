import {FormattedMessage} from 'react-intl'

export interface MessageDescriptor extends FormattedMessage.MessageDescriptor {}

const MyFormattedMessage = (descriptor: MessageDescriptor) => (
    <FormattedMessage {...descriptor}>{text => text}</FormattedMessage>
)

export default MyFormattedMessage