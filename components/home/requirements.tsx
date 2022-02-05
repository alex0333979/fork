import React from 'react';
import Image from 'next/image';
import { Country, PDocument } from '@/generated/graphql';

const RequirementBox: React.FC<{ country: Country; document: PDocument }> = ({
  country,
  document
}) => (
  <div className="requirements-box">
    <div className="container">
      <div className="data-wrap">
        <div className="sub-title">
          <h2>{`${country.country} ${document.type} Photo - Biometric Requirements`}</h2>
        </div>
        <div className="info-box">
          <div className="example-list">
            <ul>
              <li>
                <div className="icon-wrap">
                  <span>
                    <Image
                      src={'/images/requirements-item/item-01.svg'}
                      width={27}
                      height={27}
                      alt=""
                    />
                  </span>
                </div>
                <div className="text-wrap">
                  <h3>{`Size`}</h3>
                  <p>
                    {`Width: ${document.dimensions?.width ?? 'null'} ${document.dimensions?.unit}`}
                    <br />
                    {`Height: ${document.dimensions?.height ?? 'null'} ${
                      document.dimensions?.unit
                    }`}
                  </p>
                </div>
              </li>
              <li>
                <div className="icon-wrap">
                  <span>
                    <Image
                      src={'/images/requirements-item/item-02.svg'}
                      width={27}
                      height={27}
                      alt=""
                    />
                  </span>
                </div>
                <div className="text-wrap">
                  <h3>{`Background Color`}</h3>
                  <p>{`${document.background ?? 'White'}`}</p>
                </div>
              </li>
              <li>
                <div className="icon-wrap">
                  <span>
                    <Image
                      src={'/images/requirements-item/item-03.svg'}
                      width={27}
                      height={27}
                      alt=""
                    />
                  </span>
                </div>
                <div className="text-wrap">
                  <h3>{`Head Height Minimum`}</h3>
                  <p>{`32.8 mm`}</p>
                </div>
              </li>
              <li>
                <div className="icon-wrap">
                  <span>
                    <Image
                      src={'/images/requirements-item/item-04.svg'}
                      width={27}
                      height={27}
                      alt=""
                    />
                  </span>
                </div>
                <div className="text-wrap">
                  <h3>{`Head Top Position Minimum`}</h3>
                  <p>{`${document.head?.position?.min ?? 'null'} mm`}</p>
                </div>
              </li>
              <li>
                <div className="icon-wrap">
                  <span>
                    <Image
                      src={'/images/requirements-item/item-05.svg'}
                      width={27}
                      height={27}
                      alt=""
                    />
                  </span>
                </div>
                <div className="text-wrap">
                  <h3>{`Head Height Maximum`}</h3>
                  <p>{`null`}</p>
                </div>
              </li>
              <li>
                <div className="icon-wrap">
                  <span>
                    <Image
                      src={'/images/requirements-item/item-06.svg'}
                      width={27}
                      height={27}
                      alt=""
                    />
                  </span>
                </div>
                <div className="text-wrap">
                  <h3>{`Resolution - dpi`}</h3>
                  <p>{`${document.dpi}`}</p>
                </div>
              </li>
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
                  {`${document.dimensions?.height ?? 'null'} ${document.dimensions?.unit}`}
                </span>
              </p>
            </div>
            <div className="width-info">
              <p>
                <span>
                  {`${document.dimensions?.width ?? 'null'} ${document.dimensions?.unit}`}
                </span>
              </p>
            </div>
            <div className="img-wrap">
              <span>
                <Image src={'/images/requirements-img.png'} width={294} height={310} alt="" />
              </span>
              <p>{`${document.dpi} dpi`}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default RequirementBox;
