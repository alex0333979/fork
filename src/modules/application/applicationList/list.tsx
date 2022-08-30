import React, { useCallback, useMemo } from 'react'
import classNames from 'classnames'
import { useRouter } from 'next/router'

import { ProductCategory, useRemoveItemsFromCartMutation } from '@/apollo'
import { useAuth } from '@/hooks'
import { PAGES } from '@/constants'

import { ListProps } from './types'

const List: React.FC<ListProps> = ({ currentId }) => {
  const router = useRouter()
  const { cart, updateMe } = useAuth()
  const [removeFromCart] = useRemoveItemsFromCartMutation()

  const applications = useMemo(
    () =>
      cart?.items?.filter(
        (item) => item.productCategory === ProductCategory.Application,
      ) || [],
    [cart?.items],
  )

  const onRemoveCartItem = useCallback(
    async (id: string | null) => {
      if (!id) return

      const { data } = await removeFromCart({ variables: { ids: [id] } })
      const cart = data?.RemoveItemsFromCart.data
      if (cart) {
        updateMe({ cart })
        const items = cart.items ?? []
        if (items.length > 0) {
          await router.push(
            `${PAGES.application.index}${items[0].productCategory}/`,
          )
        } else {
          await router.push(PAGES.application.create)
        }
      }
    },
    [removeFromCart, router, updateMe],
  )

  return (
    <>
      {applications.map((item, index) => (
        <li key={index}>
          <button
            type="button"
            className={classNames('main-btn', 'small', {
              blank: item.productId !== currentId,
            })}
            onClick={() =>
              router.push(`${PAGES.application.index}${item.productId}`)
            }>
            {`Application №${index + 1}`}
            <span
              className="icon-remove"
              onClick={async (e) => {
                e.preventDefault()
                e.stopPropagation()
                await onRemoveCartItem(item.id)
              }}
            />
          </button>
        </li>
      ))}
      {!currentId && (
        <li>
          <button
            type="button"
            className={classNames({
              'main-btn': true,
              small: true,
              blank: currentId !== null,
            })}
            onClick={() => router.push(PAGES.application.create)}>
            Application №{applications.length + 1}
          </button>
        </li>
      )}
    </>
  )
}

export default List
