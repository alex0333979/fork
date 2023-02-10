/* eslint-disable max-len */
import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { useProducts } from '@/hooks'
import { ShippingType, ProductSku } from '@/apollo'

interface Props {
  shippingType: ShippingType
  primary: any
}

const Services: React.FC<Props> = ({ shippingType, primary }) => {
  const { t } = useTranslation()
  // const { me } = useAuth()
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

  // const serviceDesc = useMemo(() => {
  //   const defaultDesc: any[] = [
  //     'We print and ship your photos on a premium glossy photo paper (along with other official documents)',
  //     '1 Digital photo for official website submission + a "ready to print" template to print at a local printer (store/home)',
  //     'Additional photo expert Review to ensure biometric requirements',
  //   ]
  //   if (me?.country === 'CA') {
  //     defaultDesc[0] = (
  //       <>
  //         Our studio prints and ships your photos on premium glossy photo paper.
  //         <br />
  //         <b>For Canadian passport</b> our studio will{' '}
  //         <u>stamp the back of your photo</u> and add the date and it’s address
  //         as required
  //       </>
  //     )
  //   }

  //   return defaultDesc
  // }, [me?.country])

  return (
    <>
      <li>
        <div className="name">
          <h3>{primary.print_ship_method[0].text}</h3>
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
            <h3>{primary.print_ship_list_title[0].text}</h3>
          )}
        </div>
        <div className="text">
          {shippingType === ShippingType.NoShipping ? (
            <>
              <ul className="checked">
                {primary.digital_pros.map((pro: any, index: number) => (
                  <li key={index}>{pro.text}</li>
                ))}
              </ul>
              <ul style={{ paddingTop: 0 }}>
                <li>{primary.digital_cons[0].text}</li>
              </ul>
            </>
          ) : (
            <ul className="checked">
              {primary.digital_pros.map((desc: any, index: number) => (
                <li key={index}>{desc.text}</li>
              ))}
            </ul>
          )}
        </div>
      </li>
    </>
  )
}

export default Services
