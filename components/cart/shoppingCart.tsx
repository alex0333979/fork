import React, { useCallback, useMemo } from 'react';
import { CartPageProps } from '@/pages/cart';
import Link from 'next/link';
import { ProductType } from '@/generated/graphql';
import ShoppingCartItem from '@/components/cart/cartItem';

const ShoppingCart: React.FC<CartPageProps> = ({ cart }) => {
  const deleteCartItem = useCallback((id: string) => {
    console.log('=======', id);
  }, []);

  const subTotal = useMemo(() => cart.items?.reduce((a, { price }) => a + price, 0), [cart.items]);

  return (
    <div className="cart-page">
      <div className="page-title">
        <div className="container">
          <div className="data-wrap">
            <h1>{'Shopping cart'}</h1>
            <div className="btn-wrap">
              <Link href={'/application/create'}>
                <a className="main-btn small outline">
                  {'Add passport application'}
                  <span className="icon-close" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="application-form">
        <div className="container">
          <div className="cart-summary">
            <div className="item-wrap">
              <ul>
                {cart.items?.map((item, index) =>
                  item.product === ProductType.PassportApplication ? (
                    <ShoppingCartItem key={index} item={item} onDelete={deleteCartItem} />
                  ) : (
                    <></>
                  )
                )}
              </ul>
            </div>
            <div className="item-wrap">
              <ul>
                {cart.items?.map((item, index) =>
                  item.product === ProductType.PassportPhoto ? (
                    <ShoppingCartItem key={index} item={item} onDelete={deleteCartItem} />
                  ) : (
                    <></>
                  )
                )}
              </ul>
            </div>
            <div className="item-wrap total-info">
              <div className="order-summary">
                <h3>{'Order summary'}</h3>
                <table>
                  <tbody>
                    <tr>
                      <td>{'Subtotal'}</td>
                      <td>{`$${subTotal}`}</td>
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
                        <b>{`$${cart.totalPrice / 100}`}</b>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <Link href={'/checkout/billing'}>
                  <a className="main-btn big">{'Check out'}</a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
