import {ComponentMeta, ComponentStory} from '@storybook/react';
import ImageGrid, {ImageGridGlobalStyle} from './ImageGrid';

export default {
  title: 'Image Grid',
  component: ImageGrid,
  decorators: [
    story => (
      <div id="root">
        <ImageGridGlobalStyle />
        {story()}
      </div>
    ),
  ],
} as ComponentMeta<typeof ImageGrid>;

const Template: ComponentStory<typeof ImageGrid> = args => (
  <>
    <ImageGrid {...args} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  row: 15,
  column: 10,
  animationType: 'forward',
  tick: 15,
};
