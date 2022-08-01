import {ComponentMeta, ComponentStory} from '@storybook/react';
import GlobalStyle from '../GlobalStyle';
import Card3d from './Card3d';

export default {
  title: 'Card3d',
  component: Card3d,
  decorators: [
    story => (
      <>
        <GlobalStyle background-color="white" />
        {story()}
      </>
    ),
  ],
} as ComponentMeta<typeof Card3d>;

const Template: ComponentStory<typeof Card3d> = args => <Card3d {...args} />;

export const Default = Template.bind({});
