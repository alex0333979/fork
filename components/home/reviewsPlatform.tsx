import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay, Mousewheel, Navigation } from 'swiper';

const REVIEWS1 = [
  {
    content: (
      <p>
        {`WOW. I love this platform. When I contacted customer support, Carlus
        worked with me to answer my problem. I wanted a way to export my replies
        to reviews along with the reviews themselves. Carlus reached out to tech,
        and in only a couple business days, tech had created ...`}
      </p>
    ),
    author: {
      picture: '/images/reviews/author-01.png',
      name: 'Robert Fox',
      occupation: 'Billing Coordinator'
    }
  },
  {
    content: (
      <p>
        {`We really appreciate your feedback and like any good review, you've
          provided ways in making our product even better.`}
        <br />
        {`Allowing reviewers to upload video has proven to be very successful for
          bands and you're not alone in wanting the ability to respond to reviews
          via video!`}
      </p>
    ),
    author: {
      picture: '/images/reviews/author-02.png',
      name: 'Eleanor Pena',
      occupation: 'Regional Manager'
    }
  },
  {
    content: (
      <p>
        {`No, we are here, it is the right choice we made! The support team are
          amazing, any issues or queries they are quick to respond to, they helped
          us install the reviews widget to our website on EKM, and also helped to
          make sure we imported reviews over that we already had.`}
      </p>
    ),
    author: {
      picture: '/images/reviews/author-03.png',
      name: 'Arlene McCoy',
      occupation: 'Recruiter'
    }
  },
  {
    content: (
      <p>
        {`As a company needing to collect reviews using a trusted platform the
          decision to pick Reviews.co.uk was the right one.`}
        <br />
        {`No reviews platform is perfect but this one is the closest a small
          business will get if it wants to be aligned to a good company ethos and
          not get hijacked by the global data harvesting platforms.`}
      </p>
    ),
    author: {
      picture: '/images/reviews/author-04.png',
      name: 'Dianne Russell',
      occupation: 'IT Director'
    }
  }
];

const REVIEWS2 = [
  {
    content: (
      <p>
        {`Ciaran has been great, really helpful. I'm a new customer of Reviews.io -
          had a million annoying questions and Ciaran helped me through the set-up
          and explained everything to me. Appreciate his help. Nice to get proper
          full answers and quick responses.`}
      </p>
    ),
    author: {
      picture: '/images/reviews/author-05.png',
      name: 'Annette Black',
      occupation: 'Payroll Specialist'
    }
  },
  {
    content: (
      <p>
        {`We've been very happy users of reviews.io since 2017. We have an
          enterprise account and we're integrated with both product and company
          reviews via their easy to use API. Having our reviews featured alongside
          our Google Ads allow us to really stand out from our competitors.`}
      </p>
    ),
    author: {
      picture: '/images/reviews/author-06.png',
      name: 'Floyd Miles',
      occupation: 'Internal Auditor'
    }
  },
  {
    content: (
      <p>
        {`I am very pleased with the customer service and delighted with the
          features available to me at a very affordable price. I have limited skills
          when it comes to technical aspects of running my own website. Squarespace
          does not have a built in reviews platform so I have been looking for the
          perfect...`}
      </p>
    ),
    author: {
      picture: '/images/reviews/author-07.png',
      name: 'Savannah Nguyen',
      occupation: 'Regional Group Sales'
    }
  },
  {
    content: (
      <p>
        {`I really enjoy dealing with Reviews.io. They're in Leicester, so just down
          the road. They always have a answer to any of my questions and take the
          time to find the solution when needed. Carlus was on the ball and knew his
          way around the system very well and always had the correct answer for any
          of my questions.`}
      </p>
    ),
    author: {
      picture: '/images/reviews/author-04.png',
      name: 'Cameron Williamson',
      occupation: 'Financial Consultant'
    }
  }
];

const ReviewsPlatform: React.FC = () => (
  <div className="reviews-platform">
    <div className="container">
      <div className="data-wrap">
        <div className="sub-title">
          <h2>{'Platform Reviews'}</h2>
          <p>{'Biometrically approved photos'}</p>
        </div>
        <div className="reviews-wrap">
          <div className="slider-shade" />
          <div className="slider-wrap">
            <Swiper
              className="swiper-container"
              modules={[Mousewheel, Autoplay]}
              spaceBetween={0}
              slidesPerView={2}
              watchSlidesProgress={true}
              mousewheel={false}
              loop={true}
              loopAdditionalSlides={4}
              speed={10000}
              grabCursor={true}
              autoplay={{ delay: 10, disableOnInteraction: true, reverseDirection: false }}>
              {REVIEWS1.map((review, index) => (
                <SwiperSlide key={`swiper1_${index}`}>
                  <div className="reviews-item">
                    <div className="item-wrap">
                      <div className="content">{review.content}</div>
                      <div className="author">
                        <div className="picture">
                          <Image src={review.author.picture} layout={'fill'} alt="" />
                        </div>
                        <div className="name">
                          <h3>{review.author.name}</h3>
                          <p>{review.author.occupation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              className="swiper-container"
              modules={[Mousewheel, Autoplay]}
              spaceBetween={0}
              slidesPerView={2}
              watchSlidesProgress={true}
              mousewheel={false}
              loop={true}
              loopAdditionalSlides={4}
              speed={10000}
              grabCursor={true}
              autoplay={{ delay: 10, disableOnInteraction: true, reverseDirection: true }}>
              {REVIEWS2.map((review, index) => (
                <SwiperSlide key={`swiper2_${index}`}>
                  <div className="reviews-item">
                    <div className="item-wrap">
                      <div className="content">{review.content}</div>
                      <div className="author">
                        <div className="picture">
                          <Image src={review.author.picture} layout={'fill'} alt="" />
                        </div>
                        <div className="name">
                          <h3>{review.author.name}</h3>
                          <p>{review.author.occupation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="mobile-slider">
            <Swiper
              className="swiper-container"
              modules={[Navigation]}
              spaceBetween={0}
              slidesPerView={1}
              watchSlidesProgress={true}
              mousewheel={true}
              loop={true}
              loopAdditionalSlides={4}
              grabCursor={true}
              navigation={{
                prevEl: '.button-prev',
                nextEl: '.button-next'
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1
                },
                480: {
                  slidesPerView: 2
                },
                810: {
                  slidesPerView: 3
                }
              }}>
              {REVIEWS1.concat(REVIEWS2).map((review, index) => (
                <SwiperSlide key={`swiper_mobile_${index}`}>
                  <div className="reviews-item">
                    <div className="item-wrap">
                      <div className="content">{review.content}</div>
                      <div className="author">
                        <div className="picture">
                          <Image src={review.author.picture} layout={'fill'} alt="" />
                        </div>
                        <div className="name">
                          <h3>{review.author.name}</h3>
                          <p>{review.author.occupation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <div className="navigation">
                <div className="btn-wrap button-prev">
                  <span className="icon-right" />
                </div>
                <div className="btn-wrap button-next">
                  <span className="icon-right" />
                </div>
              </div>
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default ReviewsPlatform;
