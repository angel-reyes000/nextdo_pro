"use client"

import styles from '../styles/tasks.module.scss'
import { FaPlus } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'

export default function Tasks () {
    const refPriorityHigh = useRef(null)
    const refPriorityMedium = useRef(null)
    const refPriorityLow = useRef(null)
    const [priorityStateButton, setPriorityStateStateButton] = useState(null)

     
    useEffect(() => {
        let refHigh = refPriorityHigh.current
        let refMedium = refPriorityMedium.current
        let refLow = refPriorityLow.current
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

    return (
        <>  
            <div className={styles.tasks_window}>
                <div className={styles.all_about_tasks}>
                    {/* Create Tasks*/}
                    <div className={styles.create_task}>
                        <div className={styles.create_task_row_1}>
                            <div>
                                <h1>Create New Task</h1>
                            </div>
                            <div className={styles.create_task_row_1_buttons}>
                                <p>Priority:</p>
                                <button ref={refPriorityHigh} onClick={() => setPriorityStateStateButton('high')} style={{backgroundColor: 'rgb(255, 132, 132)'}}>High</button>
                                <button ref={refPriorityMedium} onClick={() => setPriorityStateStateButton('medium')} style={{backgroundColor: 'rgb(253, 255, 136)'}}>Medium</button>
                                <button ref={refPriorityLow} onClick={() => setPriorityStateStateButton('low')} style={{backgroundColor: 'rgb(189, 255, 193)'}}>Low</button>
                            </div>
                        </div>
                        <div className={styles.create_task_row_2}>
                            <div className={styles.input_new_task}>
                                <input placeholder='Input new task'></input>
                            </div>
                            <div className={styles.label_input_deadline}>
                                <label htmlFor='deadline'>Deadline: </label>
                                <input type='date' placeholder='Deadline' id="deadline" name="deadline"></input>
                            </div>
                            <button><FaPlus size={20} style={{display: 'inline-block', alignContent: 'center', marginBottom: '2%'}}/> Add Task</button>
                        </div>
                    </div>
                    {/*Filtros y busqueda*/}
                    <div className={styles.filters_and_search}>
                        <div className={styles.input_filters_and_search}>
                            <input placeholder='Search Task...'></input>
                        </div>
                        <div className={styles.select_filters_and_search_filter}>
                            <select>
                                <option value='all'>Filter by: [All Tasks]</option>
                                <option value='high'>Filter by: [High Tasks]</option>
                                <option value='Medium'>Filter by: [Medium Tasks]</option>
                                <option value='Low'>Filter by: [Low Tasks]</option>
                            </select>
                        </div>
                        <div className={styles.select_filters_and_search_sort}>
                            <select>
                                <option value='descs'>Sort by: [Deadline Descs]</option>
                                <option value='ascn'>Sort by: [Deadline Ascn]</option>
                            </select>
                        </div>
                        <div className={styles.priority_filters_and_search}>
                            <p style={{backgroundColor: 'red'}}>High</p>
                            <p style={{backgroundColor: 'yellow'}}>Medium</p>
                            <p style={{backgroundColor: 'green'}}>Low</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}