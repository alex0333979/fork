import React from 'react'
import Image from 'next/image'
import classNames from 'classnames'
import { Link } from '@material-ui/core'

import { PAGES } from '@/constants/index'

interface Props {
  open: boolean
  onGoApplication: () => void
  onGoCart: () => void
}

const SaveModal: React.FC<Props> = ({ open, onGoApplication, onGoCart }) => (
  <div className={classNames('modal-wrap', { open })}>
    <div className="overlay" />
    <div className="modal-content">
      <div className="content-scroll">
        <div className="up-sale">
          <div className="text">
            <div className="title">
              <h3>
                {'Save time, complete'}
                <br /> {'your passport application'}
                <br /> {'form online now'}
                <br /> {'(avg. time: 2.5 mins)'}
              </h3>
            </div>
            <div className="btn-wrap">
              <button
                type="button"
                className="main-btn big"
                onClick={onGoApplication}>
                {'Start Your DS-82/DS-11 Form'}
              </button>
              <button
                type="button"
                className="main-btn big outline"
                onClick={onGoCart}>
                {'Skip & Proceed To Checkout'}
              </button>
            </div>
          </div>
          <div className="img">
            <span>
              <Link href={PAGES.application.create}>
                <Image
                  src="/images/upsell1.png"
                  width={514}
                  height={372}
                  alt=""
                />
              </Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
)
export default SaveModal
