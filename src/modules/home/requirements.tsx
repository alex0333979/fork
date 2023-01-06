import React, { useCallback, useMemo } from 'react'
import Image from 'next/image'

import { Country, PDocument } from '@/apollo'

interface Props {
  country: Country
  document: PDocument
  extraPath?: string | null
}

interface IRequirement {
  label: string
  imagePath: string
  requirement: React.ReactNode
}

const RequirementBox: React.FC<Props> = ({ country, document, extraPath }) => {
  const getSizeReq = useCallback(() => {
    const defaultReq = (
      <p>
        {`Width: ${document.dimensions?.width ?? 'null'} ${
          document.dimensions?.unit
        }`}
        <br />
        {`Height: ${document.dimensions?.height ?? 'null'} ${
          document.dimensions?.unit
        }`}
      </p>
    )
    if (!extraPath) {
      return defaultReq
    }
    if (country.countryCode?.toLowerCase() === 'us') {
      return (
        <p>
          Width: 2 Inch / 50.8 mm
          <br />
          Height: 2 Inch / 50.8 mm
        </p>
      )
    }
    if (country.countryCode?.toLowerCase() === 'gb') {
      return <p>35 x 45 mm</p>
    }

    return defaultReq
  }, [
    country.countryCode,
    document.dimensions?.height,
    document.dimensions?.unit,
    document.dimensions?.width,
    extraPath,
  ])

  const getBgColorReq = useCallback(() => {
    const defaultReq = (
      <p>
        {!document.background ||
        document.background?.toLowerCase() === '#ffffff'
          ? 'White'
          : document.background}
      </p>
    )
    if (!extraPath) return defaultReq
    if (country.countryCode?.toLowerCase() === 'us') {
      return <p>White</p>
    }
    if (country.countryCode?.toLowerCase() === 'gb') {
      return <p>White or Neutral Colour</p>
    }

    return defaultReq
  }, [country.countryCode, document.background, extraPath])

  const getHdHeightMinReq = useCallback(() => {
    const defaultReq = <p>32.8 mm</p>

    if (!extraPath) return defaultReq

    if (country.countryCode?.toLowerCase() === 'us') {
      return <p>1 Inch / 25.4 mm</p>
    }
    if (country.countryCode?.toLowerCase() === 'gb') {
      return <p>29 mm</p>
    }
    if (country.countryCode?.toLowerCase() === 'ca') {
      return <p>31 mm</p>
    }

    return defaultReq
  }, [country.countryCode, extraPath])

  const getHdHeightMax = useCallback(() => {
    const defaultReq = <p>null</p>

    if (!extraPath) return defaultReq

    if (country.countryCode?.toLowerCase() === 'us') {
      return <p>1.4 Inch / 35 mm</p>
    }
    if (country.countryCode?.toLowerCase() === 'gb') {
      return <p>34 mm</p>
    }
    if (country.countryCode?.toLowerCase() === 'ca') {
      return <p>36 mm</p>
    }

    return defaultReq
  }, [country.countryCode, extraPath])

  const getMinResolution = useCallback(() => {
    const defaultReq = (
      <p>
        {document.head?.position?.min
          ? `${document.head?.position?.min} mm`
          : 'null'}
      </p>
    )

    if (!extraPath) return defaultReq

    if (country.countryCode?.toLowerCase() === 'us') {
      return <p>600 dpi</p>
    }
    if (country.countryCode?.toLowerCase() === 'gb') {
      return <p>600 px</p>
    }
    if (country.countryCode?.toLowerCase() === 'gb') {
      return <p>600 dpi</p>
    }

    return defaultReq
  }, [country.countryCode, document.head?.position?.min, extraPath])

  const getMaxResolution = useCallback(() => {
    const defaultReq = <p>{`${document.dpi} dpi`}</p>

    if (!extraPath) return defaultReq

    if (country.countryCode?.toLowerCase() === 'us') {
      return <p>1200 dpi</p>
    }
    if (country.countryCode?.toLowerCase() === 'gb') {
      return <p>750 px</p>
    }
    if (country.countryCode?.toLowerCase() === 'ca') {
      return <p>1200 dpi</p>
    }

    return defaultReq
  }, [country.countryCode, document.dpi, extraPath])

  const requirements: IRequirement[] = useMemo(() => {
    const sizeReq: IRequirement = {
      label: 'Size',
      imagePath: '/images/requirements-item/item-01.svg',
      requirement: getSizeReq(),
    }

    const bgColorReq: IRequirement = {
      label:
        country.countryCode?.toLowerCase() === 'gb'
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
        country.countryCode?.toLowerCase() === 'gb'
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
    country?.countryCode,
    getBgColorReq,
    getHdHeightMax,
    getHdHeightMinReq,
    getMaxResolution,
    getMinResolution,
    getSizeReq,
  ])

  const countryName = useMemo(() => {
    if (!country) return ''
    if (country.countryCode?.toLowerCase() === 'us') return 'United States'
    if (country.countryCode?.toLowerCase() === 'gb') return 'UK'

    return country.country || ''
  }, [country])

  return (
    <div className="requirements-box">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2>{`${countryName} ${document.type} Photo - Biometric Requirements`}</h2>
          </div>
          <div className="info-box">
            <div className="example-list">
              <ul>
                {requirements
                  .filter((req) => !!req.requirement)
                  .map((req, index) => (
                    <li key={index}>
                      <div className="icon-wrap">
                        <span>
                          <Image
                            src={req.imagePath}
                            width={27}
                            height={27}
                            alt={req.label}
                          />
                        </span>
                      </div>
                      <div className="text-wrap">
                        <h3>{req.label}</h3>
                        {req.requirement}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="example-box">
              <div className="top-space">
                <p>{`${document.head?.position?.min ?? ''}`}</p>
              </div>
              <div className="face-space">
                <p>
                  <span>{`32.8 mm`}</span>
                </p>
              </div>
              <div className="height-info">
                <p>
                  <span>
                    {`${document.dimensions?.height ?? 'null'} ${
                      document.dimensions?.unit
                    }`}
                  </span>
                </p>
              </div>
              <div className="width-info">
                <p>
                  <span>
                    {`${document.dimensions?.width ?? 'null'} ${
                      document.dimensions?.unit
                    }`}
                  </span>
                </p>
              </div>
              <div className="img-wrap">
                <span>
                  <Image
                    src="/images/requirements-img.png"
                    layout="fill"
                    alt=""
                  />
                </span>
                <p>{`${document.dpi} dpi`}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RequirementBox
