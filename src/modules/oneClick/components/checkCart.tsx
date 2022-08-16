import React, { useCallback, useMemo, useState } from 'react'

import {
  CartItem,
  ProductCategory,
  useRemoveItemsFromCartMutation,
} from '@/apollo'
import PreviewPhotoModal from '@/components/elements/previewPhotoModal'
import { showError } from '@/utils'
import { useCurrency, useAuth } from '@/hooks'

import PhotoItems from '@/modules/cart/photoItems'
import ApplicationItems from '@/modules/cart/applicationItems'
import AddAnotherButton from '@/modules/cart/addAnotherButton'
import Summary from '@/modules/cart/summary'

interface Props {
  onCheckout: () => void
  onAddAnother: () => void
}

const CheckCart: React.FC<Props> = ({ onCheckout, onAddAnother }) => {
  const { cart, updateMe } = useAuth()
  const { currentCurrency } = useCurrency()
  const [removeFromCart] = useRemoveItemsFromCartMutation()
  const [open, setOpen] = useState<boolean>(false)
  const [prevUrl, setPrevUrl] = useState<string>('')

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

  const _onCheckout = useCallback(async () => {
    if (cart?.items?.filter((i) => i.isComplete)?.length ?? 0 > 0) {
      onCheckout()
    } else {
      showError(`You don't have any completed entries in your cart yet.`)
    }
  }, [cart?.items, onCheckout])

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
                onAddAnother={onAddAnother}
              />

              {(!photoItems.length || !applicationItems.length) && (
                <div className="item-wrap">
                  <AddAnotherButton onAddAnother={onAddAnother} />
                </div>
              )}
              <Summary
                cart={cart}
                currency={currentCurrency}
                onCheckout={_onCheckout}
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

export default CheckCart
