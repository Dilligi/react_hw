'use client'

import Image from 'next/image'
import HomeStyles from './home.module.css'
import mainStyles from '../styles/main.module.css'
import Link from 'next/link'
import { ChangeEvent, KeyboardEvent, KeyboardEventHandler, ReactComponentElement, ReactElement, createContext, useContext, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { JsxElement } from 'typescript'
import {useSelector} from 'react-redux'
import { selectTicket } from './store/featers/cart/selectors'
import { store } from './store/store'
import { cartSlice } from './store/featers/cart'
import { TicketButtons } from '@/Components/TicketButtons'
import { useGetMoviesQuery } from './services/movieApi'
import { useGetCinemaQuery, useGetCinemasQuery } from './services/cinemasApi'
import { FilterList } from '@/Components/FilterList'

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


export default function Home() {
  let [inputTitle, setInputTitle] = useState('')
  let [inputCinema, setInputCinema] = useState('')
  let [filmItems, setFilmItems] = useState([])
  let [genreItems, setGenreItems] = useState([<></>])
  let [cinemaItems, setCinemaItems] = useState([])
  let [curCinema, setCurCinema] = useState('')
  let [curGenre, setCurGenre] = useState('')
  let [cinemaFilter, setCinemaFilter] = useState([])
  let movies = useGetMoviesQuery('');
  let cinemas = useGetCinemasQuery('');
  let moviesData = movies.currentData ? movies.currentData : [];

  useEffect(() => {
    if (!cinemas.isLoading && !cinemas.error) {
      setCinemaItems(
        cinemas.currentData.map((x: {id: string, name: string}) => {
          return (
            <FilterList.Item key={x.id} title={x.name} id={x.id} />
          )
        })
      );
    }
  }, [cinemas])

  useEffect(() => {
    if (!moviesData.length) return;

    setGenreItems(() => {
      let genres: Set<string> = new Set()

      moviesData
      .map((x: {genre: string}) => {
        genres.add(x.genre)
      })

      let genresArr = Array.from(genres);

      let genreComponents = genresArr.map((x, i) => {
        return (
          <FilterList.Item key={i} title={x} />
        )
      })

      return genreComponents;
    });

    setFilmItems(
      moviesData
      .filter((x: Prop) => {

          return x.title.toLowerCase().includes(inputTitle.toLowerCase()) &&
                 (!cinemaFilter.length || cinemaFilter.includes(x.id)) &&
                 (!curGenre || x.genre.toLowerCase() === curGenre.toLowerCase())
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

  }, [moviesData, inputTitle, cinemaFilter, curGenre])

  return (
    <main>
      <div className={mainStyles.container} style={{justifyContent: 'center'}}>
        <div className={HomeStyles.home_filter}>
          <div className={HomeStyles.home_filter_container}>
            <h3>Фильтр поиска</h3>
            <div className={HomeStyles.home_filter_input_container}>
              Название
              <input type="text" name="title" placeholder='Введите название' onChange={(e: ChangeEvent<HTMLInputElement>) => setInputTitle(e.target.value)}/>
            </div>
            <div className={HomeStyles.home_filter_input_container}>
              Жанр
              <FilterList chooseTitle='Выберите жанр' setCurItem={setCurGenre}>
                {genreItems? genreItems : [<></>]}
              </FilterList>
            </div>
            <div className={HomeStyles.home_filter_input_container}>
              Кинотеатр
              <FilterList chooseTitle='Выберите кинотеатр' setCurItem={setCurCinema} itemType={cinemas.currentData} setTypeFilter={setCinemaFilter}>
                {cinemaItems? cinemaItems : [<></>]}
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
