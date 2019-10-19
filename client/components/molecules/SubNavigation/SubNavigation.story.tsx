import React from 'react'
import {storiesOf} from '@storybook/react'
import SubNavigation from 'components/molecules/SubNavigation/SubNavigation';

storiesOf('Molecules | SubNavigation', module)
  .add('default', () => (
    <SubNavigation>
      <SubNavigation.Item active>
        Photo Posts
      </SubNavigation.Item>
      <SubNavigation.Item active={false}>
        Flora & Fauna
      </SubNavigation.Item>
      <SubNavigation.Item active={false}>
        Equipment
      </SubNavigation.Item>
      <SubNavigation.Item active={false}>
        Comments(22)
      </SubNavigation.Item>
    </SubNavigation>
  ))