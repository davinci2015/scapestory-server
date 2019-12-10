import React from 'react'
import {storiesOf} from '@storybook/react'
import SubNavigation from 'components/molecules/SubNavigation/SubNavigation'

storiesOf('Molecules | SubNavigation', module).add('default', () => (
    <SubNavigation>
        <SubNavigation.Item id="1">Photo Posts</SubNavigation.Item>
        <SubNavigation.Item id="2">Flora & Fauna</SubNavigation.Item>
        <SubNavigation.Item id="3">Equipment</SubNavigation.Item>
        <SubNavigation.Item id="4">Comments(22)</SubNavigation.Item>
    </SubNavigation>
))
