import React from 'react';
import FaqItem, { FaqItemProps } from '@/components/home/faqItem';

const FAQ: FaqItemProps[] = [
  {
    question: 'Where do I send my DS-82 or DS-64?',
    answer: (
      <p>
        {`For the DS-82 and DS-64 forms, you must sign and date the application with the date on
          which you are completing the online form. Applications submitted without your signature
          and date will not be processed and will be returned to you.`}
        <br />
        <br />

        {`If you live in the United States, you must use the United States Postal Service (USPS)
          to mail your renewal application and supporting documents. If you live in Canada, you
          should use Canada Post. Please do not use other delivery services such as UPS, FedEx, or
          DHL. Only USPS or Canada Post can deliver to the PO Box addresses listed on Form
          DS-82.`}
        <br />
        <br />

        {`If you use UPS, FedEx, DHL, or another company to send your application, the application
          will be returned to you. Routine Service (If you live in California, Florida, Illinois,
          Minnesota, New York, or Texas): National Passport Processing Center Post Office Box
          640155 Irving, TX 75064-0155`}
      </p>
    )
  },
  {
    question: 'Where can I submit my DS-11?',
    answer: (
      <p>
        {`For the DS-82 and DS-64 forms, you must sign and date the application with the date on
          which you are completing the online form. Applications submitted without your signature
          and date will not be processed and will be returned to you.`}
        <br />
        <br />

        {`If you live in the United States, you must use the United States Postal Service (USPS)
          to mail your renewal application and supporting documents. If you live in Canada, you
          should use Canada Post. Please do not use other delivery services such as UPS, FedEx, or
          DHL. Only USPS or Canada Post can deliver to the PO Box addresses listed on Form
          DS-82.`}
        <br />
        <br />

        {`If you use UPS, FedEx, DHL, or another company to send your application, the application
          will be returned to you. Routine Service (If you live in California, Florida, Illinois,
          Minnesota, New York, or Texas): National Passport Processing Center Post Office Box
          640155 Irving, TX 75064-0155`}
      </p>
    )
  }
];

const FaqSection: React.FC = () => (
  <div className="faq-section">
    <div className="container">
      <div className="data-wrap">
        <div className="sub-title">
          <h2>{'Frequently Asked Questions'}</h2>
          <p>{'Biometrically approved photos'}</p>
        </div>
        <div className="faq-list">
          <ul>
            {FAQ.map((item, index) => (
              <FaqItem key={index} answer={item.answer} question={item.question} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  </div>
);

export default FaqSection;
