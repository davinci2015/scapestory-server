import React from 'react'
import {Button, FormattedMessage} from 'components/atoms'
import UserUnfollowIcon from 'assets/icons/user-minus.svg'

const UnfollowButton = ({toggleFollow}: {toggleFollow: VoidFunction}) => (
    <Button
        onClick={toggleFollow}
        dimensions="extraSmall"
        leftIcon={<UserUnfollowIcon />}
        color="tertiary"
    >
        <FormattedMessage id="user_profile.unfollow" defaultMessage="Unfollow" />
    </Button>
)

export default UnfollowButton
