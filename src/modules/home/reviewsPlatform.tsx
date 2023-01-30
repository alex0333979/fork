import React, { useMemo } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/bundle'
import { Autoplay, Mousewheel, Navigation } from 'swiper'

import { scrollToTop } from '@/utils'
import { PrismicDocument } from '@prismicio/types'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'

interface ReviewsPlatformProps {
  onStartNow: (isOpen?: boolean) => void
  page?: PrismicDocument<Record<string, any>, string, string>
}

const ReviewsPlatform: React.FC<ReviewsPlatformProps> = ({ onStartNow, page }) => {
  const items = page?.data.slices[1].items
  const middleIndex = Math.ceil(items.length / 2)

  
  const [REVIEWS1, REVIEWS2] = useMemo(() => {
    const _REVIEWS1 = [...items.slice(0, middleIndex)]
    const _REVIEWS2 = [...items.slice(-middleIndex)]

    return [_REVIEWS1, _REVIEWS2]
  }, [items])

  return (
    <div className="reviews-platform">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2><PrismicRichText field={page?.data.slices[1].primary.reviews_title} /></h2>
            <PrismicRichText field={page?.data.slices[1].primary.reviews_text} />
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
                        <div className="rating">
                          <PrismicNextImage field={page?.data.slices[1].items[index].review_stars} />
                        </div>
                        <div className="content">
                          <p suppressHydrationWarning>
                            <PrismicRichText field={page?.data.slices[1].items[index].review_text} />
                          </p>
                        </div>
                        <div className="author">
                          <div className="name">
                            <h3>
                              <PrismicRichText field={page?.data.slices[1].items[index].author_name} />
                            </h3>
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
                        <div className="rating">
                        <PrismicNextImage field={page?.data.slices[1].items[index].review_stars} />
                        </div>
                        <div suppressHydrationWarning className="content">
                          <PrismicRichText field={page?.data.slices[1].items[index].review_text} />
                        </div>
                        <div className="author">
                          <div className="name">
                            <h3>
                              <PrismicRichText field={page?.data.slices[1].items[index].author_name} />
                            </h3>
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
                          <div className="name">
                            {/* <h3>{review.author.name}</h3> */}
                            {/* <p>{review.author.occupation}</p> */}
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
                onStartNow(true)
              }}>
              <PrismicRichText field={page?.data.slices[1].primary.reviews_button} />
            </button>
          </div>
        </div>
      </div>
    </div>
)}

export default ReviewsPlatform
