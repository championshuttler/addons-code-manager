import * as React from 'react';

import { LineShapes, Token } from './utils';
import styles from './styles.module.scss';

export type PublicProps = {
  lineShapes: LineShapes;
};

type Props = PublicProps;

const CodeLineShapes = ({ lineShapes }: Props) => {
  return (
    <React.Fragment>
      {lineShapes.tokens.map((shape, shapeIndex) => {
        let className;
        if (shape.token === Token.whitespace) {
          className = styles.whitespace;
        } else {
          className = styles.code;
        }

        return (
          <div
            key={[
              String(lineShapes.line),
              String(shapeIndex),
              String(shape.percentOfWidth),
              className,
            ].join(':')}
            className={className}
            style={{ width: `${shape.percentOfWidth}%` }}
          />
        );
      })}
    </React.Fragment>
  );
};

export default CodeLineShapes;
