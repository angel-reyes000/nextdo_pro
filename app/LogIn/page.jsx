"use client"

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/logIn.module.scss';
import cover from '../../public/assets/Sign_in_images/Diseño_portada_login_signup_nextdo_pro_gemini-removebg-preview.png';
import image_google from '../../public/assets/Sign_in_images/Icono google sin fondo.png';
import image_apple from '../../public/assets/Sign_in_images/Icono apple sin fondo.png';
import Image from 'next/image'
import AOS from "aos";
import 'aos/dist/aos.css';

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter()

    useEffect(() => {
        AOS.init({
            duration: 1000,
            delay: 0,
            once: true
        })
    })

    async function submit (e) {
        e.preventDefault();

        const res = await fetch(`http://localhost:4000/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })

        const data = await res.json()

        if (res.status == 200 && data.token) {
            localStorage.setItem('token', data.token)
            router.push('/Tasks')
        }else{
            alert('Error: ' + data.Error)
        }
    }

    return (
        <>
            <div data-aos="zoom-in" className={styles.window_log_in}>
                <div className={styles.container_log_in}>
                    <div className={styles.seccions_log_in}>
                        <div className={styles.seccion_log_in_log_in}>
                            <h2>Log in</h2>
                        </div>
                        <div className={styles.seccion_log_in_sign_up} onClick={() => router.push('/SignUp')}>
                            <h2>Sign up</h2>
                        </div>
                    </div>
                    <div className={styles.form_log_in}>
                        <div className={styles.header_log_in}>
                            <h1>Welcome back, PRO</h1>
                            <p>Secure your productivity and pick up where you left off.</p>
                        </div>
                        <div className={styles.form_questionary_log_in}>
                            <form onSubmit={(e) => submit(e)}>
                                <div className={styles.inputs_log_in}>
                                    <div className={styles.email_password_sign_in}>
                                        <label htmlFor="email">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' name="email" id="email" type="email"/>

                                        <label htmlFor="password">Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' name="password" id="password" type="password"/>                                        
                                    </div>                                    
                                </div>
                                <div className={styles.button_log_in}>
                                    <button type="submit">Log in</button>                                    
                                </div>
                                <div className={styles.continue_with_log_in}>
                                    <p>Or continue with</p>
                                    <hr />
                                </div>
                                <div className={styles.google_apple_images}>
                                    <div className={styles.container_image_google}>
                                        <Image src={image_google} width={70} height={70} alt='Imagen de inicio de sesion con google' />
                                    </div>
                                    <div className={styles.container_image_apple}>
                                        <Image src={image_apple} width={70} height={70} alt='Imagen de inicio de sesion con apple' />
                                    </div>
                                </div>
                            </form>
                        </div>    
                        <div className={styles.portada_log_in}>
                            <Image src={cover} width={400} height={400} alt='prueba'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}