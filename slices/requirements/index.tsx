import React, { useCallback, useMemo } from 'react'
import Image from 'next/image'
import { PrismicRichText } from '@prismicio/react'

import { imageLoader } from '@/modules/about/summary'

interface RequirementsProps {
  slice?: any
  context?: any
}

interface IRequirement {
  label: string
  imagePath: string
  requirement: React.ReactNode
}

const RequirementBox: React.FC<RequirementsProps> = ({ slice, context }) => {
  const getSizeReq = useCallback(() => {
    const defaultReq = (
      <p>
        {`Width: ${context.document.dimensions?.width ?? 'null'} ${
          context.document.dimensions?.unit
        }`}
        <br />
        {`Height: ${context.document.dimensions?.height ?? 'null'} ${
          context.document.dimensions?.unit
        }`}
      </p>
    )
    if (!context.extraPath) {
      return defaultReq
    }
    if (context.country.countryCode?.toLowerCase() === 'us') {
      return (
        <p>
          Width: 2 Inch / 50.8 mm
          <br />
          Height: 2 Inch / 50.8 mm
        </p>
      )
    }
    if (context.country.countryCode?.toLowerCase() === 'gb') {
      return <p>35 x 45 mm</p>
    }

    return defaultReq
  }, [
    context.country.countryCode,
    context.document.dimensions?.height,
    context.document.dimensions?.unit,
    context.document.dimensions?.width,
    context.extraPath,
  ])

  const getBgColorReq = useCallback(() => {
    const defaultReq = (
      <p>
        {!context.document.background ||
        context.document.background?.toLowerCase() === '#ffffff'
          ? 'White'
          : context.document.background}
      </p>
    )
    if (!context.extraPath) return defaultReq
    if (context.country.countryCode?.toLowerCase() === 'us') {
      return <p>White</p>
    }
    if (context.country.countryCode?.toLowerCase() === 'gb') {
      return <p>White or Neutral Colour</p>
    }

    return defaultReq
  }, [
    context.country.countryCode,
    context.document.background,
    context.extraPath,
  ])

  const getHdHeightMinReq = useCallback(() => {
    const defaultReq = <p>32.8 </p>

    if (!context.extraPath) return defaultReq

    if (context.country.countryCode?.toLowerCase() === 'us') {
      return <p>1 Inch / 25.4 mm</p>
    }
    if (context.country.countryCode?.toLowerCase() === 'gb') {
      return <p>29 mm</p>
    }
    if (context.country.countryCode?.toLowerCase() === 'ca') {
      return <p>31 mm</p>
    }

    return defaultReq
  }, [context.country.countryCode, context.extraPath])

  const getHdHeightMax = useCallback(() => {
    const defaultReq = <p>null</p>

    if (!context.extraPath) return defaultReq

    if (context.country.countryCode?.toLowerCase() === 'us') {
      return <p>1.4 Inch / 35 mm</p>
    }
    if (context.country.countryCode?.toLowerCase() === 'gb') {
      return <p>34 mm</p>
    }
    if (context.country.countryCode?.toLowerCase() === 'ca') {
      return <p>36 mm</p>
    }

    return defaultReq
  }, [context.country.countryCode, context.extraPath])

  const getMinResolution = useCallback(() => {
    const defaultReq = (
      <p>
        {context.document.head?.position?.min
          ? `${context.document.head?.position?.min} mm`
          : 'null'}
      </p>
    )

    if (!context.extraPath) return defaultReq

    if (context.country.countryCode?.toLowerCase() === 'us') {
      return <p>600 dpi</p>
    }
    if (context.country.countryCode?.toLowerCase() === 'gb') {
      return <p>600 px</p>
    }
    if (context.country.countryCode?.toLowerCase() === 'gb') {
      return <p>600 dpi</p>
    }

    return defaultReq
  }, [
    context.country.countryCode,
    context.document.head?.position?.min,
    context.extraPath,
  ])

  const getMaxResolution = useCallback(() => {
    const defaultReq = <p>{`${context.document.dpi} dpi`}</p>

    if (!context.extraPath) return defaultReq

    if (context.country.countryCode?.toLowerCase() === 'us') {
      return <p>1200 dpi</p>
    }
    if (context.country.countryCode?.toLowerCase() === 'gb') {
      return <p>750 px</p>
    }
    if (context.country.countryCode?.toLowerCase() === 'ca') {
      return <p>1200 dpi</p>
    }

    return defaultReq
  }, [context.country.countryCode, context.document.dpi, context.extraPath])

  const requirements: IRequirement[] = useMemo(() => {
    const sizeReq: IRequirement = {
      label: 'Size',
      imagePath: '/images/requirements-item/item-01.svg',
      requirement: getSizeReq(),
    }

    const bgColorReq: IRequirement = {
      label:
        context.country.countryCode?.toLowerCase() === 'gb'
          ? 'Background Colour'
          : 'Background Color',
      imagePath: '/images/requirements-item/item-02.svg',
      requirement: getBgColorReq(),
    }
    const hdHeightMin: IRequirement = {
      label: 'Head Height Minimum',
      imagePath: '/images/requirements-item/item-03.svg',
      requirement: getHdHeightMinReq(),
    }
    const hdHeightMax: IRequirement = {
      label: 'Head Height Maximum',
      imagePath: '/images/requirements-item/item-05.svg',
      requirement: getHdHeightMax(),
    }
    const minResolution: IRequirement = {
      label: 'Minimum Resolution',
      imagePath: '/images/requirements-item/item-04.svg',
      requirement: getMinResolution(),
    }
    const maxResolution: IRequirement = {
      label:
        context.country.countryCode?.toLowerCase() === 'gb'
          ? 'Maximum Resolution'
          : 'Maximum Resolution',
      imagePath: '/images/requirements-item/item-06.svg',
      requirement: getMaxResolution(),
    }

    return [
      sizeReq,
      bgColorReq,
      hdHeightMin,
      minResolution,
      hdHeightMax,
      maxResolution,
    ]
  }, [
    context.country?.countryCode,
    getBgColorReq,
    getHdHeightMax,
    getHdHeightMinReq,
    getMaxResolution,
    getMinResolution,
    getSizeReq,
  ])

  const countryName = useMemo(() => {
    if (!context.country) return ''
    if (context.country.countryCode?.toLowerCase() === 'us') {
      return 'United States'
    }
    if (context.country.countryCode?.toLowerCase() === 'gb') return 'UK'

    return context.country.country || ''
  }, [context.country])

  return (
    <div className="requirements-box">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2>{`${countryName} ${context.document.type} Photo - Biometric Requirements`}</h2>
          </div>
          <div className="info-box">
            <div className="example-list">
              <ul>
                {slice.items.map((item: any, index: number) => (
                  <li key={index}>
                    <div className="icon-wrap">
                      <span>
                        <Image
                          src={item.list_icon.url}
                          width={item.list_icon.dimensions?.width}
                          height={item.list_icon.dimensions?.height}
                          loader={imageLoader}
                          layout="fill"
                          alt=""
                        />
                      </span>
                    </div>
                    <div className="text-wrap">
                      <PrismicRichText field={item.list_title} />
                      <PrismicRichText field={item.list_text} />
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="example-box">
              <div className="top-space">
                <p>{`${context.document.head?.position?.min ?? ''}`}</p>
              </div>
              <div className="face-space">
                <p>
                  <span>{slice.primary.image_face_space[0].text}</span>
                </p>
              </div>
              <div className="height-info">
                <p>
                  <span>{slice.primary.image_height[0].text}</span>
                </p>
              </div>
              <div className="width-info">
                <p>
                  <span>{slice.primary.image_width[0].text}</span>
                </p>
              </div>
              <div className="img-wrap">
                <span>
                  <Image
                    src={slice.primary.requirements_image.url}
                    width={slice.primary.requirements_image.dimensions.width}
                    height={slice.primary.requirements_image.dimensions.height}
                    loader={imageLoader}
                    layout="fill"
                    alt=""
                  />
                </span>
                <p>{slice.primary.image_dpi[0].text}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequirementBox
