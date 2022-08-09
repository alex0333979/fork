import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'

import {
  CartItem,
  ProductCategory,
  useRemoveItemsFromCartMutation,
} from '@/apollo'
import PreviewPhotoModal from '@/components/elements/previewPhotoModal'
import { showError } from '@/utils'
import { useCurrency, useAuth } from '@/hooks'
import { CartPageProps } from '@/pages/cart'
import { PAGES } from '@/constants'

import PhotoItems from './photoItems'
import ApplicationItems from './applicationItems'
import AddAnotherButton from './addAnotherButton'
import Summary from './summary'

const ShoppingCart: React.FC<CartPageProps> = ({ cart: _cart }) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { cart, updateMe } = useAuth()
  const { currentCurrency } = useCurrency()
  const [removeFromCart] = useRemoveItemsFromCartMutation()
  const [open, setOpen] = useState<boolean>(false)
  const [prevUrl, setPrevUrl] = useState<string>('')

  useEffect(() => {
    updateMe({ cart: _cart })
  }, [_cart, updateMe])

  const onPreview = useCallback((url: string) => {
    setPrevUrl(url)
    setOpen(true)
  }, [])

  const onRemoveCartItem = useCallback(
    async (id: string) => {
      const { data } = await removeFromCart({ variables: { ids: [id] } })
      const __cart = data?.RemoveItemsFromCart.data
      if (__cart) {
        updateMe({ cart: __cart })
      }
    },
    [removeFromCart, updateMe],
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
              <h1>Shopping cart</h1>
            </div>
          </div>
        </div>

        <div className="application-form">
          <div className="container">
            <div className="cart-summary">
              <PhotoItems
                items={photoItems}
                currency={currentCurrency}
                onRemoveItem={onRemoveCartItem}
                onUpdated={updateMe}
                onPreview={onPreview}
              />

              <ApplicationItems
                items={applicationItems}
                photoItems={photoItems}
                currency={currentCurrency}
                onRemoveItem={onRemoveCartItem}
                onUpdated={updateMe}
                onPreview={onPreview}
                onAddAnother={() => router.push(PAGES.photo.index)}
              />

              {(!photoItems.length || !applicationItems.length) && (
                <div className="item-wrap">
                  <AddAnotherButton
                    onAddAnother={() => router.push(PAGES.photo.index)}
                  />
                </div>
              )}
              <Summary
                cart={cart}
                currency={currentCurrency}
                onCheckout={onCheckout}
              />
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
