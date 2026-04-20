"use client"

import styles from '../styles/task_searcher_and_filter.module.scss'
import { FaCalendar, FaPlus } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

function OpenThreeDots ({ id, onDeleteTask }) {
    const [optionDelete, setOptionDelete] = useState(false);
    const router = useRouter()

    const deleteTaskDataBase = async (e) => {
        await fetch(`https://${process.env.NEXT_PUBLIC_RUTE_BACKEND}/api/notes`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: id
            })
        })
    }

    return (
        <div className={styles.three_dots_tasks} style={{backgroundColor: optionDelete ? 'rgb(232, 230, 230)' : ''}}>
            <h2 onClick={(e) => {
                e.stopPropagation()
                setOptionDelete(!optionDelete)
            }}>...</h2>
            {optionDelete ?  <h6 onClick={async (e) => {
                setOptionDelete(!optionDelete)
                e.stopPropagation()
                await deleteTaskDataBase()
                onDeleteTask(id)
                // router.refresh()
                //location.reload()
            }}>Delete</h6> : null}
        </div>
    )
}

export default function Task ({ tasks, inputSearchTask, selectPriority, selectDeadLine, onSelectTask, onDeleteTask }) {

    function Warning() {
        const [showWarning, setShowWarning] = useState(false);

        useEffect(() => {
            const token = localStorage.getItem('token');
                    if (!token) setShowWarning(true);
                }, []);

            if (!showWarning) return null;

            return (
                <div className={styles.warning_login}>
                    <p>Log in for save your tasks!</p>
                </div>    
            ) 
    }

    if (tasks.length === 0) {
        return (
            <>
                <div className={styles.empty_tasks}>
                    <FaPlus style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}/><h1> Create a task!</h1>
                </div>
                <Warning />
            </>
        )
    }

    if (inputSearchTask !== '' && selectPriority === 'all' && selectDeadLine === 'asc') {
        return (
            <>
                {tasks.filter(copia => copia.title.toLowerCase().includes(inputSearchTask.toLowerCase())).sort((primero, segundo) => new Date(primero.deadline) - new Date(segundo.deadline)).map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                                <p><FaCalendar style={{display: 'inline'}}/> {task.deadline ? task.deadline.split('T')[0] : ''}</p>
                            </div>
                        </div>
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        )
    } else if (inputSearchTask === '' && selectPriority === 'all' && selectDeadLine === 'asc') {
        return (
            <>  
                {tasks.sort((primero, segundo) => new Date(primero.deadline) - new Date(segundo.deadline)).map((task) => (
                    <div key={task.id} onClick={() => onSelectTask(task)} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        ) 
    } else if (inputSearchTask === '' && selectPriority === 'all' && selectDeadLine === 'desc') {
        return (
            <>
                {tasks.sort((primero, segundo) => new Date(segundo.deadline) - new Date(primero.deadline)).map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        )
    } else if (inputSearchTask !== '' && selectPriority === 'high' && selectDeadLine === 'asc') {
        return (
            <>
                {tasks.filter(copia => copia.title.toLowerCase().includes(inputSearchTask.toLowerCase())).sort((primero, segundo) => new Date(primero.deadline) - new Date(segundo.deadline)).filter(copia => copia.priority === 'high').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        ) 
    } else if (inputSearchTask !== '' && selectPriority === 'high' && selectDeadLine === 'desc') {
        return (
            <>
                {tasks.filter(copia => copia.title.toLowerCase().includes(inputSearchTask.toLowerCase())).sort((primero, segundo) => new Date(segundo.deadline) - new Date(primero.deadline)).filter(copia => copia.priority === 'high').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        )
    } else if (inputSearchTask !== '' && selectPriority === 'medium' && selectDeadLine === 'asc') {
        return (
            <>
                {tasks.filter(copia => copia.title.toLowerCase().includes(inputSearchTask.toLowerCase())).sort((primero, segundo) => new Date(primero.deadline) - new Date(segundo.deadline)).filter(copia => copia.priority === 'medium').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        ) 
    } else if (inputSearchTask !== '' && selectPriority === 'medium' && selectDeadLine === 'desc') {
        return (
            <>
                {tasks.filter(copia => copia.title.toLowerCase().includes(inputSearchTask.toLowerCase())).sort((primero, segundo) => new Date(segundo.deadline) - new Date(primero.deadline)).filter(copia => copia.priority === 'medium').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        )
    } else if (inputSearchTask !== '' && selectPriority === 'low' && selectDeadLine === 'asc') {
        return (
            <>
                {tasks.filter(copia => copia.title.toLowerCase().includes(inputSearchTask.toLowerCase())).sort((primero, segundo) => new Date(primero.deadline) - new Date(segundo.deadline)).filter(copia => copia.priority === 'low').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        ) 
    } else if (inputSearchTask !== '' && selectPriority === 'low' && selectDeadLine === 'desc') {
        return (
            <>
                {tasks.filter(copia => copia.title.toLowerCase().includes(inputSearchTask.toLowerCase())).sort((primero, segundo) => new Date(segundo.deadline) - new Date(primero.deadline)).filter(copia => copia.priority === 'low').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        )
    } else if (inputSearchTask === '' && selectPriority === 'high' && selectDeadLine === 'asc') {
        return (
            <>
                {tasks.sort((primero, segundo) => new Date(primero.deadline) - new Date(segundo.deadline)).filter(copia => copia.priority === 'high').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        ) 
    } else if (inputSearchTask === '' && selectPriority === 'high' && selectDeadLine === 'desc') {
        return (
            <>
                {tasks.sort((primero, segundo) => new Date(segundo.deadline) - new Date(primero.deadline)).filter(copia => copia.priority === 'high').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        )
    } else if (inputSearchTask === '' && selectPriority === 'medium' && selectDeadLine === 'asc') {
        return (
            <>
                {tasks.sort((primero, segundo) => new Date(primero.deadline) - new Date(segundo.deadline)).filter(copia => copia.priority === 'medium').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        ) 
    } else if (inputSearchTask === '' && selectPriority === 'medium' && selectDeadLine === 'desc') {
        return (
            <>
                {tasks.sort((primero, segundo) => new Date(segundo.deadline) - new Date(primero.deadline)).filter(copia => copia.priority === 'medium').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        )
    } else if (inputSearchTask === '' && selectPriority === 'low' && selectDeadLine === 'asc') {
        return (
            <>
                {tasks.sort((primero, segundo) => new Date(primero.deadline) - new Date(segundo.deadline)).filter(copia => copia.priority === 'low').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        ) 
    } else if (inputSearchTask === '' && selectPriority === 'low' && selectDeadLine === 'desc') {
        return (
            <>
                {tasks.sort((primero, segundo) => new Date(segundo.deadline) - new Date(primero.deadline)).filter(copia => copia.priority === 'low').map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        )
    } else if (inputSearchTask !== '' && selectPriority === 'all' && selectDeadLine === 'desc') {
        return (
            <>
                {tasks.filter(copia => copia.title.toLowerCase().includes(inputSearchTask.toLowerCase())).sort((primero, segundo) => new Date(segundo.deadline) - new Date(primero.deadline)).map((task) => (
                    <div key={task.id} className={styles.tasks} style={{borderLeft: `7px solid ${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}`}}>
                        <div className={styles.tasks_checkbox}>
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
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
                            <input type="checkbox" onClick={(e) => e.stopPropagation()}></input>
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
                        <OpenThreeDots id={task.id} onDeleteTask={onDeleteTask}/>
                    </div>
                ))}
            </>
        )
    }
}