'use client'

import Image from 'next/image'
import HomeStyles from './home.module.css'
import mainStyles from '../styles/main.module.css'
import Link from 'next/link'
import { KeyboardEvent, KeyboardEventHandler, ReactComponentElement, ReactElement, createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { JsxElement } from 'typescript'
import {useSelector} from 'react-redux'
import { selectTicket } from './store/featers/cart/selectors'
import { store } from './store/store'
import { cartSlice } from './store/featers/cart'
import { TicketButtons } from '@/Components/TicketButtons'
import { useGetMoviesQuery } from './services/movieApi'

interface Prop {
  id: string,
  posterUrl: string,
  genre: string,
  title: string
}

function FilmItem(props: Prop) {
  let ticketNum = useSelector((state) => selectTicket(state, props.id))

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
          <TicketButtons modalIsNeeded={false} id={props.id} />
      </div>
  )
}

function FilterList({children, chooseTitle} : {children: ReactElement[], chooseTitle: string}) {
  let [isOpen, setIsOpen] = useState(false)
  let [inputValue, setInputValue] = useState('');
  let left = useRef(0), top = useRef(0), width = useRef(0);

  function openList(e: React.ChangeEvent<HTMLInputElement>) {
    setIsOpen(true)
    left.current = e.target.getBoundingClientRect().x;
    top.current = e.target.getBoundingClientRect().bottom;
    width.current = e.target.getBoundingClientRect().width;
  }

  return (
    <>
      <input type="text" name="title" placeholder={chooseTitle} onKeyUp={(e: any) => setInputValue(e.target.value)} onFocus={(e) => openList(e)} onBlur={() => setIsOpen(false)}/>
      <Image className={`${HomeStyles.home_filter_input_arrow} ${isOpen? HomeStyles.home_filter_input_arrow_active : ''}`}
      src='./img/arrow-square-down.svg'
      width={20}
      height={20}
      alt=''
      ></Image>
      {isOpen && createPortal((
        <ul className={HomeStyles.filter_list} style={{top: top.current, left: left.current, width: width.current}}>
          {children.filter((child) => child.props.title.includes(inputValue))}
        </ul>
      ), document.body)}
    </>
  )
}

FilterList.Item = function Item({title} : {title: string}) {
  return (
    <li className={HomeStyles.filter_list_item}>{title}</li>
  )
}


export default function Home() {
  let [inputTitle, setInputTitle] = useState('')
  let [inputCinema, setInputCinema] = useState('')
  let [filmItems, setFilmItems] = useState([])
  let [cinemaItems, setCinemaItems] = useState([])
  let movies = useGetMoviesQuery('');
  let moviesData = movies.currentData ? movies.currentData : [];

  useEffect(() => {
    if (!moviesData.length) return;

    setFilmItems(
      moviesData
      .filter((x: Prop) => {
          return x.title.toLowerCase().includes(inputTitle.toLowerCase())
      })
      .map((x: Prop) => {

      return (
          <FilmItem 
          key={x.id}
          id={x.id}
          posterUrl={x.posterUrl}
          title={x.title}
          genre={x.genre}
          />
      )
  }))

  }, [moviesData, inputTitle])

  return (
    <main>
      <div className={mainStyles.container} style={{justifyContent: 'center'}}>
        <div className={HomeStyles.home_filter}>
          <div className={HomeStyles.home_filter_container}>
            <h3>Фильтр поиска</h3>
            <div className={HomeStyles.home_filter_input_container}>
              Название
              <input type="text" name="title" placeholder='Введите название' onKeyUp={(e: any) => setInputTitle(e.target.value)}/>
            </div>
            <div className={HomeStyles.home_filter_input_container}>
              Жанр
              <FilterList chooseTitle='Выберите жанр'>
                <FilterList.Item title='Item' />
                <FilterList.Item title='Item' />
                <FilterList.Item title='Item' />
              </FilterList>
            </div>
            <div className={HomeStyles.home_filter_input_container}>
              Кинотеатр
              <FilterList chooseTitle='Выберите кинотеатр'>
                <FilterList.Item title='Item1' />
                <FilterList.Item title='Item2' />
                <FilterList.Item title='Item23' />
              </FilterList>
            </div>
          </div>
        </div>
        <div className={HomeStyles.home_films_items}>
          {!movies.isLoading? filmItems : (
            <div className='loading-image'>
              <Image
              src='/img/loading-fast.gif'
              width={250}
              height={250}
              alt=''
              ></Image>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
