"use client"

import styles from '../styles/NavBar.module.scss'
import Image from 'next/image'
import Logo from '../../public/assets/NavBar_images/logo nextdo pro navbar.png'
import cuadritos from '../../public/assets/NavBar_images/cuadraditos navbar nextdopro.png'
import notificacion from '../../public/assets/NavBar_images/simbolo de notificacion navbar nextdopro.png'
import foto_perfil from '../../public/assets/NavBar_images/foto de perfil nextdo pro navbar.png'
import lupa from '../../public/assets/NavBar_images/search navbar nextdo pro.png'
import { FaSearch } from 'react-icons/fa'
import { useRouter, usePathname } from 'next/navigation'
import { useState } from 'react'

export default function NavBar(){
    const router = useRouter()
    const pathName = usePathname()

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
                <div className={styles.imagens_navbar}>
                    <Image src={cuadritos} width={60} height={60} alt='Cuadritos de decoracion'/>
                    <Image src={notificacion} width={60} height={60} alt='Notificacion de decoracion'/>
                    <Image onClick={() => router.push('/SignUp')} title='Log in/Sign up' style={{cursor: 'pointer'}} src={foto_perfil} width={60} height={60} alt='Foto de perfil'/>
                </div>
            </div>
        </>
    )
}