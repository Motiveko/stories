import {ComponentMeta, ComponentStory} from '@storybook/react';
import React from 'react';
import Background from '../Background';
import HoverButton from './HoverButton';

export default {
  title: 'HoverButton',
  component: HoverButton,
  decorators: [story => <Background>{story()}</Background>],
} as ComponentMeta<typeof HoverButton>;

const Template: ComponentStory<typeof HoverButton> = args => (
  <HoverButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  direction: 'left',
  children: 'ABOUT',
};
