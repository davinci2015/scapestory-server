import {FormattedMessage, MessageDescriptor} from 'react-intl'

const MyFormattedMessage = (descriptor: MessageDescriptor & {values?: {[key: string]: string}}) => (
    <FormattedMessage {...descriptor}>{text => text}</FormattedMessage>
)

export default MyFormattedMessage