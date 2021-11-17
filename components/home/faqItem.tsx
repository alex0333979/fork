import React, { ReactNode, useState } from 'react';
import classNames from 'classnames';

export interface FaqItemProps {
  question: string;
  answer: ReactNode;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <li className={classNames({ open: show })}>
      <div className="question">
        <h3 onClick={() => setShow(!show)}>
          {question} <span className="icon-close" />
        </h3>
      </div>
      <div className="answer">{answer}</div>
    </li>
  );
};

export default FaqItem;
