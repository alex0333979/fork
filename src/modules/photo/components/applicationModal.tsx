import React from 'react'
import Image from 'next/image'
import { Link } from '@material-ui/core'

import Modal from '@/components/elements/modal'
import { PAGES } from '@/constants'

interface Props {
  open: boolean
  onGoApplication: () => void
  onGoCart: () => void
}

const ApplicationModal: React.FC<Props> = ({
  open,
  onGoApplication,
  onGoCart,
}) => (
  <Modal open={open}>
    <div className="content-scroll">
      <div className="up-sale">
        <div className="text">
          <div className="title">
            <h3>
              Save time, complete your passport application from online now (avg. time: 2.5 mins)
            </h3>
          </div>
          <div className="btn-wrap">
            <button
              type="button"
              className="main-btn big"
              onClick={onGoApplication}>
              Start Your DS-82/DS-11 Form
            </button>
            <button
              type="button"
              className="main-btn big outline"
              onClick={onGoCart}>
              Skip & Proceed To Checkout
            </button>
          </div>
        </div>
        <div className="img application-imgs">
          <span>
            <Link href={`${PAGES.application.create}?t=ds-82`}>
              <Image
                src="/images/ds82.jpeg"
                width={251}
                height={372}
                alt=""
              />
            </Link>
          </span>
          <span>
            <Link href={`${PAGES.application.create}?t=ds-11`}>
              <Image
                src="/images/ds11.png"
                width={251}
                height={372}
                alt=""
              />
            </Link>
          </span>
        </div>
      </div>
    </div>
  </Modal>
)

export default ApplicationModal
