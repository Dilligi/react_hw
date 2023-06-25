import Image from 'next/image'
import mainStyles from '../styles/main.module.css'
import HeaderStyles from '../styles/header.module.css'
import Link from 'next/link'

export default function Header() {
  return (
    <header className={HeaderStyles.header}>
        <div className={mainStyles.container}>
          <Link href="/">
            <h1 className={HeaderStyles.header_title}>
              Билетопоиск
            </h1>
          </Link>
          <Link className={HeaderStyles.header_img} href="/Basket">
            <Image 
            src='../img/basket.svg'
            width={32}
            height={32}
            alt=''
            ></Image>
          </Link>
        </div>
    </header>
  )
}
