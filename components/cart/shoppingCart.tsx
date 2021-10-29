import React, { useCallback, useEffect, useMemo } from 'react';
import { ProductType, useRemoveItemsFromCartMutation } from '@/generated/graphql';
import ShoppingCartItem from '@/components/cart/cartItem';
import { useAuth } from '@/lib/auth';
import { useRouter } from 'next/router';
import { showError } from '@/lib/utils/toast';
import { CartPageProps } from '@/pages/cart';
import { PAGES } from '../../constants';

const ShoppingCart: React.FC<CartPageProps> = ({ cart: pCart }) => {
  const router = useRouter();
  const { cart, updateCart } = useAuth();
  const [removeFromCart] = useRemoveItemsFromCartMutation();

  useEffect(() => updateCart(pCart), [pCart]);

  const onRemoveCartItem = useCallback(
    async (id: string) => {
      const { data } = await removeFromCart({ variables: { ids: [id] } });
      const cart = data?.RemoveItemsFromCart.data;
      if (cart) {
        updateCart(cart);
      }
    },
    [removeFromCart, updateCart]
  );

  const subTotal = useMemo(
    () => cart?.items?.filter((i) => i.isComplete).reduce((a, { price }) => a + price, 0),
    [cart]
  );

  const onCheckout = useCallback(async () => {
    if (cart?.items?.filter((i) => i.isComplete)?.length ?? 0 > 0) {
      await router.push(PAGES.checkout.index);
    } else {
      showError(`You don't have any completed entries in your cart yet.`);
    }
  }, [cart?.items, router]);

  return (
    <div className="cart-page">
      <div className="page-title">
        <div className="container">
          <div className="data-wrap">
            <h1>{'Shopping cart'}</h1>
            <div className="btn-wrap">
              <button
                type="button"
                className="main-btn small outline"
                onClick={() => router.push(PAGES.application.create)}>
                {'Add passport application'}
                <span className="icon-close" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="application-form">
        <div className="container">
          <div className="cart-summary">
            <div className="item-wrap">
              <ul>
                {cart?.items
                  ?.filter((item) => item.product === ProductType.PassportApplication)
                  ?.map((item, index) => (
                    <ShoppingCartItem key={index} item={item} onDelete={onRemoveCartItem} />
                  ))}
              </ul>
            </div>
            <div className="item-wrap">
              <ul>
                {cart?.items
                  ?.filter((item) => item.product === ProductType.PassportPhoto)
                  ?.map((item, index) => (
                    <ShoppingCartItem key={index} item={item} onDelete={onRemoveCartItem} />
                  ))}
              </ul>
            </div>
            <div className="item-wrap total-info">
              <div className="order-summary">
                <h3>{'Order summary'}</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>{'Subtotal'}</td>
                      <td>{`$${(subTotal ?? 0) / 100}`}</td>
                    </tr>
                    <tr>
                      <td>{'Tax'}</td>
                      <td>{`$0.00`}</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>
                        <b>{'Total'}</b>
                      </td>
                      <td>
                        <b>{`$${(subTotal ?? 0) / 100}`}</b>
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
  );
};

export default ShoppingCart;
