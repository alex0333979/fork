import React, { useCallback, useMemo } from 'react';
import Link from 'next/link';
import classNames from 'classnames';
import { useAuth } from '@/lib/auth';
import { ProductType, useRemoveItemsFromCartMutation } from '@/generated/graphql';
import { useRouter } from 'next/router';

interface ApplicationListProps {
  isOpenAddFrom: boolean;
  currentId: string | null;
  openAddForm: (status: boolean) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({
  currentId,
  isOpenAddFrom,
  openAddForm
}) => {
  const router = useRouter();
  const { cart, updateCart } = useAuth();
  const [removeFromCart] = useRemoveItemsFromCartMutation();

  const subTotal = useMemo(() => cart?.items?.reduce((a, { price }) => a + price, 0), [cart]);

  const onRemoveCartItem = useCallback(
    (id: string | null) => {
      if (!id) {
        return;
      }

      removeFromCart({ variables: { ids: [id] } }).then(({ data }) => {
        const cart = data?.RemoveItemsFromCart.data;
        if (cart) {
          updateCart(cart);
          const items = cart.items ?? [];
          if (items.length > 0) {
            router.push(`/application/${items[0].product}/`).then();
          } else {
            router.push(`/application/create/`).then();
          }
        }
      });
    },
    [removeFromCart, router, updateCart]
  );

  return (
    <div className="application-list">
      <div className="container">
        <div className="data-wrap">
          <ul>
            {cart?.items
              ?.filter((item) => item.product === ProductType.PassportApplication)
              ?.map((item, index) => (
                <li key={index}>
                  <Link href={`/application/${item.productId}`}>
                    <a
                      className={classNames('main-btn', 'small', {
                        blank: item.productId !== currentId
                      })}>
                      {`Application №${index + 1}`}
                      <span
                        className="icon-remove"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          onRemoveCartItem(item.id);
                        }}
                      />
                    </a>
                  </Link>
                </li>
              ))}
            {!currentId ? (
              <li>
                <Link href={'/application/create'}>
                  <a
                    className={classNames({
                      'main-btn': true,
                      small: true,
                      blank: currentId !== null
                    })}>
                    Application №{(cart?.items?.length ?? 0) + 1}
                  </a>
                </Link>
              </li>
            ) : (
              <></>
            )}

            <li className={classNames({ 'add-application': true, active: isOpenAddFrom })}>
              <button type="button" className="add-btn" onClick={() => openAddForm(!isOpenAddFrom)}>
                <span className="icon-close" />
                {'Add\n application'}
              </button>

              <div className="add-form">
                <div className="bg-wrap">
                  <button type="button" className="icon-close" onClick={() => openAddForm(false)} />
                  <div className="top-info">
                    <h4>{'Add Another Application?'}</h4>
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <td>{'Your new package price:'}</td>
                        <td>{`$${(subTotal ?? 0) / 100}`}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>{`Total: ${cart?.items?.length ?? 0}`}</td>
                        <td>
                          <span>{`$${(subTotal ?? 0) / 100}`}</span>
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                  <div className="btn-wrap">
                    <Link href={'/application/create'}>
                      <a className="main-btn small">{'Add an application'}</a>
                    </Link>
                    <button
                      type="button"
                      className="main-btn small blank cancel"
                      onClick={() => openAddForm(false)}>
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ApplicationList;
