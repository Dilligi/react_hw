import Image from 'next/image'
import styles from './header.module.css'

export default function Header() {
  return (
    <header>
        <h1 className={styles.header_title}>
          Билетопоиск
        </h1>
    </header>
  )
}
