"use client"

import portada from '../public/assets/Main_window_images/Imagen_de_portada_de_app_de_notas-removebg-preview.png'
import Image from 'next/image'
import styles from './styles/Main_window.module.scss'
import { FaBolt } from 'react-icons/fa'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function NextDoPro () {
  const router = useRouter()

  useEffect(() => {
    console.log("Pagina principal cargada correctamente✅")
  }, [])

  return (
    <>
      <div className={styles.main_window}>
        <div className={styles.text_and_button_main_window}>
          <div className={styles.text_main_window}>
            <h1>NextDo Pro<br /> The chaos ends here.</h1>
            <p>Manage task with priorities, dynamic filters and deadline sorting for maximum productivity.</p>
          </div>
          <button onClick={() => router.push('/tasks')}><FaBolt style={{display: 'inline', color: 'yellow'}}/>  Get started now</button>
        </div>
        <div className={styles.image_main_window}>
          <Image src={portada} width={500} height={500} alt='Foto de portada'/>
        </div>
      </div>
    </>
  )
}