/* eslint-disable max-len */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useProducts, useAuth } from '@/hooks'
import { ShippingType, ProductSku } from '@/apollo'

interface Props {
  shippingType: ShippingType
}

const Services: React.FC<Props> = ({ shippingType }) => {
  const { t } = useTranslation()
  const { me } = useAuth()
  const { getProduct } = useProducts()

  const printPrice = useMemo(
    () => getProduct(ProductSku.PrintShipService),
    [getProduct],
  )

  const subTotal = useMemo(
    () =>
      shippingType === ShippingType.NoShipping ? 0 : printPrice?.price || 0,
    [printPrice?.price, shippingType],
  )

  const serviceDesc = useMemo(() => {
    const defaultDesc: any[] = [
      'We print and ship your photos on a premium glossy photo paper (along with other official documents)',
      '1 Digital photo for official website submission + a "ready to print" template to print at a local printer (store/home)',
      'Additional photo expert Review to ensure biometric requirements',
    ]
    if (me?.country === 'CA') {
      defaultDesc[0] = (
        <>
          Our studio prints and ships your photos on premium glossy photo paper.
          <br />
          <b>For Canadian passport</b> our studio will{' '}
          <u>stamp the back of your photo</u> and add the date and it’s address
          as required
        </>
      )
    }

    return defaultDesc
  }, [me?.country])

  return (
    <>
      <li>
        <div className="name">
          <h3>Print & Ship Service Cost</h3>
          <p>
            Just
            <b>
              {t('currency', {
                value: subTotal,
                currency: printPrice?.currency.label,
              })}
            </b>
          </p>
        </div>
      </li>
      <li>
        <div className="name">
          {shippingType === ShippingType.NoShipping ? (
            <h3>
              <span>Digital Photo (Only) Includes:</span>
            </h3>
          ) : (
            <h3>Print & Ship Service Includes:</h3>
          )}
        </div>
        <div className="text">
          {shippingType === ShippingType.NoShipping ? (
            <>
              <ul className="checked">
                <li>
                  All your photos on a &quot;ready to print&quot; template to be
                  printed in any store or at home
                </li>
                <li>
                  1 digital photo in a JPG format for official web submission
                </li>
                <li>
                  Additional photo expert Review to ensure biometric
                  requirements
                </li>
              </ul>
              <ul style={{ paddingTop: 0 }}>
                <li>
                  Not Including printed photos on a premium glossy photo paper
                </li>
              </ul>
            </>
          ) : (
            <ul className="checked">
              {serviceDesc.map((desc: any, index: number) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
          )}
        </div>
      </li>
    </>
  )
}

export default Services
