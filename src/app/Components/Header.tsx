import Image from 'next/image'
import mainStyles from '../styles/main.module.css'
import HeaderStyles from '../styles/header.module.css'

export default function Header() {
  return (
    <header className={HeaderStyles.header}>
        <div className={mainStyles.container}>
          <h1 className={HeaderStyles.header_title}>
            Билетопоиск
          </h1>
          <div>

          </div>
        </div>
    </header>
  )
}
