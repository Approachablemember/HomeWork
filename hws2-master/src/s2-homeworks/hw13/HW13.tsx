import React, {useState} from 'react'
import s2 from '../../s1-main/App.module.css'
import s from './HW13.module.css'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import axios from 'axios'
import success200 from './images/200.svg'
import error400 from './images/400.svg'
import error500 from './images/500.svg'
import errorUnknown from './images/error.svg'

/*
* 1 - дописать функцию send
* 2 - дизэйблить кнопки пока идёт запрос /
* 3 - сделать стили в соответствии с дизайном
* */

const HW13 = () => {
    const [code, setCode] = useState('')
    const [text, setText] = useState('')
    const [info, setInfo] = useState('')
    const [image, setImage] = useState('')

    const send = (x?: boolean | null) => () => {
        const url =
            x === null
                ? 'https://xxxxxx.ccc' // имитация запроса на не корректный адрес
                : 'https://demo.treblle.com/api/v1/articles'

        setCode('')
        setImage('')
        setText('')
        setInfo('...loading')

        const payloadTrue = {
            title: "Hi there",
            content: "Hi there again",
            image: "https://via.placeholder.com/800x600.png/003322?text=qui",
            user: "ccdd2142-05a5-3a13-ab31-3c72aa79cbe9"
        }

        const payloadFalse = {
            user: "ccdd2142-05a5-3a13-ab31-3c72aa79cbe9"
        }

        const payloadUndefined = {}

        let payloadToSend;

        if(x === true){
            payloadToSend = payloadTrue
        }else if(x === false){
            payloadToSend = payloadFalse
        }else {
            payloadToSend = payloadUndefined
        }

        axios
            .post(url, payloadToSend)
            .then((res) => {
                setCode('Code 200!')
                setImage(success200)
                // дописать
                setInfo('')
                setText('Code 200, everything is fine. You Are Great')

            })
            .catch((e) => {
                // дописать
                if(e.response?.status >= 400 && e.response?.status < 500){
                    setCode('Code 400!')
                    setImage(error400)
                    setInfo('')
                    setText('Seems like you just sent something wrong so you have got error 400 - 499')
                }else if (e.response?.status >= 500 && e.response?.status < 600){
                    setCode('Code 500!')
                    setImage(error500)
                    setInfo('')
                    setText('Oops, something happened with the server and you have got error 500 - 599')
                }else{
                    setCode('ERR_NAME_NOT_RESOLVED')
                    setImage(errorUnknown)
                    setInfo('')
                    setText(' Network error')

                }
            })
    }

    return (
        <div id={'hw13'}>
            <div className={s2.hwTitle}>Homework #13</div>

            <div className={s2.hw}>
                <div className={s.buttonsContainer}>
                    <SuperButton
                        id={'hw13-send-true'}
                        onClick={send(true)}
                        xType={'primary'}
                        // дописать
                        disabled={info === '...loading'}

                    >
                        Send true
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-false'}
                        onClick={send(false)}
                        xType={'primary'}
                        // дописать
                        disabled={info === '...loading'}

                    >
                        Send false
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-undefined'}
                        onClick={send(undefined)}
                        xType={'primary'}
                        // дописать
                        disabled={info === '...loading'}

                    >
                        Send undefined
                    </SuperButton>
                    <SuperButton
                        id={'hw13-send-null'}
                        onClick={send(null)} // имитация запроса на не корректный адрес
                        xType={'primary'}
                        // дописать
                        disabled={info === '...loading'}

                    >
                        Send null
                    </SuperButton>
                </div>

                <div className={s.responseContainer}>
                    <div className={s.imageContainer}>
                        {image && <img src={image} className={s.image} alt="status"/>}
                    </div>

                    <div className={s.textContainer}>
                        <div id={'hw13-code'} className={s.code}>
                            {code}
                        </div>
                        <div id={'hw13-text'} className={s.text}>
                            {text}
                        </div>
                        <div id={'hw13-info'} className={s.info}>
                            {info}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HW13
