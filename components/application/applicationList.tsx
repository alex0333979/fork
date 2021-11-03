import React, { useCallback, useMemo } from 'react';
import classNames from 'classnames';
import { useAuth } from '@/lib/auth';
import { ProductType, useRemoveItemsFromCartMutation } from '@/generated/graphql';
import { useRouter } from 'next/router';
import { PAGES } from '../../constants';

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
    async (id: string | null) => {
      if (!id) {
        return;
      }

      const { data } = await removeFromCart({ variables: { ids: [id] } });
      const cart = data?.RemoveItemsFromCart.data;
      if (cart) {
        updateCart(cart);
        const items = cart.items ?? [];
        if (items.length > 0) {
          await router.push(`${PAGES.application.index}${items[0].product}/`);
        } else {
          await router.push(PAGES.application.create);
        }
      }
    },
    [removeFromCart, router, updateCart]
  );

  const onCreate = useCallback(async () => {
    openAddForm(false);
    await router.push(PAGES.application.create);
  }, [openAddForm, router]);

  return (
    <div className="application-list">
      <div className="container">
        <div className="data-wrap">
          <ul>
            {cart?.items
              ?.filter((item) => item.product === ProductType.PassportApplication)
              ?.map((item, index) => (
                <li key={index}>
                  <button
                    type="button"
                    className={classNames('main-btn', 'small', {
                      blank: item.productId !== currentId
                    })}
                    onClick={() => router.push(`${PAGES.application.index}${item.productId}`)}>
                    {`Application №${index + 1}`}
                    <span
                      className="icon-remove"
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        await onRemoveCartItem(item.id);
                      }}
                    />
                  </button>
                </li>
              ))}
            {!currentId ? (
              <li>
                <button
                  type="button"
                  className={classNames({
                    'main-btn': true,
                    small: true,
                    blank: currentId !== null
                  })}
                  onClick={() => router.push(PAGES.application.create)}>
                  Application №
                  {(cart?.items?.filter((item) => item.product === ProductType.PassportApplication)
                    .length ?? 0) + 1}
                </button>
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
                    <button className="main-btn small" onClick={onCreate}>
                      {'Add an application'}
                    </button>
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
