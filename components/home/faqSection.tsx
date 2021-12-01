import React from 'react';
import FaqItem, { FaqItemProps } from '@/components/home/faqItem';

const FAQ: FaqItemProps[] = [
  {
    question: 'Background',
    answer: (
      <p>{`Stand in front of a background that is plain or white and free of shadows`}</p>
    )
  },
  {
    question: 'Head Position',
    answer: (
      <p>{`Position your head inside the green overlay`}</p>
    )
  },
  {
    question: 'Facial Expression',
    answer: (
        <p>{`Keep a neutral expression and look directly into the camera with full your face in view`}</p>
    )
  },
  {
    question: 'Obstructions',
    answer: (
        <p>{`Don’t wear glasses, headphones or allow your hair or any other items to obstruct your face`}</p>
    )
  }
];

const FaqSection: React.FC = () => (
  <div className="faq-section" id="faq">
    <div className="container">
      <div className="data-wrap">
        <div className="sub-title">
          <h2>{'How To Take A Photo'}</h2>
          <p>{'Biometrically approved photos'}</p>
        </div>
        <div className="faq-list">
          <ul>
            {FAQ.map((item, index) => (
              <FaqItem key={index} answer={item.answer} question={item.question} />
            ))}
          </ul>
        </div>
        <div className="start-btn">
          <a href="/photo/select-type" className="main-btn big">{'Start now'}</a>
        </div>
      </div>
    </div>
  </div>
);

export default FaqSection;
