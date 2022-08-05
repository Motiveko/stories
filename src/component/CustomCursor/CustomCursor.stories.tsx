import {ComponentMeta, ComponentStory} from '@storybook/react';
import CustomCursor from './CustomCursor';
import CustomCursorBackgrounds from './CustomCursorBackgrounds';

export default {
  title: 'CustomCursor',
  component: CustomCursor,
  decorators: [
    story => (
      <>
        <CustomCursorBackgrounds />
        {story()}
      </>
    ),
  ],
} as ComponentMeta<typeof CustomCursor>;

const Template: ComponentStory<typeof CustomCursor> = args => (
  <CustomCursor {...args} />
);

export const Default = Template.bind({});
