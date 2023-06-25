import FilmStyles from './film.module.css'
import mainStyles from '../../../styles/main.module.css'
import Image from 'next/image'

function Review() {
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
                    <h2 className={FilmStyles.film_review_item_name}>Роман</h2>
                    <span className={FilmStyles.film_review_item_grade}>Оценка: <b>8</b></span>
                </div>
                <div className={FilmStyles.film_review_item_body}>
                По счастью мне довелось посмотреть фильм раньше, чем прочесть книгу. Это было около четырех лет назад, но тот момент я вспоминаю и по сей день. До него я не был фанатом Джона Толкина, как впрочем, и всего фентези в целом, однако стоило мне посмотреть первые десять минут фильма и оставшиеся пролетели на одном дыхании. Я словно погрузился в необычайный мир, где добро борется со злом, где зеленые рощи перемежаются с поросшими мхом статуями и древними развалинами, в мир, где пробираясь лесною тропой можно встретить остроухих неувядающих эльфов или мерзких орков – кому как повезет...
                </div>
            </div>
        </div>
    )
}

export default function Page({params} : {params : {id: number}}) {

    return (
        <main>
            <div className={mainStyles.container}>
                <section className={FilmStyles.film_main_section}>
                    <div className={FilmStyles.film_main_img}>
                        <Image
                        src=''
                        width={400}
                        height={500}
                        alt=''
                        ></Image>
                    </div>
                    <div className={FilmStyles.film_main_content}>
                        <div className={FilmStyles.film_main_head}>
                            <h1>Властелин колец: Братство кольца</h1>
                            <div className={FilmStyles.film_main_buttons}>
                                <button className={FilmStyles.film_main_button}>-</button>
                                <span className={FilmStyles.film_main_buttons_text}>5</span>
                                <button className={FilmStyles.film_main_button}>+</button>
                            </div>
                        </div>

                        <ul className={FilmStyles.film_main_info}>
                            <li><b>Жанр: </b>Фэнтези</li>
                            <li><b>Год выпуска: </b>2001</li>
                            <li><b>Рейтинг: </b>8</li>
                            <li><b>Режиссер: </b>Питер Джексон</li>
                        </ul>

                        <div className={FilmStyles.film_main_desc}>
                            <h2 className={FilmStyles.film_main_desc_title}>Описание</h2>
                            Сказания о Средиземье — это хроника Великой войны за Кольцо, длившейся не одну тысячу лет. Тот, кто владел Кольцом, получал неограниченную власть, но был обязан служить злу. Тихая деревня, где живут хоббиты. Придя на 111-й день рождения к своему старому другу Бильбо Бэггинсу, волшебник Гэндальф начинает вести разговор о кольце, которое Бильбо нашел много лет назад. Это кольцо принадлежало когда-то темному властителю Средиземья Саурону, и оно дает большую власть своему обладателю. Теперь Саурон хочет вернуть себе власть над Средиземьем. Бильбо отдает Кольцо племяннику Фродо, чтобы тот отнёс его к Роковой Горе и уничтожил.
                        </div>
                        </div>
                </section>

                <section className={FilmStyles.film_reviews}>
                    <Review />
                    <Review />
                    <Review />
                </section>
            </div>
        </main>
    )
}