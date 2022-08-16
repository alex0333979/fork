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
interface IUseProcessPhoto {
  document: PDocument
  entry: Entry
  onItemAddedToCart: () => void
}

export const useProcessPhoto = ({
  document,
  entry,
  onItemAddedToCart,
}: IUseProcessPhoto) => {
  const { updateMe } = useAuth()
  const [addToCart] = useAddItemsToCartMutation()
  const [loading, setLoading] = useState<boolean>(false)

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
        onItemAddedToCart()
      }
    },
    [addToCart, onItemAddedToCart, updateMe],
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
    onCheckout,
  }
}
