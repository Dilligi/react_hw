import Image from 'next/image'
import mainStyles from '../styles/main.module.css'
import FooterStyles from '../styles/footer.module.css'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className={FooterStyles.footer}>
        <div className={mainStyles.container}>
            <Link href='/Questions' className={FooterStyles.footer_link}>
                Вопросы-ответы
            </Link>
            <Link href='/About' className={FooterStyles.footer_link}>
                О нас
            </Link>
        </div>
    </footer>
  )
}
