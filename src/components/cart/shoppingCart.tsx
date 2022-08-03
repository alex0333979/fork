import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import {
  Product,
  CartItem,
  ProductCategory,
  useRemoveItemsFromCartMutation,
} from '@/apollo'
import ShoppingCartItem from '@/components/cart/cartItem'
import PreviewPhotoModal from '@/components/elements/previewPhotoModal'
import { useAuth } from '@/hooks'
import { showError } from '@/utils'
import { useCurrency, useProducts } from '@/hooks'
import { CartPageProps } from '@/pages/cart'
import { PAGES } from '../../constants'

const ShoppingCart: React.FC<CartPageProps> = ({ cart: _cart }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { cart, updateCart } = useAuth()
  const { currentCurrency } = useCurrency()
  const { getProduct } = useProducts()
  const [removeFromCart] = useRemoveItemsFromCartMutation()
  const [open, setOpen] = useState<boolean>(false)
  const [prevUrl, setPrevUrl] = useState<string>('')

  useEffect(() => {
    updateCart(_cart)
  }, [_cart, updateCart])

  const onPreview = useCallback((url: string) => {
    setPrevUrl(url)
    setOpen(true)
  }, [])

  const onRemoveCartItem = useCallback(
    async (id: string) => {
      const { data } = await removeFromCart({ variables: { ids: [id] } })
      const __cart = data?.RemoveItemsFromCart.data
      if (__cart) {
        updateCart(__cart)
      }
    },
    [removeFromCart, updateCart],
  )

  const subTotal = useMemo(
    () =>
      cart?.items
        ?.filter((i) => i.isComplete)
        .reduce((a, item) => {
          const product: Product | undefined = getProduct(item.productSku)
          return a + (product?.price || 0)
        }, 0),
    [cart?.items, getProduct],
  )

  const onCheckout = useCallback(async () => {
    if (cart?.items?.filter((i) => i.isComplete)?.length ?? 0 > 0) {
      await router.push(PAGES.checkout.index)
    } else {
      showError(`You don't have any completed entries in your cart yet.`)
    }
  }, [cart?.items, router])

  const [photoItems, applicationItems] = useMemo(() => {
    const _photoItems: CartItem[] = []
    const _applicationItems: CartItem[] = []

    ;(cart?.items || []).forEach((item) => {
      if (item.productCategory === ProductCategory.Photo) {
        _photoItems.push(item)
      }
      if (item.productCategory === ProductCategory.Application) {
        _applicationItems.push(item)
      }
    })

    return [_photoItems, _applicationItems]
  }, [cart?.items])

  return (
    <>
      <div className="cart-page">
        <div className="page-title">
          <div className="container">
            <div className="data-wrap">
              <h1>{t('shoppingCart')}</h1>
            </div>
          </div>
        </div>

        <div className="application-form">
          <div className="container">
            <div className="cart-summary">
              {photoItems.length > 0 && (
                <div className="item-wrap">
                  <ul>
                    {photoItems.map((item, index) => (
                      <ShoppingCartItem
                        key={index}
                        currency={currentCurrency}
                        item={item}
                        onDelete={onRemoveCartItem}
                        onUpdated={updateCart}
                        onPreview={onPreview}
                      />
                    ))}
                  </ul>
                </div>
              )}

              {applicationItems.length > 0 && (
                <div className="item-wrap">
                  <ul>
                    {applicationItems.map((item, index) => (
                      <ShoppingCartItem
                        key={index}
                        item={item}
                        currency={currentCurrency}
                        onDelete={onRemoveCartItem}
                        onUpdated={updateCart}
                        onPreview={onPreview}
                      />
                    ))}
                  </ul>
                  {photoItems.length > 0 && (
                    <div className="btn-wrap">
                      <button
                        type="button"
                        className="main-btn small outline"
                        onClick={() => router.push(PAGES.photo.index)}>
                        {`Add Another Person's Photo`}
                        <span className="icon-close" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              {(!photoItems.length || !applicationItems.length) && (
                <div className="item-wrap">
                  <div className="btn-wrap">
                    <button
                      type="button"
                      className="main-btn small outline"
                      onClick={() => router.push(PAGES.photo.index)}>
                      {`Add Another Person's Photo`}
                      <span className="icon-close" />
                    </button>
                  </div>
                </div>
              )}
              <div className="item-wrap total-info">
                <div className="order-summary">
                  <h3>{'Order summary'}</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>{'Subtotal'}</td>
                        <td>
                          {t('currency', {
                            value: subTotal,
                            currency: currentCurrency.label,
                          })}
                        </td>
                      </tr>
                      <tr>
                        <td>{'Tax'}</td>
                        <td>
                          {t('currency', {
                            value: 0,
                            currency: currentCurrency.label,
                          })}
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          <b>{'Total'}</b>
                        </td>
                        <td>
                          <b>
                            {t('currency', {
                              value: subTotal,
                              currency: currentCurrency.label,
                            })}
                          </b>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <button className="main-btn big" onClick={onCheckout}>
                    {'Check out'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PreviewPhotoModal
        open={open}
        url={prevUrl}
        closeModal={() => {
          setPrevUrl('')
          setOpen(false)
        }}
      />
    </>
  )
}

export default ShoppingCart
