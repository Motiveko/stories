import React, {CSSProperties, useEffect, useRef} from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1<Pick<GlitchTextProps, 'backgroundColor'>>`
  font-size: 5rem;
  color: #f1f1f1;
  position: relative;
  transform: skew(var(--skew)) scale(var(--scale));

  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    /* color: transparent;
    z-index: -1; */
    width: 100%;
    transition: clip-path 50ms ease-in;
    /* 배경색상과 동일하게 해서, clip-path 범위 내에서는 h1글자도 안보이게 할 수 있다.(배경색으로 보임). 글자가 뚝뚝 끊기는 너낌.. 이건 뭔가 global한 배경색상 변수를 만들어서 맞춰야 하는듯 */
    background-color: ${props => props.backgroundColor || '#2f2f2f'};
  }

  &::before {
    left: 5px;
    text-shadow: 2px -2px #2a96d4;
    -webkit-clip-path: polygon(
      0 var(--t1),
      100% var(--t1),
      100% var(--b1),
      0 var(--b1)
    );
    clip-path: polygon(
      0 var(--t1),
      100% var(--t1),
      100% var(--b1),
      0 var(--b1)
    );
  }

  &::after {
    left: -5px;
    text-shadow: -2px 2px #cc2a1f;
    -webkit-clip-path: polygon(
      0 var(--t2),
      100% var(--t2),
      100% var(--b2),
      0 var(--b2)
    );
    clip-path: polygon(
      0 var(--t2),
      100% var(--t2),
      100% var(--b2),
      0 var(--b2)
    );
  }
`;

type GlitchTextProps = {
  label: string;
  backgroundColor?: CSSProperties['backgroundColor'];
};

const glitch = (element: HTMLHeadingElement) => {
  let count = 0;
  return setInterval(() => {
    const skew = Math.random() * 20 - 10;
    element.style.setProperty('--skew', `${skew}deg`);
    // element::before
    const top1 = Math.random() * 100;
    const bottom1 = Math.random() * 100;
    element.style.setProperty('--t1', `${top1}%`);
    element.style.setProperty('--b1', `${bottom1}%`);
    // element::after
    const top2 = Math.random() * 100;
    const bottom2 = Math.random() * 100;
    element.style.setProperty('--t2', `${top2}%`);
    element.style.setProperty('--b2', `${bottom2}%`);

    // 초기화
    element.style.setProperty('--scale', '1');

    count++;

    if (count % 15 === 0) {
      const flag = Math.random() > 0.5 ? 1 : -1;
      const bigSkew = (70 + Math.random() * 18) * flag;
      const scale = 1 + Math.random() * 0.7;
      console.log(bigSkew);
      element.style.setProperty('--skew', `${bigSkew}deg`);
      element.style.setProperty('--scale', String(scale));
    }
  }, 100);
};

const GlitchText: React.FC<GlitchTextProps> = ({label, backgroundColor}) => {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const id = glitch(ref.current);
    return () => clearInterval(id);
  }, []);

  return (
    <StyledH1 backgroundColor={backgroundColor} ref={ref} data-text={label}>
      {label}
    </StyledH1>
  );
};

export default GlitchText;
