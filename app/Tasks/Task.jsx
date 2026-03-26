"use client"

import styles from '../styles/tasks.module.scss'
import { FaCalendar } from 'react-icons/fa'

export default function Task ({ tasks, inputSearchTask, selectPriority, selectDeadLine }) {
    if (inputSearchTask !== '') {
        return (
            <>
                {tasks.filter(copia => copia.title.toLowerCase().includes(inputSearchTask.toLowerCase())).map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox"></input>
                        </div>
                        <div className={styles.information_tasks}>
                            <div className={styles.header_tasks}>
                                <p style={{backgroundColor: `${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>{task.priority ? task.priority : 'Low'}</p>
                                <h2>{task.title}</h2>
                            </div>
                            <div className={styles.description_tasks}>
                                <p>{task.description}</p>
                            </div>
                            <div className={styles.date_tasks}>
                                <p><FaCalendar style={{display: 'inline'}}/> {task.deadline}</p>
                            </div>
                        </div>
                        <div className={styles.three_dots_tasks}>
                            <p>...</p>
                        </div>
                    </div>
                ))}
            </>
        )
    } else if (selectPriority !== 'all') {
        switch (selectPriority) {
            case 'high':
                return (
                    <>
                        {tasks.filter((copia => copia.priority === 'high')).map((task) => (
                            <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                                <div className={styles.tasks_checkbox}>
                                    <input type="checkbox"></input>
                                </div>
                                <div className={styles.information_tasks}>
                                    <div className={styles.header_tasks}>
                                        <p style={{backgroundColor: `${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>{task.priority ? task.priority : 'Low'}</p>
                                        <h2>{task.title}</h2>
                                    </div>
                                    <div className={styles.description_tasks}>
                                        <p>{task.description}</p>
                                    </div>
                                    <div className={styles.date_tasks}>
                                        <p><FaCalendar style={{display: 'inline'}}/> {task.deadline}</p>
                                    </div>
                                </div>
                                <div className={styles.three_dots_tasks}>
                                    <p>...</p>
                                </div>
                            </div>
                        ))}
                    </>
                )
            case 'medium':
                    return (
                        <>
                            {tasks.filter((copia => copia.priority === 'medium')).map((task) => (
                                <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                                    <div className={styles.tasks_checkbox}>
                                        <input type="checkbox"></input>
                                    </div>
                                    <div className={styles.information_tasks}>
                                        <div className={styles.header_tasks}>
                                            <p style={{backgroundColor: `${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>{task.priority ? task.priority : 'Low'}</p>
                                            <h2>{task.title}</h2>
                                        </div>
                                        <div className={styles.description_tasks}>
                                            <p>{task.description}</p>
                                        </div>
                                        <div className={styles.date_tasks}>
                                            <p><FaCalendar style={{display: 'inline'}}/> {task.deadline}</p>
                                        </div>
                                    </div>
                                    <div className={styles.three_dots_tasks}>
                                        <p>...</p>
                                    </div>
                                </div>
                            ))}
                        </>
                    )
            case 'low':
            default:
                return (
                    <>
                        {tasks.filter((copia => copia.priority === 'low')).map((task) => (
                            <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                                <div className={styles.tasks_checkbox}>
                                    <input type="checkbox"></input>
                                </div>
                                <div className={styles.information_tasks}>
                                    <div className={styles.header_tasks}>
                                        <p style={{backgroundColor: `${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>{task.priority ? task.priority : 'Low'}</p>
                                        <h2>{task.title}</h2>
                                    </div>
                                    <div className={styles.description_tasks}>
                                        <p>{task.description}</p>
                                    </div>
                                    <div className={styles.date_tasks}>
                                        <p><FaCalendar style={{display: 'inline'}}/> {task.deadline}</p>
                                    </div>
                                </div>
                                <div className={styles.three_dots_tasks}>
                                    <p>...</p>
                                </div>
                            </div>
                        ))}
                    </>
                )
        }
            
    } else if (selectDeadLine === 'asc') {
        return (
            <>
                {[...tasks].sort((primero, segundo) => new Date(primero.deadline) - new Date(segundo.deadline)).map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox"></input>
                        </div>
                        <div className={styles.information_tasks}>
                            <div className={styles.header_tasks}>
                                <p style={{backgroundColor: `${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>{task.priority ? task.priority : 'Low'}</p>
                                <h2>{task.title}</h2>
                            </div>
                            <div className={styles.description_tasks}>
                                <p>{task.description}</p>
                            </div>
                            <div className={styles.date_tasks}>
                                <p><FaCalendar style={{display: 'inline'}}/> {task.deadline}</p>
                            </div>
                        </div>
                        <div className={styles.three_dots_tasks}>
                            <p>...</p>
                        </div>
                    </div>
                ))}
            </>
        )
    } else if (selectDeadLine === 'desc') {
        return (
            <>
                {[...tasks].sort((primero, segundo) => new Date(segundo.deadline) - new Date(primero.deadline)).map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox"></input>
                        </div>
                        <div className={styles.information_tasks}>
                            <div className={styles.header_tasks}>
                                <p style={{backgroundColor: `${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>{task.priority ? task.priority : 'Low'}</p>
                                <h2>{task.title}</h2>
                            </div>
                            <div className={styles.description_tasks}>
                                <p>{task.description}</p>
                            </div>
                            <div className={styles.date_tasks}>
                                <p><FaCalendar style={{display: 'inline'}}/> {task.deadline}</p>
                            </div>
                        </div>
                        <div className={styles.three_dots_tasks}>
                            <p>...</p>
                        </div>
                    </div>
                ))}
            </>
        )
    } else {
        return (
            <>
                {tasks.map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox"></input>
                        </div>
                        <div className={styles.information_tasks}>
                            <div className={styles.header_tasks}>
                                <p style={{backgroundColor: `${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>{task.priority ? task.priority : 'Low'}</p>
                                <h2>{task.title}</h2>
                            </div>
                            <div className={styles.description_tasks}>
                                <p>{task.description}</p>
                            </div>
                            <div className={styles.date_tasks}>
                                <p><FaCalendar style={{display: 'inline'}}/> {task.deadline}</p>
                            </div>
                        </div>
                        <div className={styles.three_dots_tasks}>
                            <p>...</p>
                        </div>
                    </div>
                ))}
            </>
        )
    }
}