import {ComponentMeta, ComponentStory} from '@storybook/react';
import GlobalStyle from '../GlobalStyle';
import GlitchText from './GlitchText';

export default {
  title: 'Glitch Text',
  component: GlitchText,
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
  decorators: [
    story => (
      <>
        <GlobalStyle />
        {story()}
      </>
    ),
  ],
} as ComponentMeta<typeof GlitchText>;

const Template: ComponentStory<typeof GlitchText> = args => (
  <GlitchText {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'Motive Ko',
};
