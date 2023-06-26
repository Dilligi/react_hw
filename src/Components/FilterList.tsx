import Image from "next/image";
import { ChangeEvent, LegacyRef, MutableRefObject, ReactElement, createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import HomeStyles from '../app/home.module.css'


let FilterListContext = createContext<any>({});

export function FilterList({children, chooseTitle, setCurItem=null, itemType=null, setTypeFilter=null} : 
    {children: ReactElement[], chooseTitle: string, setCurItem?: any, itemType?: any, setTypeFilter?: any}) {
  let [isOpen, setIsOpen] = useState(false)
  let [inputValue, setInputValue] = useState('');
  let left = useRef(0), top = useRef(0), width = useRef(0);
  let rootRef = useRef<HTMLDivElement>(null)

  function clickItem(curId: string, curVal: string) {
    setInputValue(curVal)
    if(setCurItem) setCurItem(curVal)


    if (setTypeFilter) {
        let typeFilter = itemType.filter((x) => x.id === curId)
        setTypeFilter(typeFilter.length? typeFilter.map((x) => x.movieIds)[0] : [])
    }
  }

  function openList(e: React.ChangeEvent<HTMLInputElement>) {
    setIsOpen(true)
    left.current = e.target.getBoundingClientRect().x;
    top.current = e.target.getBoundingClientRect().bottom;
    width.current = e.target.getBoundingClientRect().width;
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
        const {target} = event;
        if (target instanceof Node && !rootRef.current?.contains(target)) {
            setIsOpen(false)
        }
    }

    window.addEventListener('click', handleClick)

    return () => {
        window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div ref={rootRef}>
      <input type="text" name="title" placeholder={chooseTitle} value={inputValue}
      onChange={(e: ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)} 
      onFocus={(e) => openList(e)} />
      <Image className={`${HomeStyles.home_filter_input_arrow} ${isOpen? HomeStyles.home_filter_input_arrow_active : ''}`}
      src='./img/arrow-square-down.svg'
      width={20}
      height={20}
      alt=''
      ></Image>
      {isOpen && createPortal((
        <ul className={HomeStyles.filter_list} style={{top: top.current, left: left.current, width: width.current}}>
          <FilterListContext.Provider value={clickItem}>
            {children.filter((child) => child? child.props.title.includes(inputValue) : null)}
          </FilterListContext.Provider>
        </ul>
      ), document.body)}
    </div>
  )
}

FilterList.Item = function Item({title, id} : {title: string, id?: string}) {
  let clickEventContext = useContext(FilterListContext)
  

  return (
    <li className={HomeStyles.filter_list_item} onClick={() => clickEventContext(id, title)}>{title}</li>
  )
}