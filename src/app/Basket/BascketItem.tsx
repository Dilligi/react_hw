import Image from "next/image"
import BasketStyles from './basket.module.css'
import { TicketButtons } from "../../Components/TicketButtons"
import { useEffect } from "react"

interface ItemProp {
    src: string,
    genre: string,
    title: string,
}

export const BasketItem = (props: ItemProp) => {

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
            <TicketButtons modalIsNeeded={true} id='' />
        </div>
    )
}