'use client'

import BasketStyles from './basket.module.css'
import mainStyles from '../../styles/main.module.css'
import Image from 'next/image'
import { SyntheticEvent, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
let data = require('../../../public/mock')['movies']

interface ItemProp {
    src: string,
    genre: string,
    title: string
    openModal: () => void
}

function BasketItem(props: ItemProp) {
    return (
        <div className={BasketStyles.basket_item}>
            <div className={BasketStyles.basket_item_info}>
                <div className={BasketStyles.basket_item_info_img}>
                    <Image
                    src={props.src}
                    width={100}
                    height={120}
                    alt=''
                    >
                    </Image>
                </div>
                <div className={BasketStyles.basket_item_info_title}>
                    <h2>{props.title}</h2>
                    <span className={BasketStyles.basket_item_info_subtitle}>{props.genre}</span>
                </div>
            </div>
            <div className={BasketStyles.basket_item_buttons}>
                <button className={BasketStyles.basket_item_button}>-</button>
                <span className={BasketStyles.basket_item_buttons_text}>5</span>
                <button className={BasketStyles.basket_item_button}>+</button>
                <button className={BasketStyles.basket_item_close} onClick={props.openModal}>
                    <Image
                    src='../img/close.svg'
                    width={20}
                    height={20}
                    alt=''
                    >
                    </Image>
                </button>
            </div>
        </div>
    )
}

interface Prop {
    title: string,
    posterUrl: string,
    genre: string,
    id: number
}

function BasketModal(props) {

    return (
        <div className={BasketStyles.modal} onClick={props.closeModal}>
            <div className={BasketStyles.modal_container}>
                <div className={BasketStyles.modal_head}>
                    <h2>Удаление билета</h2>
                    <button className={BasketStyles.modal_close}>
                        <Image
                        src='../img/close.svg'
                        width={16}
                        height={16}
                        alt=''
                        >
                        </Image>
                    </button>
                </div>
                Вы уверены, что хотите удалить билет?

                <div className={BasketStyles.basket_modal_buttons}>
                    <button className={BasketStyles.basket_modal_button_yes}>Да</button>
                    <button className={BasketStyles.basket_modal_button_no}>Нет</button>
                </div>
            </div>
        </div>
    )
}

export default function Basket() {
    let [isModalOpen, setIsModalOpen] = useState(false)

    let bsItems = data.map((x: Prop) => {
        return (
            <BasketItem 
            key={x.id}
            src={x.posterUrl}
            title={x.title}
            genre={x.genre}
            openModal={() => setIsModalOpen(true)}
            />
        )
    })

    function closeModal(e) {

        if (BasketStyles.modal === e.target.className || 
            BasketStyles.basket_modal_button_no === e.target.className ||
            BasketStyles.modal_close === e.target.className || BasketStyles.modal_close === e.target.parentElement.className)
        setIsModalOpen(false)
    }

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden"
        }
        else document.body.style.overflow = ""
    }, [isModalOpen])

    return (
        <main>
            {isModalOpen && createPortal(<BasketModal closeModal={(e: Event) => closeModal(e)} />, document.body)}

            <div className={mainStyles.container}>
                <div className={BasketStyles.basket_wrapper}>
                    <div className={BasketStyles.basket_items}>
                        {bsItems}
                    </div>
                    <div className={BasketStyles.basket_total}>
                        <span>
                            Итого билетов:
                        </span>
                        <span className={BasketStyles.basket_total_num}>
                            7
                        </span>
                    </div>
                </div>
            </div>
        </main>
    )
}
