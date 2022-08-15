import {ComponentMeta, ComponentStory} from '@storybook/react';
import styled from 'styled-components';
import GsapMagnetButton, {MagnetButtonBackground} from './\bGsapMagnetButton';
import VanillaMagnetButton from './VanillaMagnetButton';

const Layout = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 500px;
`;
export default {
  title: 'Magnet Button',
  component: GsapMagnetButton,
  decorators: [
    story => (
      <Layout>
        <MagnetButtonBackground />
        {story()}
      </Layout>
    ),
  ],
} as ComponentMeta<typeof GsapMagnetButton>;

const Template: ComponentStory<typeof GsapMagnetButton> = args => (
  <>
    <GsapMagnetButton {...args} />
    <div style={{margin: '1rem'}} />
    <VanillaMagnetButton label={'Vanilla'} />
  </>
);

export const Default = Template.bind({});
Default.args = {
  label: 'GSAP',
};
