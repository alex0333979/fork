import React, { useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import Image from 'next/image'

import {
  User,
  CartItem,
  Currency,
  Product,
  ProductCategory,
  useUpdateCartItemPriceMutation,
} from '@/apollo'
import { showError, showSuccess } from '@/utils'
import { useProducts } from '@/hooks'
import LoadingSpinner from '@/components/loadingSpinner'
import { PAGES } from '@/constants'

import PriceItem from './priceItem'

interface CartItemProps {
  item: CartItem
  currency?: Currency
  onDelete: (id: string) => void
  onUpdated: (d: Partial<User>) => void
  onPreview: (url: string) => void
  previewButton?: string
}

const ShoppingCartItem: React.FC<CartItemProps> = ({
  item,
  currency,
  onDelete,
  onUpdated,
  onPreview,
  previewButton,
}) => {
  const { t } = useTranslation()
  const router = useRouter()
  const { products, getProduct } = useProducts()
  const [updateCartItemPrice] = useUpdateCartItemPriceMutation()

  const product: Product | undefined = useMemo(
    () => getProduct(item.productSku),
    [getProduct, item.productSku],
  )

  const onChangeOption = useCallback(
    async (product: Product) => {
      const { data } = await updateCartItemPrice({
        variables: {
          item: { productSku: product.sku, itemId: item.id },
        },
      })
      const cart = data?.UpdateCartItemPrice.data
      if (cart) {
        showSuccess('CartItem is updated.')
        onUpdated({ cart })
      } else {
        showError('CartItem update failed.')
      }
    },
    [item.id, onUpdated, updateCartItemPrice],
  )

  const onClickItem = useCallback(
    (item: CartItem) => {
      if (item.productCategory === ProductCategory.Application) {
        router.push(`${PAGES.application.index}${item.productId}`)
      } else {
        onPreview(item.imageUrl ?? '')
      }
    },
    [onPreview, router],
  )

  return (
    <li>
      <div className="name">
        {item.productCategory === ProductCategory.Photo && (
          <div className="img">
            <LoadingSpinner size={12} variant="oval" />
            <Image
              src={item.imageUrl ?? ''}
              width="100%"
              height="100%"
              alt=""
              layout="fill"
            />
          </div>
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
            {item.productCategory === ProductCategory.Application && (
              <span>
                {t('currency', {
                  value: item.isComplete ? product?.price : 0,
                  currency: currency?.label,
                })}
              </span>
            )}
          </p>
        </div>
        {item.productCategory === ProductCategory.Photo && (
          <div className="form-fields">
            {products.map(
              (product) =>
                product.category === ProductCategory.Photo && (
                  <PriceItem
                    key={product.sku}
                    product={product}
                    selected={item.productSku}
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
            {item.productCategory === ProductCategory.Application
              ? 'Review'
              : previewButton}
          </button>
        </div>
      </div>
    </li>
  )
}

export default ShoppingCartItem
