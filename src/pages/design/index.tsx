import React from 'react';
import { IRouteComponentProps } from 'umi'

const Design = (props: IRouteComponentProps) => {
  return (
    <div>
      {props.children}
    </div>
  );
};

export default Design;