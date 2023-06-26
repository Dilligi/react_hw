'use client'

import React from 'react'
import BasketStyles from './basket.module.css'
import mainStyles from '../../styles/main.module.css'
import Image from 'next/image'
import { SyntheticEvent, useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'
import {useSelector} from 'react-redux'
import { selectCart, selectTicket } from '../store/featers/cart/selectors'
import { cartSlice } from '../store/featers/cart'
import { store } from '../store/store'
import { TotalTicketsNum } from '../utils/totalTicketsNum'
import TicketButtonsContext from '@/Components/TicketButtonsContext'
import { BasketItem } from '@/app/Basket/BascketItem'
let data = require('../../../public/mock')['movies']

interface Prop {
    title: string,
    posterUrl: string,
    genre: string,
    id: string
}

function BasketModal(props: {closeModal: (e: any) => void, id: string}) {

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
                    <button className={BasketStyles.basket_modal_button_yes} onClick={() => {
                        store.dispatch(cartSlice.actions.remove(props.id))
                    }}>Да</button>
                    <button className={BasketStyles.basket_modal_button_no}>Нет</button>
                </div>
            </div>
        </div>
    )
}

export default function Basket() {
    let [isModalOpen, setIsModalOpen] = useState(false)
    let [modalId, setModalId] = useState('')
    let activeFilms = useSelector((state) => selectCart(state))
    let [bsItems, setBsItems] = useState([]);

    useEffect(() => {
        let activeFilmsIdArr = Object.entries(activeFilms).map((x) => {
            return x[0];
        });

        setBsItems(data.filter((x: Prop) => {
            return activeFilmsIdArr.includes(x.id);
        })
        .map((x: Prop) => {
            return (
                <TicketButtonsContext.Provider key={x.id} value={{id: x.id, openModal: () => setIsModalOpen(true), setModalId}}>
                    <BasketItem
                    src={x.posterUrl}
                    title={x.title}
                    genre={x.genre}
                    />
                </TicketButtonsContext.Provider>
                )
        }));

    }, [activeFilms]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = "hidden"
        }
        else document.body.style.overflow = ""
    }, [isModalOpen])

    function closeModal(e: any) {

        if (BasketStyles.modal === e.target.className || 
            BasketStyles.basket_modal_button_yes === e.target.className ||
            BasketStyles.basket_modal_button_no === e.target.className ||
            BasketStyles.modal_close === e.target.className || BasketStyles.modal_close === e.target.parentElement.className)
        setIsModalOpen(false)
    }

    return (
        <main>
            {isModalOpen && createPortal(<BasketModal closeModal={(e: Event) => closeModal(e)} id={modalId} />, document.body)}

            <div className={mainStyles.container}>
                <div className={BasketStyles.basket_wrapper}>
                    <div className={BasketStyles.basket_items}>
                        {!bsItems.length?
                        (<div className={BasketStyles.emptyTotal}>Извини, дружище, но у тебя ничего нет! </div> )
                        : bsItems
                        }
                    </div>
                    <div className={BasketStyles.basket_total}>
                        <span>
                            Итого билетов:
                        </span>
                        <span className={BasketStyles.basket_total_num}>
                            {TotalTicketsNum()}
                        </span>
                    </div>
                </div>
            </div>
        </main>
    )
}
