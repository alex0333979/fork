import React from 'react'
import Image from 'next/image'
import { Link } from '@material-ui/core'
import { PAGES } from '../../constants'
import { UpSellPageProps } from '@/pages/up-sell'

const UpSell: React.FC<UpSellPageProps> = ({ ds11, ds82 }) => (
  <div className="online-forms">
    <div className="container">
      <div className="data-wrap">
        <div className="sub-title">
          <h2>
            {'Would You Like To Complete Your Passport'}
            <br /> {'Application Forms Online?'}
          </h2>
        </div>
        <div className="digital-app">
          <div className="title">
            <h1>{'Use our digital app tool to fill out your application'}</h1>
          </div>
          <div className="img">
            <span>
              <Image src={'/images/up-sale.png'} layout={'fill'} alt="" />
            </span>
          </div>
        </div>
        <div className="forms-list">
          <div className="form-box">
            <div className="name">
              <h3>{'Passport Renewal'}</h3>
            </div>
            <div className="img">
              <span>
                <Image src={'/images/ds82.jpeg'} layout={'fill'} alt="" />
              </span>
            </div>
            <div className="btn">
              <Link href={`${PAGES.application.create}?formId=${ds82}`}>
                <button className="main-btn big">
                  {'Start your'}
                  <br />
                  {'DS - 82 form'}
                </button>
              </Link>
            </div>
          </div>
          <div className="form-box">
            <div className="name">
              <h3>{'New Passport'}</h3>
            </div>
            <div className="img">
              <span>
                <Image src={'/images/ds11.png'} layout={'fill'} alt="" />
              </span>
            </div>
            <div className="btn">
              <Link href={`${PAGES.application.create}?formId=${ds11}`}>
                <button className="main-btn big">
                  {'Start your'}
                  <br />
                  {'DS - 11 form'}
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="proceed-btn">
          <Link href={PAGES.cart}>
            <button className="main-btn big outline">
              {'Proceed to photo cart'}
            </button>
          </Link>
          <p>{'Without filling out an application'}</p>
        </div>
      </div>
    </div>
  </div>
)

export default UpSell
