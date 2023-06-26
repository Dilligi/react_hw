import { selectTicket } from '@/app/store/featers/cart/selectors';
import ButtonStyles from '../styles/buttons.module.css'
import {useSelector} from 'react-redux'
import { store } from '@/app/store/store';
import { cartSlice } from '@/app/store/featers/cart';
import Image from 'next/image';
import { useContext } from 'react';
import TicketButtonsContext from './TicketButtonsContext';

export function TicketButtons(props: {id: string, modalIsNeeded: boolean}) {
    let TBContext: {id: string, openModal: () => void, setModalId: any} = useContext(TicketButtonsContext);
    let ticketNum = useSelector((state) => selectTicket(state, props.id? props.id : TBContext.id));

    return (
        <div className={ButtonStyles.basket_item_buttons}>
        <button className={`${ButtonStyles.basket_item_button} ${!ticketNum? ButtonStyles.btn_disabled : ''}`} onClick={() => {
            if (props.modalIsNeeded) {
                if (ticketNum > 1) {
                    store.dispatch(cartSlice.actions.decrement(props.id? props.id : TBContext.id))
                }
                else  {
                    TBContext.openModal();
                    TBContext.setModalId(TBContext.id);
                }
            } else {
                store.dispatch(cartSlice.actions.decrement(props.id? props.id : TBContext.id))
            }
        }}>-</button>
        <span className={ButtonStyles.basket_item_buttons_text}>{ticketNum}</span>
        <button className={`${ButtonStyles.basket_item_button} ${ticketNum >= 30? ButtonStyles.btn_disabled : ''}`} onClick={() => store.dispatch(cartSlice.actions.increment(props.id? props.id : TBContext.id))}>+</button>
        {props.modalIsNeeded && (<button className={ButtonStyles.basket_item_close} onClick={() => {
                TBContext.openModal();
                TBContext.setModalId(TBContext.id);
            }}>
                <Image
                src='../img/close.svg'
                width={20}
                height={20}
                alt=''
                >
                </Image>
            </button>)}
    </div>
    )
}