import {MessageDescriptor} from 'components/atoms/FormattedMessage'

export const isMessageDescriptor = (descriptor: any): descriptor is MessageDescriptor => 
    typeof descriptor === 'object' && 'defaultMessage' in descriptor && 'id' in descriptor