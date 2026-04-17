"use client"

import styles from '../styles/NavBar.module.scss'
import Image from 'next/image'
import Logo from '../../public/assets/NavBar_images/logo nextdo pro navbar.png'
import lupa from '../../public/assets/NavBar_images/search navbar nextdo pro.png'
import image_log_out from '../../public/assets/NavBar_images/logout_nextdopro.png';
import image_login_signup from '../../public/assets/Sign_in_images/imagen _login_signup.png'
import { FaSearch } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'

export default function NavBar(){
    const router = useRouter();
    const pathName = usePathname();
    const [openLogout, setOpenLogout] = useState(false);

    function Log_out () {
        const logoutRef = useRef(null);
        const router = useRouter();
    
        useEffect(() => {
            logoutRef.current.showModal()
        }, []);

        return (
            <>
                <dialog ref={logoutRef} className={styles.modal_card_log_out}>
                    <div className={styles.modal_log_out}>
                        <div className={styles.modal_text_log_out}>
                            <p>Are you sure you want to log out?</p>
                        </div>
                        <div className={styles.modal_buttons_log_out}>
                            <button onClick={() => {
                                localStorage.removeItem('token');
                                router.push('/login');
                                logoutRef.current.close();
                                setOpenLogout(false)
                                }} value='yes'>Yes</button>
                            <button onClick={() => {
                                logoutRef.current.close();
                                setOpenLogout(false)
                                }} value='no'>No</button>
                        </div>
                    </div>
                </dialog>
            </>
        )
    }

    return (
        <>
            <div className={styles.NavBar}>
                <div className={styles.logo_titulo_navbar} onClick={() => router.push('/')}>
                    <Image src={Logo} width={100} height={100} alt='Logo'/>
                    <h2 className={styles.titulo_navbar}>NextDo PRO</h2>
                </div>
                <div className={styles.search_navbar}>
                    <div className={styles.fasearch_bg}>
                        <FaSearch className={styles.fasearch}/>
                    </div>
                    <div className={styles.write_search}>
                        <p>NextDo PRO, Welcome!<span className={styles.stick_move}>|</span></p>
                    </div>                    
                </div>
                {pathName !== '/login' && pathName !== '/signup' && pathName !== '/' ? (
                    <div onClick={() => {setOpenLogout(true)}} className={styles.log_out_navbar}>                         
                        <div className={styles.log_out_container}>
                            <Image src={image_log_out} width={50} height={50} alt='image log out' />
                            <p>Log out</p>
                        </div>            
                    </div>) : ''}
                    {openLogout && <Log_out />}
            </div>
        </>
    )
}