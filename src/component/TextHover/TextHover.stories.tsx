import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import Background from '../Background';
import TextHover from './TextHover';

export default {
  title: 'TextHover',
  component: TextHover,
  decorators: [story => <Background>{story()}</Background>],
} as ComponentMeta<typeof TextHover>;

const Template: ComponentStory<typeof TextHover> = args => (
  <TextHover {...args} />
);

export const Default = Template.bind({});
Default.args = {
  direction: 'left',
  children: 'ABOUT',
};
