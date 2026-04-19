"use client"

import { useRef, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/modal_expired_token.module.scss';
import image_expired_token from '../../public/assets/Sign_in_images/image_expired_token.png';

export default function Modal () {
    const refDialog = useRef(null);
    const router = useRouter();

    useEffect(() => {
        if (token === undefined || token === null) {
            refDialog.current.showModal(), []
            return (
                <div className={styles.window_dialog}>
                    <dialog className={styles.modal_target} ref={refDialog}>
                        <Image src={image_expired_token} width={150} height={150} alt='Image expired token'></Image>
                        <h1>Session expired!</h1>
                        <p>We're sorry, your session has ended. Please log in again or create an account to continue.</p>
                        <div className={styles.modal_buttons}>
                            <button onClick={() => {
                                router.push('/login')
                                refDialog.current.close()
                            }}>Log in</button>
                            <button onClick={() => {
                                router.push('/signup')
                                refDialog.current.close()
                            }}>Create account</button>
                        </div>
                    </dialog>
                </div>
            )
        }
    })
    const token = localStorage.getItem('token')
    
}