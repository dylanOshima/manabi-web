import classNames from 'classnames';
import * as React from 'react';
import { useCallback, useState } from 'react';
import styles from './Nav.module.css';

type Props = {};

/*
 * Description of function
 * @param props 
 */
export default function Nav(props: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const onClick = useCallback(
    () => setIsExpanded(!isExpanded), [isExpanded]
  );

  return <>
    {isExpanded && (
      <div className={styles.wrapperOpening}>
        <ul>
          <li className={styles.item}>Item 1</li>
          <li className={styles.item}>Item 2</li>
          <li className={styles.item}>Item 3</li>
        </ul>
      </div>
    )}
    <button onClick={onClick} className={classNames([
      isExpanded ? styles.drawerButtonOpen : styles.drawerButtonClosed,
      styles.wrapperClosing
    ])
    }>
      {isExpanded ? "<" : ">"}
    </button>
  </>
};