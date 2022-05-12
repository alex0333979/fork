import React, { useCallback, useState } from 'react'
import { useRouter, NextRouter } from 'next/router'

import {
  CartItemInput,
  ProductType,
  useAddItemsToCartMutation,
} from '@/generated/graphql'
import { showSuccess } from '@/lib/utils/toast'
import { useAuth } from '@/lib/auth'

import { PAGES } from '@/constants/index'
import { ProcessPhotoProps } from '@/pages/photo/process-photo'
import RetakeButton from './components/retakeButton'
import SaveModal from './components/saveModal'
import VerifyPhoto from './_verifyPhoto'
import { ProcessingStatus } from './types'

const ProcessPhoto: React.FC<ProcessPhotoProps> = ({
  entry,
  type,
  document,
}) => {
  const router = useRouter()
  const { updateCart } = useAuth()
  const [addToCart] = useAddItemsToCartMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)

  const onAddToCartItem = useCallback(
    async (cartItem: CartItemInput) => {
      setLoading(true)
      const { data } = await addToCart({
        variables: {
          cartItems: [cartItem],
        },
      })
      setLoading(false)
      const cart = data?.AddItemsToCart.data
      if (cart) {
        updateCart(cart)
        showSuccess('This entry is added to cart.')
        if (document.id === 495 || document.id === 489) {
          // only for US passport and UK passport
          setOpen(true)
          // await router.push(PAGES.upSell);
          // await router.push(PAGES.cart);
        } else {
          await router.push(PAGES.cart)
        }
      }
    },
    [addToCart, document.id, router, updateCart],
  )

  const onCheckout = useCallback(
    async (imageLink: string) => {
      await onAddToCartItem({
        name: `${document.country} - ${document.type}`,
        description: `${document.type} Photos`,
        product: ProductType.PassportPhoto,
        productId: entry.id,
        imageUrl: imageLink,
      })
    },
    [document, entry.id, onAddToCartItem],
  )

  const onChangePhoto = useCallback(() => {
    router.push(
      `${PAGES.photo.takePhoto}?entryId=${entry.id}&type=${type}&documentId=${document.id}`,
    )
  }, [document.id, entry.id, router, type])

  const goApplication = useCallback(async () => {
    setOpen(false)
    await router.push(PAGES.application.create)
  }, [router])

  const goCart = useCallback(async () => {
    setOpen(false)
    await router.push(PAGES.cart)
  }, [router])

  return (
    <>
      <VerifyPhoto
        showStep
        entry={entry}
        type={type}
        document={document}
        onCheckout={onCheckout}
        onChangePhoto={onChangePhoto}
        renderTitle={(s: ProcessingStatus) => {
          if (
            s === ProcessingStatus.loading ||
            s === ProcessingStatus.notStarted
          ) {
            return 'Processing...'
          }
          if (s === ProcessingStatus.failed) {
            return (
              <>
                <span className="failed">{'Not approved'}</span>
                {' - See Requirements Below and Retake Photo'}
              </>
            )
          }

          return (
            <>
              <span className="success">{'Success'}</span>
              {' - Proceed To Checkout'}
            </>
          )
        }}
        renderRetakeButton={(
          status: ProcessingStatus,
          router: NextRouter,
          onOpenInfo: (v: boolean) => void,
          imageLink: string,
        ) => (
          <RetakeButton
            loading={loading}
            status={status}
            onRetake={() =>
              router.push(
                `${PAGES.photo.takePhoto}?entryId=${entry.id}&documentId=${document.id}`,
              )
            }
            onNext={() => onCheckout(imageLink)}
            onOpenInfo={onOpenInfo}
          />
        )}
      />
      <SaveModal
        open={open}
        onGoApplication={goApplication}
        onGoCart={goCart}
      />
    </>
  )
}
export default ProcessPhoto
