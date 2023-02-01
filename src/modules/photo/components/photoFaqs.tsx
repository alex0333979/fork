import React from 'react'
import NextImage from 'next/image'
import FaqItem from '@/modules/home/faqItem'
import { IFAQ } from '@/modules/home/types'

const Data: IFAQ[] = [
  {
    key: 'faq1',
    question: 'Background',
    answer: (
      <p>
        {
          'Stand in front of a background that is plain or white and free of shadows'
        }
      </p>
    ),
  },
  {
    key: 'faq2',
    question: 'Head Position',
    answer: (
      <>
        <p>Position your head inside the green overlay</p>
        <div className="img-list">
          <span>
            <NextImage
              src="/images/steps/step-faq-01.png"
              layout="fill"
              alt=""
            />
          </span>
          <span>
            <NextImage
              src="/images/steps/step-faq-02.png"
              layout="fill"
              alt=""
            />
          </span>
          <span>
            <NextImage
              src="/images/steps/step-faq-03.png"
              layout="fill"
              alt=""
            />
          </span>
        </div>
      </>
    ),
  },
  {
    key: 'faq3',
    question: 'Facial Expression',
    answer: (
      <p>
        {
          'Keep a neutral expression and look directly into the camera with full your face in view'
        }
      </p>
    ),
  },
  {
    key: 'faq4',
    question: 'Obstructions',
    answer: (
      <p>
        {
          'Don’t wear glasses, headphones or allow your hair or any other items to obstruct your face'
        }
      </p>
    ),
  },
]

const PhotoFaqs: React.FC = () => (
  <div className="faq-section">
    <div className="faq-list">
      <ul>
        {Data.map((item, index) => (
          <FaqItem key={index} faq={item} />
        ))}
      </ul>
    </div>
  </div>
)

export default PhotoFaqs
