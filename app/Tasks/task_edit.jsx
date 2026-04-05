"use client"

import styles from '../styles/task.edit.module.scss'
import { FaTimes, FaSave } from 'react-icons/fa'
import { useState } from 'react'

export default function Task_edit({ task, onClose, onSave }) {
    const [editID, setEditId] = useState(task.id)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editDescription, setEditDescription] = useState(task.description)
    const [editDeadline, setEditDeadline] = useState(task.deadline)
    const [editPriority, setEditPriority] = useState(task.priority)

    const handleSave = () => {
        onSave({
            ...task,
            id: editID,
            title: editTitle,
            description: editDescription,
            deadline: editDeadline,
            priority: editPriority
        })
        const updateTaskDataBase = async () => {
            const db = await fetch(`http://localhost:${process.env.NEXT_PUBLIC_PORT}/api/notes`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id: editID,
                    title: editTitle,
                    description: editDescription,
                    deadline: editDeadline,
                    priority: editPriority
                })
            });
        }
        updateTaskDataBase()
    }

    return (
        <div className={styles.backgorund_task_edit}>
            <div className={styles.card_edit}>
                <div className={styles.edit_header}>
                    <div className={styles.edit_title}>
                        <h1>Title: </h1>
                        <input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder='Edit your title...'></input>
                    </div>
                    <button onClick={onClose}><FaTimes size={30}/></button>
                </div>
                <hr style={{backgroundColor: 'black', border: '2px solid black', width: '100%'}}/>
                <div className={styles.edit_description}>
                    <h2>Description:</h2>
                    <textarea value={editDescription} onChange={(e) => setEditDescription(e.target.value)} placeholder='Edit your description...'></textarea>
                </div>
                <div className={styles.edit_date_and_priority}>
                    <div className={styles.edit_date}>
                        <label htmlFor="date">Date:</label>
                        <input type='date' value={editDeadline} onChange={(e) => setEditDeadline(e.target.value)} name='date' id="date"></input>
                    </div>
                    <div className={styles.edit_priority}>
                        <label htmlFor="priority">Priority:</label>
                        <select value={editPriority} onChange={(e) => setEditPriority(e.target.value)} id="priority">
                            <option value='high'>High</option>
                            <option value='medium'>Medium</option>
                            <option value='low'>Low</option>
                        </select>
                    </div>
                    
                </div>
                <div className={styles.edit_save_and_close}>
                    <div className={styles.edit_button_close}>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                    <div className={styles.edit_button_save}>
                        <button onClick={handleSave}><FaSave style={{display: 'inline', marginBottom: '8%'}}/> Save</button>
                    </div>
                </div>
            </div>
        </div>
    )
}