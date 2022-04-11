import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ProductType, useRemoveItemsFromCartMutation } from '@/generated/graphql';
import ShoppingCartItem from '@/components/cart/cartItem';
import { useAuth } from '@/lib/auth';
import { CartItem } from '@/lib/graphql/generated/graphql';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { showError } from '@/lib/utils/toast';
import { CartPageProps } from '@/pages/cart';
import { PAGES } from '../../constants';
import PreviewPhotoModal from '@/components/elements/previewPhotoModal';

const ShoppingCart: React.FC<CartPageProps> = ({ cart: _cart }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const {
    cart,
    updateCart,
    currency: { currency }
  } = useAuth();
  const [removeFromCart] = useRemoveItemsFromCartMutation();
  const [open, setOpen] = useState<boolean>(false);
  const [prevUrl, setPrevUrl] = useState<string>('');

  useEffect(() => {
    updateCart(_cart);
  }, [_cart, updateCart]);

  const onPreview = useCallback((url: string) => {
    setPrevUrl(url);
    setOpen(true);
  }, []);

  const onRemoveCartItem = useCallback(
    async (id: string) => {
      const { data } = await removeFromCart({ variables: { ids: [id] } });
      const __cart = data?.RemoveItemsFromCart.data;
      if (__cart) {
        updateCart(__cart);
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

  const [photoItems, applicationItems] = useMemo(() => {
    const _photoItems: CartItem[] = [];
    const _applicationItems: CartItem[] = [];

    (cart?.items || []).forEach((item) => {
      if (item.product === ProductType.PassportPhoto) {
        _photoItems.push(item);
      }
      if (item.product === ProductType.PassportApplication) {
        _applicationItems.push(item);
      }
    });

    return [_photoItems, _applicationItems];
  }, [cart?.items]);

  return (
    <>
      <div className="cart-page">
        <div className="page-title">
          <div className="container">
            <div className="data-wrap">
              <h1>{t('shoppingCart')}</h1>
            </div>
          </div>
        </div>

        <div className="application-form">
          <div className="container">
            <div className="cart-summary">
              {photoItems.length > 0 && (
                <div className="item-wrap">
                  <ul>
                    {photoItems.map((item, index) => (
                      <ShoppingCartItem
                        index={index}
                        key={index}
                        currency={currency}
                        item={item}
                        onDelete={onRemoveCartItem}
                        onUpdated={updateCart}
                        onPreview={onPreview}
                      />
                    ))}
                  </ul>
                </div>
              )}

              {applicationItems.length > 0 && (
                <div className="item-wrap">
                  <ul>
                    {applicationItems.map((item, index) => (
                      <ShoppingCartItem
                        index={index}
                        key={index}
                        item={item}
                        currency={currency}
                        onDelete={onRemoveCartItem}
                        onUpdated={updateCart}
                        onPreview={onPreview}
                      />
                    ))}
                  </ul>
                  {photoItems.length > 0 && (
                    <div className="btn-wrap">
                      <button
                        type="button"
                        className="main-btn small outline"
                        onClick={() => router.push(PAGES.photo.index)}>
                        {`Add Another Person's Photo`}
                        <span className="icon-close" />
                      </button>
                    </div>
                  )}
                </div>
              )}
              {(!photoItems.length || !applicationItems.length) && (
                <div className="item-wrap">
                  <div className="btn-wrap">
                    <button
                      type="button"
                      className="main-btn small outline"
                      onClick={() => router.push(PAGES.photo.index)}>
                      {`Add Another Person's Photo`}
                      <span className="icon-close" />
                    </button>
                  </div>
                </div>
              )}
              <div className="item-wrap total-info">
                <div className="order-summary">
                  <h3>{'Order summary'}</h3>
                  <table>
                    <tbody>
                      <tr>
                        <td>{'Subtotal'}</td>
                        <td>{t('currency', { value: (subTotal || 0) / 100, currency })}</td>
                      </tr>
                      <tr>
                        <td>{'Tax'}</td>
                        <td>{t('currency', { value: 0, currency })}</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>
                          <b>{'Total'}</b>
                        </td>
                        <td>
                          <b>{t('currency', { value: (subTotal || 0) / 100, currency })}</b>
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
      <PreviewPhotoModal
        open={open}
        url={prevUrl}
        closeModal={() => {
          setPrevUrl('');
          setOpen(false);
        }}
      />
    </>
  );
};

export default ShoppingCart;
