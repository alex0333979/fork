import React from 'react'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/bundle'
import { Autoplay, Mousewheel, Navigation } from 'swiper'
import { scrollToTop } from '@/lib/utils/scrollToTop'

const REVIEWS1 = [
  {
    content: `The procedure is very quick, the quality of service is also good. 
    I got the background of my photo changed to white, and the software gave me a warning
     that my first photo wasn’t good quality (due to the indoor light).  
     The tips provided, on how to take a good passport photo by your cell phone camera, 
     are extremely useful. Thanks.`,
    author: {
      picture: '/images/reviews/Issac_Ross.png',
      name: 'Isaac Ross, NY',
      occupation: 'Billing Coordinator',
    },
  },
  {
    content: `I love that they do not just print the photo, 
    they ensure the quality of the photo will be accepted by the passport authority. 
    They do not stop until they get it right. Awesome service. Can't wait to get my photos!`,
    author: {
      picture: '/images/reviews/Tia_Webb.png',
      name: 'Tia Webb, NC',
      occupation: 'Regional Manager',
    },
  },
  {
    content: `Brilliant service - each photo I took was analyzed and where it was not sufficient quality 
    I was able to retake for free. When one is up to standard they take it and remove the background 
    and make any changes necessary to get the photo to a standard where it will be accepted by the passport office. 
    The one sent got accepted no problem. 
    I would definitely recommend as probably the only way to pretty much guarantee your photo will be accepted.`,
    author: {
      picture: '/images/reviews/George_Pearce.png',
      name: 'George Pearce, TX',
      occupation: 'Recruiter',
    },
  },
  {
    content: `Fast, reliable, great service. 
    Quality of pics was just what I needed and I got the shot that I wanted to have for 10 years. 
    Would certainly use again.`,
    author: {
      picture: '/images/reviews/Isabelle_Parry.png',
      name: 'Isabelle Parry, NM',
      occupation: 'IT Director',
    },
  },
]

const REVIEWS2 = [
  {
    content: `This site is very user friendly and is very easy to navigate through.
    I had little or no issue using this site. I am very pleased with my results.`,
    author: {
      picture: '/images/reviews/Alex_Gradner.png',
      name: 'Alex Gardner, NJ',
      occupation: 'Payroll Specialist',
    },
  },
  {
    content: `If I’m going to need my passport for 10 years, getting the shot I wanted made sense. 
    I got it here.  Thank you.`,
    author: {
      picture: '/images/reviews/Daniel_Marcolina.png',
      name: 'Daniel Marcolina, NJ',
      occupation: 'Internal Auditor',
    },
  },
  {
    content: `Very good, it was convenient and easy way to take passport pictures, 
    it  beats going to the drug store and waiting for someone to help.`,
    author: {
      picture: '/images/reviews/Ace_Jonas.png',
      name: 'Ace Jonas, NY',
      occupation: 'Regional Group Sales',
    },
  },
  {
    content: `Very impressed by how easy it was to navigate and follow instructions on the site. 
    I was able to submit my order in very few steps and I like the option to have them printed and shipped to me. 
    I am also very impressed with the quick processing time, my order shipped the same day as I placed it! 
    The pricing is perfect and I will definitely recommend it to my friends.`,
    author: {
      picture: '/images/reviews/Ariah_Clay.png',
      name: 'Ariah Clay, CA',
      occupation: 'Financial Consultant',
    },
  },
]

interface ReviewsPlatformProps {
  setOpen: React.Dispatch<boolean>
}

const ReviewsPlatform: React.FC<ReviewsPlatformProps> = ({ setOpen }) => (
  <div className="reviews-platform">
    <div className="container">
      <div className="data-wrap">
        <div className="sub-title">
          <h2>{'See what our customers say about us'}</h2>
          <p>{'A quick peek'}</p>
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
              autoplay={{
                delay: 10,
                disableOnInteraction: true,
                reverseDirection: false,
              }}>
              {REVIEWS1.map((review, index) => (
                <SwiperSlide key={`swiper1_${index}`}>
                  <div className="reviews-item">
                    <div className="item-wrap">
                      <div className="content">
                        <p suppressHydrationWarning>{review.content}</p>
                      </div>
                      <div className="author">
                        {/* <div className="picture">
                          <Image
                            src={review.author.picture}
                            priority={true}
                            placeholder="empty"
                            layout={'fill'}
                            alt=""
                          />
                        </div> */}
                        <div className="name">
                          <h3>{review.author.name}</h3>
                          {/* <p>{review.author.occupation}</p> */}
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
              autoplay={{
                delay: 10,
                disableOnInteraction: true,
                reverseDirection: true,
              }}>
              {REVIEWS2.map((review, index) => (
                <SwiperSlide key={`swiper2_${index}`}>
                  <div className="reviews-item">
                    <div className="item-wrap">
                      <div suppressHydrationWarning className="content">
                        {review.content}
                      </div>
                      <div className="author">
                        {/* <div className="picture">
                          <Image
                            src={review.author.picture}
                            priority={true}
                            placeholder="empty"
                            layout={'fill'}
                            alt=""
                          />
                        </div> */}
                        <div className="name">
                          <h3>{review.author.name}</h3>
                          {/* <p>{review.author.occupation}</p> */}
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
                nextEl: '.button-next',
              }}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                },
                480: {
                  slidesPerView: 2,
                },
                810: {
                  slidesPerView: 3,
                },
              }}>
              {REVIEWS1.concat(REVIEWS2).map((review, index) => (
                <SwiperSlide key={`swiper_mobile_${index}`}>
                  <div className="reviews-item">
                    <div className="item-wrap">
                      <div className="content">{review.content}</div>
                      <div className="author">
                        { /*<div className="picture">
                          <Image
                            src={review.author.picture}
                            priority={true}
                            placeholder="empty"
                            layout={'fill'}
                            alt=""
                          />
                        </div>*/ }
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
        <div className="start-btn">
          <button
            className="main-btn big"
            onClick={() => {
              scrollToTop()
              setOpen(true)
            }}>{`Start Now`}</button>
        </div>
      </div>
    </div>
  </div>
)

export default ReviewsPlatform
