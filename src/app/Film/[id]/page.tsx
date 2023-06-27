'use client'

import FilmStyles from './film.module.css'
import mainStyles from '../../../styles/main.module.css'
import Image from 'next/image'
import { useGetMovieQuery } from '@/app/services/movieApi';
import { TicketButtons } from '@/Components/TicketButtons';
import { useGetReviewsOnFilmQuery } from '@/app/services/reviewsApi';

function Review(props: any) {
    return (
        <div className={FilmStyles.film_review_item}>
            <div className={FilmStyles.film_review_item_img}>
                <Image
                src='../../img/photo.svg'
                width={32}
                height={32}
                alt=''
                ></Image>
            </div>
            <div className={FilmStyles.film_review_item_content}>
                <div className={FilmStyles.film_review_item_head}>
                    <h2 className={FilmStyles.film_review_item_name}>{props.name}</h2>
                    <span className={FilmStyles.film_review_item_grade}>Оценка: <b>{props.rating}</b></span>
                </div>
                <div className={FilmStyles.film_review_item_body}>
                    {props.text}
                </div>
            </div>
        </div>
    )
}

export default function Page({params} : {params : {id: string}}) {
    let movie = useGetMovieQuery(params.id);
    let reviews = useGetReviewsOnFilmQuery(params.id)

    if (movie.isLoading || reviews.isLoading) {
        return (
            <main>
                <div className={mainStyles.container} style={{justifyContent: 'center'}}>
                    <div className='loading-image'>
                    <Image
                    src='/img/loading-fast.gif'
                    width={250}
                    height={250}
                    alt=''
                    ></Image>
                    </div>
                </div>
            </main>
        )
    }

    let movieData = movie.currentData
    let reviewsData = reviews.currentData

    let reviewsComponents = reviewsData.map((x: any) => {
        return <Review 
                key={x.id}
                {...x}
                />
    })

    return (
        <main>
            <div className={mainStyles.container}>
                <section className={FilmStyles.film_main_section}>
                    <div className={FilmStyles.film_main_img}>
                        <Image
                        src={movieData.posterUrl}
                        width={400}
                        height={500}
                        alt=''
                        ></Image>
                    </div>
                    <div className={FilmStyles.film_main_content}>
                        <div className={FilmStyles.film_main_head}>
                            <h1>{movieData.title}</h1>
                            <TicketButtons id={params.id} modalIsNeeded={false}></TicketButtons>
                        </div>

                        <ul className={FilmStyles.film_main_info}>
                            <li><b>Жанр: </b>{movieData.genre}</li>
                            <li><b>Год выпуска: </b>{movieData.releaseYear}</li>
                            <li><b>Рейтинг: </b>{movieData.rating}</li>
                            <li><b>Режиссер: </b>{movieData.director}</li>
                        </ul>

                        <div className={FilmStyles.film_main_desc}>
                            <h2 className={FilmStyles.film_main_desc_title}>Описание</h2>
                            {movieData.description}
                        </div>
                        </div>
                </section>

                <section className={FilmStyles.film_reviews}>
                    {reviewsComponents}
                </section>
            </div>
        </main>
    )
}