import {ComponentMeta, ComponentStory} from '@storybook/react';
import styled from 'styled-components';
import GsapMagnetButton, {MagnetButtonBackground} from './\bGsapMagnetButton';

const CenterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
`;
export default {
  title: 'Magnet Button',
  component: GsapMagnetButton,
  decorators: [
    story => (
      <CenterDiv>
        <MagnetButtonBackground />
        {story()}
      </CenterDiv>
    ),
  ],
} as ComponentMeta<typeof GsapMagnetButton>;

const Template: ComponentStory<typeof GsapMagnetButton> = args => (
  <GsapMagnetButton {...args} />
);

export const Default = Template.bind({});
Default.args = {
  label: 'HOVER',
};
