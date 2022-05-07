import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Cart,
  CartItem,
  ProductType,
  useUpdateCartItemPriceMutation,
} from '@/generated/graphql'
import { PAGES, PHOTO_PRICES } from '../../constants'
import { useRouter } from 'next/router'
import { showError, showSuccess } from '@/lib/utils/toast'

interface CartItemProps {
  index: number
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
  index,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const [updateCartItemPrice] = useUpdateCartItemPriceMutation()

  const onChangeOption = useCallback(
    async (price: number) => {
      const { data } = await updateCartItemPrice({
        variables: { item: { price, itemId: item.id } },
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
                  value: item.isComplete ? item.price / 100 : 0,
                  currency,
                })}
              </span>
            )}
          </p>
        </div>
        {item.product === ProductType.PassportPhoto && (
          <div className="form-fields">
            {PHOTO_PRICES.map((option, i) => (
              <label key={`${index}-${i}`} className="full-size">
                <span className="field radio with-price">
                  <span className="name">{option.text}</span>
                  <span className="price">
                    {t('currency', { value: option.price / 100, currency })}
                  </span>
                  <input
                    type="radio"
                    name={`price-${index}`}
                    checked={item.price === option.price}
                    onChange={() => onChangeOption(option.price)}
                  />
                  <span className="wrap">
                    <span className="bullet" />
                    <span className="border" />
                  </span>
                </span>
              </label>
            ))}
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
