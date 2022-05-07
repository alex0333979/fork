import React, { useMemo } from 'react'
import Image from 'next/image'
import { Country, PDocument } from '@/generated/graphql'

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
  const requirements: IRequirement[] = useMemo(() => {
    const sizeReq: IRequirement = {
      label: 'Size',
      imagePath: '/images/requirements-item/item-01.svg',
      requirement: extraPath ? (
        <p>
          Width: 2 Inch / 50.8 mm
          <br />
          Height: 2 Inch / 50.8 mm
        </p>
      ) : (
        <p>
          {`Width: ${document.dimensions?.width ?? 'null'} ${
            document.dimensions?.unit
          }`}
          <br />
          {`Height: ${document.dimensions?.height ?? 'null'} ${
            document.dimensions?.unit
          }`}
        </p>
      ),
    }

    const bgColorReq: IRequirement = {
      label: 'Background Color',
      imagePath: '/images/requirements-item/item-02.svg',
      requirement: extraPath ? (
        <p>White</p>
      ) : (
        <p>
          {!document.background ||
          document.background?.toLowerCase() === '#ffffff'
            ? 'White'
            : document.background}
        </p>
      ),
    }
    const hdHeightMin: IRequirement = {
      label: 'Head Height Minimum',
      imagePath: '/images/requirements-item/item-03.svg',
      requirement: extraPath ? <p>1 Inch / 25.4 mm</p> : <p>32.8 mm</p>,
    }
    const minResolution: IRequirement = {
      label: 'Minimum Resolution',
      imagePath: '/images/requirements-item/item-04.svg',
      requirement: extraPath ? (
        <p>600 dpi</p>
      ) : (
        <p>
          {document.head?.position?.min
            ? `${document.head?.position?.min} mm`
            : 'null'}
        </p>
      ),
    }
    const hdHeightMax: IRequirement = {
      label: 'Head Height Maximum',
      imagePath: '/images/requirements-item/item-05.svg',
      requirement: extraPath ? <p>1.4 Inch / 35 mm</p> : <p>null</p>,
    }
    const maxResolution: IRequirement = {
      label: 'Maximum Resolution',
      imagePath: '/images/requirements-item/item-06.svg',
      requirement: extraPath ? <p>1200</p> : <p>{document.dpi}</p>,
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
    document.background,
    document.dimensions?.height,
    document.dimensions?.unit,
    document.dimensions?.width,
    document.dpi,
    document.head?.position?.min,
    extraPath,
  ])

  return (
    <div className="requirements-box">
      <div className="container">
        <div className="data-wrap">
          <div className="sub-title">
            <h2>{`${country.country} ${document.type} Photo - Biometric Requirements`}</h2>
          </div>
          <div className="info-box">
            <div className="example-list">
              <ul>
                {requirements.map((req, index) => (
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
                    src={'/images/requirements-img.png'}
                    width={294}
                    height={310}
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
