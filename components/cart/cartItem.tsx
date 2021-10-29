import React from 'react';
import { CartItem, ProductType } from '@/generated/graphql';
import { PAGES } from '../../constants';
import { useRouter } from 'next/router';

interface CartItemProps {
  item: CartItem;
  onDelete: (id: string) => void;
}

const ShoppingCartItem: React.FC<CartItemProps> = ({ item, onDelete }) => {
  const router = useRouter();

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
          <p>
            {item.product === ProductType.PassportPhoto ? 'Passport photo' : 'Passport application'}
          </p>
        </div>
        <button onClick={() => onDelete(item.id)} className="icon-delete" />
      </div>
      <div className="more">
        <div className="price">
          <p>
            {'Price: '}
            <span>{item.isComplete ? `$${item.price / 100}` : '$0'}</span>
          </p>
        </div>
        <div className="btn-wrap">
          <button
            type="button"
            className="main-btn small outline"
            onClick={() =>
              router.push(
                item.product === ProductType.PassportApplication
                  ? `${PAGES.application.index}${item.productId}`
                  : `${PAGES.photo.processPhoto}?entryId=${item.productId}`
              )
            }>
            {'Review'}
          </button>
        </div>
      </div>
    </li>
  );
};

export default ShoppingCartItem;
