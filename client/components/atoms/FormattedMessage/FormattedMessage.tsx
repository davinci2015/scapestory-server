import React from 'react'
import {FormattedMessage, MessageDescriptor} from 'react-intl'

const MyFormattedMessage = (
    descriptor: MessageDescriptor & {values?: {[key: string]: React.ReactNode}}
) => <FormattedMessage {...descriptor}>{text => text}</FormattedMessage>

export default MyFormattedMessage
