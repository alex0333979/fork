import React from 'react';
import Link from 'next/link';
import { CartItem, ProductType } from '@/generated/graphql';

interface CartItemProps {
  item: CartItem;
  onDelete: (id: string) => void;
}

const ShoppingCartItem: React.FC<CartItemProps> = ({ item, onDelete }) => (
  <li>
    <div className="name">
      {item.product === ProductType.PassportPhoto ? <div className="img" /> : <></>}
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
          <span>{`$${item.price / 100}`}</span>
        </p>
      </div>
      <div className="btn-wrap">
        <Link
          href={
            item.product === ProductType.PassportApplication
              ? `/application/${item.productId}`
              : `/`
          }>
          <a className="main-btn small outline">{'Review'}</a>
        </Link>
      </div>
    </div>
  </li>
);

export default ShoppingCartItem;
