import {FormattedMessage} from 'react-intl'

const MyFormattedMessage = (descriptor: FormattedMessage.MessageDescriptor) => (
    <FormattedMessage {...descriptor}>{text => text}</FormattedMessage>
)

export default MyFormattedMessage