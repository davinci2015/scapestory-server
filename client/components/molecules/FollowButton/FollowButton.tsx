import React from 'react'
import {Button, FormattedMessage} from 'components/atoms'
import UserFollowIcon from 'assets/icons/user-plus.svg'

const FollowButton = ({toggleFollow}: {toggleFollow: VoidFunction}) => (
    <Button
        onClick={toggleFollow}
        dimensions="extraSmall"
        leftIcon={<UserFollowIcon />}
        color="tertiary"
    >
        <FormattedMessage id="user_profile.follow" defaultMessage="Follow" />
    </Button>
)

export default FollowButton
