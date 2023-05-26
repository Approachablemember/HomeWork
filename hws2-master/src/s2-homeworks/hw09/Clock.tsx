import React, {useState} from 'react'
import SuperButton from '../hw04/common/c2-SuperButton/SuperButton'
import {restoreState} from '../hw06/localStorage/localStorage'
import s from './Clock.module.css'
import internal from "stream";

function Clock() {
    const [timerId, setTimerId] = useState<number | undefined>(undefined)
    // for autotests // не менять // можно подсунуть в локалСторэдж нужную дату, чтоб увидеть как она отображается
    const [date, setDate] = useState<Date>(new Date(restoreState('hw9-date', Date.now())))
    const [show, setShow] = useState<boolean>(false)

    const start = () => {
        // пишут студенты // запустить часы (должно отображаться реальное время, а не +1)
        // сохранить ид таймера (https://learn.javascript.ru/settimeout-setinterval#setinterval)
        setTimerId(1)
        let interval = setInterval(
            () => {
                setDate(new Date())
            }, 1000
        )
        return () => clearInterval(interval)
    }

    const stop = () => {
        // пишут студенты // поставить часы на паузу, обнулить ид таймера (timerId <- undefined)
        //clearInterval(interval)
        setTimerId(undefined)
    }

    const onMouseEnter = () => { // пишут студенты // показать дату если наведена мышка
        setShow(true)
    }
    const onMouseLeave = () => { // пишут студенты // спрятать дату если мышка не наведена
        setShow(false)
    }

    const stringTime = <span>
        {date.getHours() < 10 ? '0' + date.getHours() : date.getHours()}:
        {date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}:
        {date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()}
    </span> || <br/> // часы24:минуты:секунды (01:02:03)/(23:02:03)/(24:00:00)/(00:00:01) // пишут студенты
    const stringDate = <span>
        {date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}.
        {date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1}.
        {date.getFullYear()}
    </span> || <br/> // день.месяц.год (01.02.2022) // пишут студенты, варианты 01.02.0123/01.02.-123/01.02.12345 не рассматриваем

    // день недели на английском, месяц на английском (https://learn.javascript.ru/intl#intl-datetimeformat)
    const stringDay = date.getDay() === 1 ? 'MON'
        : date.getDay() === 2 ? 'TUE'
            : date.getDay() === 3 ? 'WED'
                : date.getDay() === 4 ? 'THU'
                    : date.getDay() === 5 ? 'FRI'
                        : date.getDay() === 6 ? 'SAT'
                            : 'SUN'
                            || <br/> // пишут студенты

    const stringMonth = date.getMonth() === 0 ? 'JAN'
        : date.getMonth() === 1 ? 'FEB' :
            date.getMonth() === 2 ? 'MAR' :
                date.getMonth() === 3 ? 'APR' :
                    date.getMonth() === 4 ? 'MAY' :
                        date.getMonth() === 5 ? 'JUN' :
                            date.getMonth() === 6 ? 'JUL' :
                                date.getMonth() === 7 ? 'AUG' :
                                    date.getMonth() === 8 ? 'SEP' :
                                        date.getMonth() === 9 ? 'OCT' :
                                            date.getMonth() === 10 ? 'NOV' :
                                                'DEC'
                                                || <br/> // пишут студенты

    return (
        <div className={s.clock}>
            <div
                id={'hw9-watch'}
                className={s.watch}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <span id={'hw9-day'}>{stringDay}</span>,{' '}
                <span id={'hw9-time'}>
                    <strong>{stringTime}</strong>
                </span>
            </div>

            <div id={'hw9-more'}>
                <div className={s.more}>
                    {show ? (
                        <>
                            <span id={'hw9-month'}>{stringMonth}</span>,{' '}
                            <span id={'hw9-date'}>{stringDate}</span>
                        </>
                    ) : (
                        <>
                            <br/>
                        </>
                    )}
                </div>
            </div>

            <div className={s.buttonsContainer}>
                <SuperButton
                    id={'hw9-button-start'}
                    disabled={timerId !== undefined} // пишут студенты // задизэйблить если таймер запущен
                    onClick={start}
                >
                    start
                </SuperButton>
                <SuperButton
                    id={'hw9-button-stop'}
                    disabled={timerId === undefined} // пишут студенты // задизэйблить если таймер не запущен
                    onClick={stop}
                >
                    stop
                </SuperButton>
            </div>
        </div>
    )
}

export default Clock
