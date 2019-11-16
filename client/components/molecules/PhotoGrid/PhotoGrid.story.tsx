import React from 'react'
import {storiesOf} from '@storybook/react'
import {PhotoGrid} from 'components/molecules'
import mock from 'mocks/storybook'

storiesOf('Molecules | PhotoGrid', module)
  .add('default', () => (
    <PhotoGrid images={[
      {src: mock.aquascapeImage, alt: 'Image'},
      {src: mock.aquascapeImage, alt: 'Image'},
      {src: mock.aquascapeImage, alt: 'Image'},
      {src: mock.aquascapeImage, alt: 'Image'},
      {src: mock.aquascapeImage, alt: 'Image'},
      {src: mock.aquascapeImage, alt: 'Image'},
      {src: mock.aquascapeImage, alt: 'Image'},
  ]} />
  ))