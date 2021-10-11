import React, { useState } from 'react';
import Link from 'next/link';
import classNames from 'classnames';

export interface NavItemProps {
  title: string;
  link?: string;
  items: {
    title: string;
    link: string;
  }[];
}

const NavItem: React.FC<NavItemProps> = ({ title, link = '', items }) => {
  const [open, setOpen] = useState<boolean>(false);
  if (items.length > 0) {
    return (
      <li className="with-drop" onClick={() => setOpen(!open)}>
        <a>
          <span>{title}</span>
        </a>
        <div className={classNames({ 'drop-item': true, open })}>
          <ul>
            {items.map((item, index) => (
              <li key={index}>
                <Link href={item.link}>
                  <a>{item.title}</a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </li>
    );
  }
  return (
    <li>
      <Link href={link}>
        <a>
          <span>{title}</span>
        </a>
      </Link>
    </li>
  );
};

export default NavItem;
