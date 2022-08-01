import {ComponentMeta, ComponentStory} from '@storybook/react';
import GlobalStyle from '../GlobalStyle';
import RippleButton from './RippleButton';

export default {
  title: 'RippleButton',
  component: RippleButton,
  argTypes: {
    color: {control: 'color'},
  },
  decorators: [
    story => (
      <>
        <GlobalStyle />
        {story()}
      </>
    ),
  ],
} as ComponentMeta<typeof RippleButton>;

const Template: ComponentStory<typeof RippleButton> = args => (
  <RippleButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  children: 'CLICK ME',
};

export const Blue = Template.bind({});
Blue.args = {
  children: 'CLICK ME',
  color: `rgba(0,0,255,0.5)`,
};
