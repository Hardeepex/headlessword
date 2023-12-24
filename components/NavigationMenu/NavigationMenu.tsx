import classNames from 'classnames/bind';
import { gql } from '@apollo/client';
import Link from 'next/link';
import styles from './NavigationMenu.module.scss';
import stylesFromWP from './NavigationMenuClassesFromWP.module.scss';
import { flatListToHierarchical } from '@faustwp/core';

let cx = classNames.bind(styles);
let cxFromWp = classNames.bind(stylesFromWP);

type MenuItem = {
  id: string;
  path: string | null;
  label: string | null;
  children: MenuItem[];
  cssClasses: string[];
  menu?: {
    node: {
      name: string;
    };
  };
};

export default function NavigationMenu({ menuItems, className }: { menuItems: MenuItem[]; className: string }) {
  if (!menuItems) {
    return null;
  }

  const hierarchicalMenuItems = flatListToHierarchical(menuItems);

  function renderMenu(items: MenuItem[]) {
    return (
      <ul className={cx('menu')}>
        {items.map((item) => {
          const { id, path, label, children, cssClasses } = item;

          if (!item.hasOwnProperty('__typename')) {
            return null;
          }

          return (
            <li key={id} className={cxFromWp(cssClasses)}>
              <Link href={path ?? ''}>{label ?? ''}</Link>
              {children.length ? renderMenu(children) : null}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <nav
      className={cx(['component', className])}
      role="navigation"
      aria-label={`${menuItems[0]?.menu?.node?.name} menu`}>
      {renderMenu(hierarchicalMenuItems)}
    </nav>
  );
}

NavigationMenu.fragments = {
  entry: gql`
    fragment NavigationMenuItemFragment on MenuItem {
      id
      path
      label
      parentId
      cssClasses
      menu {
        node {
          name
        }
      }
    }
  `,
};
