import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import GlobalStyle from '../GlobalStyle';
import TextHover from './TextHover';

export default {
  title: 'TextHover',
  component: TextHover,
  decorators: [
    story => (
      <>
        <GlobalStyle />
        {story()}
      </>
    ),
  ],
} as ComponentMeta<typeof TextHover>;

const Template: ComponentStory<typeof TextHover> = args => (
  <TextHover {...args} />
);

export const Default = Template.bind({});
Default.args = {
  direction: 'left',
  children: 'ABOUT',
};
