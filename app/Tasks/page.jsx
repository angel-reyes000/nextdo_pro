"use client"

import styles from '../styles/tasks.module.scss'
import { FaPlus, FaCalendar, FaSearch } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import Task from './Task.jsx'

let ids = 0;
let list_tasks = []

export default function Tasks () {
    const refPriorityHigh = useRef(null)
    const refPriorityMedium = useRef(null)
    const refPriorityLow = useRef(null)
    const [priorityStateButton, setPriorityStateButton] = useState('')
    const [inputCreateTask, setInputCreateTask] = useState('')
    const [inputCreateDescriptionTask, setInputCreateDescriptionTask] = useState('')
    const [inputCreateDeadLineTask, setInputCreateDeadLineTask] = useState('')
    const [tasks, setTasks] = useState(list_tasks)
    const [inputSearchTask, setInputSearchTask] = useState('')
    const [selectPriority, setSelectPriority] = useState('all')
    const [selectDeadLine, setSelectDeadLine] = useState('')

    let refHigh = refPriorityHigh.current
    let refMedium = refPriorityMedium.current
    let refLow = refPriorityLow.current
    useEffect(() => {
        if (priorityStateButton === 'high') {
            refHigh.style.backgroundColor = 'red';
            refHigh.style.outline = '3px solid black'

            refMedium.style.backgroundColor = 'rgb(253, 255, 136)'
            refMedium.style.outline = '0px'

            refLow.style.backgroundColor = 'rgb(189, 255, 193)'
            refLow.style.outline = '0px'

        } else if (priorityStateButton === 'medium') {
            refMedium.style.backgroundColor = 'yellow';
            refMedium.style.outline = '3px solid black'

            refHigh.style.backgroundColor = 'rgb(255, 132, 132)'
            refHigh.style.outline = '0px'

            refLow.style.backgroundColor = 'rgb(189, 255, 193)'
            refLow.style.outline = '0px'

        } else if (priorityStateButton === 'low') {
            refLow.style.backgroundColor = 'green';
            refLow.style.outline = '3px solid black'

            refHigh.style.backgroundColor = 'rgb(255, 132, 132)'
            refHigh.style.outline = '0px'

            refMedium.style.backgroundColor = 'rgb(253, 255, 136)'
            refMedium.style.outline = '0px'
        }
        console.log("Cambio de prioridad")
    }, [priorityStateButton])

    function Search_engine () {
        return <Task tasks={tasks} inputSearchTask={inputSearchTask} selectPriority={selectPriority} selectDeadLine={selectDeadLine}/>
    }

    return (
        <>  
            <div className={styles.tasks_window}>
                <div className={styles.all_about_tasks}>
                    {/* -------------------------------- Create Tasks --------------------------------- */}
                    <div className={styles.create_task}>
                        <div className={styles.create_task_row_1}>
                            <div>
                                <h1>Create New Task</h1>
                            </div>
                            <div className={styles.create_task_row_1_buttons}>
                                <p>Priority:</p>
                                <button ref={refPriorityHigh} onClick={() => setPriorityStateButton('high')} style={{backgroundColor: 'rgb(255, 132, 132)'}}>High</button>
                                <button ref={refPriorityMedium} onClick={() => setPriorityStateButton('medium')} style={{backgroundColor: 'rgb(253, 255, 136)'}}>Medium</button>
                                <button ref={refPriorityLow} onClick={() => setPriorityStateButton('low')} style={{backgroundColor: 'rgb(189, 255, 193)'}}>Low</button>
                            </div>
                        </div>
                        <div className={styles.create_task_row_2}>
                            <div className={styles.input_new_task}>
                                <input value={inputCreateTask} onChange={(e) => setInputCreateTask(e.target.value)} placeholder='Input new task'></input>
                            </div>
                            <div className={styles.label_input_deadline}>
                                <label htmlFor='deadline'>Deadline: </label>
                                <input value={inputCreateDeadLineTask} onChange={(e) => setInputCreateDeadLineTask(e.target.value)} type='date' placeholder='Deadline' id="deadline" name="deadline"></input>
                            </div>
                            <button onClick={() => {
                                setTasks([...tasks, {id: ids++, title: inputCreateTask, description: inputCreateDescriptionTask, deadline: inputCreateDeadLineTask, priority: priorityStateButton !== '' ? priorityStateButton : 'low'}])
                                setInputCreateTask('')
                                setInputCreateDescriptionTask('')
                                setInputCreateDeadLineTask('')
                                setPriorityStateButton('')
                                refHigh.style.backgroundColor = 'rgb(255, 132, 132)'
                                refHigh.style.outline = '0px'
                                refMedium.style.backgroundColor = 'rgb(253, 255, 136)'
                                refMedium.style.outline = '0px'
                                refLow.style.backgroundColor = 'rgb(189, 255, 193)'
                                refLow.style.outline = '0px'
                                }}>
                                <FaPlus size={20} style={{display: 'inline-block', alignContent: 'center', marginBottom: '2%'}}/> Add Task
                            </button>
                        </div>
                        {inputCreateTask.length > 0 ? (
                            <div className={styles.description_task}>
                                <textarea value={inputCreateDescriptionTask} onChange={(e) => setInputCreateDescriptionTask(e.target.value)} placeholder='Write the description for your task...' cols={2} rows={5}></textarea>
                            </div>
                        ) : null}
                    </div>
                    <hr style={{margin: '1% 0% 1% 0%', border: '3px solid rgb(208, 208, 208)', width: '100%', borderRadius: '10px'}} />
                    {/* -------------------------- Filtros y busqueda -------------------------------- */}
                    <div className={styles.filters_and_search}>
                        <div className={styles.input_filters_and_search}>
                            <FaSearch size={20}/>
                            <input value={inputSearchTask} onChange={(e) => setInputSearchTask(e.target.value)} placeholder='Search Task...'></input>
                        </div>
                        <div className={styles.select_filters_and_search_filter}>
                            <select value={selectPriority} onChange={(e) => setSelectPriority(e.target.value)}>
                                <option value='all'>Filter by: [All Tasks]</option>
                                <option value='high'>Filter by: [High Tasks]</option>
                                <option value='medium'>Filter by: [Medium Tasks]</option>
                                <option value='low'>Filter by: [Low Tasks]</option>
                            </select>
                        </div>
                        <div className={styles.select_filters_and_search_sort}>
                            <select value={selectDeadLine} onChange={(e) => setSelectDeadLine(e.target.value)}>
                                <option value='asc'>Sort by: [Deadline Asc]</option>
                                <option value='desc'>Sort by: [Deadline Descs]</option>
                            </select>
                        </div>
                        <div className={styles.priority_filters_and_search}>
                            <p style={{backgroundColor: 'red'}}>High</p>
                            <p style={{backgroundColor: 'yellow'}}>Medium</p>
                            <p style={{backgroundColor: 'green'}}>Low</p>
                        </div>
                    </div>
                    {/* ---------------------------- Tasks -------------------------------*/}
                    <Search_engine />
                </div>
            </div>
        </>
    )
}