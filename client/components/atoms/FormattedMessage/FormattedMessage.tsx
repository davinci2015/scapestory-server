import {FormattedMessage} from 'react-intl'

export interface MessageDescriptor extends FormattedMessage.Props {}

const MyFormattedMessage = (descriptor: MessageDescriptor) => (
    <FormattedMessage {...descriptor}>{text => text}</FormattedMessage>
)

export default MyFormattedMessage