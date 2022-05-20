import React, { useState, useEffect } from 'react';

export interface WhenProps {
  defaultRender?: React.ReactNode;
  conditions: boolean[];
  renders: React.ReactNode[];
}

const When: React.FC<WhenProps> = (props) => {
  const { defaultRender, conditions, renders } = props;

  const [ifs, setIfs] = useState<boolean[]>([]);

  useEffect(() => {
    setIfs(conditions);
  }, [conditions]);

  const content = ifs.map((f, i) => (f ? renders[i] : null)).filter((f) => f);

  return (
    <>
      {content.length ? content : defaultRender}
      {props.children}
    </>
  );
};

When.defaultProps = {
  conditions: [],
  renders: [],
};

export default When;
