import styles from './Header.module.css';

/**
 * A header component for all pages.
 */
export default function Header() {
  return (
    <div className={styles.Header}>
      <span>Serebrum</span>
    </div>
  )
}