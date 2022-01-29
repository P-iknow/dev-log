import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import useOffsetTop from 'hooks/useOffsetTop';

import Toc from './Toc';
import StyledMarkdown from './StyledMarkdown';

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 112px;

  @media (max-width: 768px) {
    padding: 0 15px;
  }
`;

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  html: any;
}
const Body = ({ html }: Props) => {
  const [toc, setToc] = useState<HTMLHeadElement[]>([]);

  const [ref, offsetTop] = useOffsetTop();

  useEffect(() => {
    setToc(Array.from(document.querySelectorAll('#article-body > h2, #article-body > h3')));
  }, []);

  return (
    <Wrapper>
      <Toc items={toc} articleOffset={offsetTop} />

      <StyledMarkdown
        id="article-body"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        dangerouslySetInnerHTML={{ __html: html }}
        itemProp="articleBody"
        ref={ref}
      />
    </Wrapper>
  );
};

export default Body;
