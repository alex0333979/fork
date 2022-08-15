import { useCallback, useState } from 'react'

import {
  CartItemInput,
  ProductSku,
  ProductCategory,
  useAddItemsToCartMutation,
  PDocument,
  Entry,
} from '@/apollo'

import { useAuth } from '@/hooks'
import { showSuccess } from '@/utils'

interface IUseProcessPhoto {
  document: PDocument
  entry: Entry
  onGoCart: () => void
  onGoToApplication: () => void
}

export const useProcessPhoto = ({
  document,
  entry,
  onGoCart,
  onGoToApplication,
}: IUseProcessPhoto) => {
  const { updateMe } = useAuth()
  const [addToCart] = useAddItemsToCartMutation()
  const [loading, setLoading] = useState<boolean>(false)
  const [openApplication, setOpenApplication] = useState<boolean>(false)

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
        updateMe({ cart })
        showSuccess('This entry is added to cart.')
        if (document.id === 495) {
          // document.id === 489
          // only for US passport and UK passport
          setOpenApplication(true)
          // await router.push(PAGES.upSell);
          // await router.push(PAGES.cart);
        } else {
          onGoCart()
        }
      }
    },
    [addToCart, document.id, onGoCart, updateMe],
  )

  const onCheckout = useCallback(
    async (imageLink: string) => {
      await onAddToCartItem({
        name: `${document.country} - ${document.type}`,
        description: `${document.type} Photos`,
        imageUrl: imageLink,
        productSku: ProductSku.FourPhotos,
        productCategory: ProductCategory.Photo,
        productId: entry.id,
      })
    },
    [document.country, document.type, entry.id, onAddToCartItem],
  )

  return {
    loading,
    openApplication,
    onCheckout,
    onGoToCart: () => {
      setOpenApplication(false)
      onGoCart()
    },
    onGoToApplication: () => {
      setOpenApplication(false)
      onGoToApplication()
    },
  }
}
