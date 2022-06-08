import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { omit } from 'lodash'

import {
  Cart,
  CartItem,
  CartPrice,
  ProductType,
  useUpdateCartItemPriceMutation,
} from '@/generated/graphql'
import { showError, showSuccess } from '@/lib/utils/toast'
import { usePrices } from '@/hooks/index'
import { PAGES } from '../../constants'

import PriceItem from './priceItem'

interface CartItemProps {
  item: CartItem
  currency?: string
  onDelete: (id: string) => void
  onUpdated: (cart: Cart) => void
  onPreview: (url: string) => void
}

const ShoppingCartItem: React.FC<CartItemProps> = ({
  item,
  currency,
  onDelete,
  onUpdated,
  onPreview,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { prices } = usePrices()
  const [updateCartItemPrice] = useUpdateCartItemPriceMutation()

  const onChangeOption = useCallback(
    async (price: CartPrice) => {
      const { data } = await updateCartItemPrice({
        variables: {
          item: { ...omit(price, ['description']), itemId: item.id },
        },
      })
      const cart = data?.UpdateCartItemPrice.data
      if (cart) {
        showSuccess('CartItem is updated.')
        onUpdated(cart)
      } else {
        showError('CartItem update failed.')
      }
    },
    [item.id, onUpdated, updateCartItemPrice],
  )

  const onClickItem = useCallback(
    async (item: CartItem) => {
      if (item.product === ProductType.PassportApplication) {
        await router.push(`${PAGES.application.index}${item.productId}`)
      } else {
        onPreview(item.imageUrl ?? '')
      }
    },
    [onPreview, router],
  )

  return (
    <li>
      <div className="name">
        {item.product === ProductType.PassportPhoto ? (
          <div className="img">
            <img src={item.imageUrl ?? ''} alt="" />
          </div>
        ) : (
          <></>
        )}
        <div className="text">
          <h4>{item.name}</h4>
          <p>{item.description}</p>
        </div>
        <button onClick={() => onDelete(item.id)} className="icon-delete" />
      </div>
      <div className="more">
        <div className="price">
          <p>
            {'Price: '}
            {item.product === ProductType.PassportApplication && (
              <span>
                {t('currency', {
                  value: item.isComplete ? item.price : 0,
                  currency,
                })}
              </span>
            )}
          </p>
        </div>
        {item.product === ProductType.PassportPhoto && (
          <div className="form-fields">
            {prices.map(
              (price) =>
                price.priceId.toLowerCase().includes('photos') && (
                  <PriceItem
                    price={price}
                    selected={item.price}
                    onSelect={onChangeOption}
                  />
                ),
            )}
          </div>
        )}

        <div className="btn-wrap">
          <button
            type="button"
            className="main-btn small outline"
            onClick={() => onClickItem(item)}>
            {item.product === ProductType.PassportApplication
              ? 'Review'
              : 'Preview'}
          </button>
        </div>
      </div>
    </li>
  )
}

export default ShoppingCartItem
