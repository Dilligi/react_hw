'use client'

import Image from 'next/image'
import HomeStyles from './home.module.css'
import mainStyles from '../styles/main.module.css'
import Link from 'next/link'
import { useState } from 'react'
let data = require('../../public/mock')['movies']

interface Prop {
  id: number,
  posterUrl: string,
  genre: string,
  title: string
}

function FilmItem(props: Prop) {
  return (
      <div className={HomeStyles.home_films_item}>
          <div className={HomeStyles.home_films_item_info}>
              <div className={HomeStyles.home_films_item_info_img}>
                  <Image
                  src={props.posterUrl}
                  width={100}
                  height={120}
                  alt=''
                  >
                  </Image>
              </div>
              <div className={HomeStyles.home_films_item_info_title}>
                  <Link href={`Film/${props.id}`}><h2>{props.title}</h2></Link>
                  <span className={HomeStyles.home_films_item_info_subtitle}>{props.genre}</span>
              </div>
          </div>
          <div className={HomeStyles.home_films_item_buttons}>
              <button className={HomeStyles.home_films_item_button}>-</button>
              <span className={HomeStyles.home_films_item_buttons_text}>5</span>
              <button className={HomeStyles.home_films_item_button}>+</button>
          </div>
      </div>
  )
}

function FilterCompound({ children, initialValue } : {children: any, initialValue: boolean}) {
  let [isOn, setIsOn] = useState(initialValue)
  return <div>{children}</div>
}

export default function Home() {
  let filmItems = data.map((x: Prop) => {
    return (
        <FilmItem 
        key={x.id}
        id={x.id}
        posterUrl={x.posterUrl}
        title={x.title}
        genre={x.genre}
        />
    )
})

  return (
    <main>
      <div className={mainStyles.container}>
        <div className={HomeStyles.home_filter}>
          <div className={HomeStyles.home_filter_container}>
            <h3>Фильтр поиска</h3>
            <div className={HomeStyles.home_filter_input_container}>
              Название
              <input type="text" name="title" placeholder='Введите название' />
            </div>
            <div className={HomeStyles.home_filter_input_container}>
              Жанр
              <input type="text" name="title" placeholder='Выберите жанр' />
              <FilterCompound initialValue={false}>
                <h1>hi</h1>
              </FilterCompound>
            </div>
            <div className={HomeStyles.home_filter_input_container}>
              Кинотеатр
              <input type="text" name="title" placeholder='Выберите кинотеатр' />
            </div>
          </div>
        </div>
        <div className={HomeStyles.home_films_items}>
          {filmItems}
        </div>
      </div>
    </main>
  )
}
