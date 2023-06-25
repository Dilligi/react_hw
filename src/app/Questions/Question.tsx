'use client'

import QuestionsStyles from './questions.module.css'
import mainStyles from '../../styles/main.module.css'
import Image from 'next/image'
import { useState } from 'react'
import { createPortal } from 'react-dom'

interface Prop {
  title: string
  text: string
}

export default function Question(props: Prop) {
  let [isOn, setIsOn] = useState(false)

  return (
    <div className={QuestionsStyles.question_item}>
        <div className={QuestionsStyles.question_head} onClick={() => setIsOn(!isOn)}>
            <h1 className={QuestionsStyles.question_head_title}>
                {props.title}
            </h1>
            <Image className={`${isOn && QuestionsStyles.question_arrow_active}`}
            src='./img/arrow.svg'
            width={32}
            height={32}
            alt=''
            >
            </Image>
        </div>
        {isOn && (
          <div className={QuestionsStyles.question_body}>
            {props.text}
          </div>
        )}
    </div>
  )
}
