"use client"

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import styles from '../styles/signUp.module.scss';
import cover from '../../public/assets/Sign_in_images/Diseño_portada_login_signup_nextdo_pro_gemini-removebg-preview.png';
import image_google from '../../public/assets/Sign_in_images/Icono google sin fondo.png';
import image_apple from '../../public/assets/Sign_in_images/Icono apple sin fondo.png';
import Image from 'next/image'
import AOS from "aos";
import "aos/dist/aos.css";

export default function SignUp () {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorSignUp, setErrorSignUp] = useState(false);
    const [messageError, setMessageError] = useState('');
    const router = useRouter();
    const pathName = usePathname();

    useEffect(() => {AOS.init({
        duration: 1000,
        delay: 0,
        once: true
    })}, []);

    async function submit (e) {
        e.preventDefault();
        const res = await fetch('http://localhost:4000/api/users', {
            method: "POST",
            headers: {
                "Authorization": process.env.NEXT_PUBLIC_SECRET,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                last_name: lastName,
                email: email,
                password: password
            })
        })

        if (res.status == 404){
            setErrorSignUp(true)
            setMessageError('Usuario ya existente')
        } else if (res.status == 400) {
            setErrorSignUp(true)
            setMessageError('Campos invalidos o faltantes')
        } else if (res.status == 200 || res.status == 201) {
            router.push('/LogIn')
        }
    }
 
    return (
        <>
            <div data-aos="zoom-in" className={styles.window_sign_up}>
                <div className={styles.container_sign_up}>
                    <div className={styles.seccions_sign_up}>
                        <div className={styles.seccion_sign_up_log_in} onClick={() => router.push('/LogIn')}>
                            <h2>Log in</h2>
                        </div>
                        <div className={styles.seccion_sign_up_sign_up} >
                            <h2>Sign up</h2>
                        </div>
                    </div>
                    <div className={styles.form_sign_up}>
                        <div className={styles.header_sign_up}>
                            <h1>Join the productivity revolution</h1>
                            <p>Create your account and start organized today.</p>
                        </div>
                        <div className={styles.form_questionary_sign_up}>
                            <form onSubmit={(e) => submit(e)}>
                                <div className={styles.inputs_sign_up}>
                                    <div className={styles.inputs_name_last_name_sign_up}>
                                        <div>
                                            <label htmlFor="name">Name</label>
                                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Name' name="name" id="name"/>
                                        </div>
                                        <div>
                                            <label htmlFor="last_name">Last name</label>
                                            <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder='Last name' name="last_name" id="last_name"/> 
                                        </div>                                        
                                    </div>
                                    <div className={styles.email_password_sign_in}>
                                        <label htmlFor="email">Email</label>
                                        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' name="email" id="email" type="email"/>

                                        <label htmlFor="password">Password</label>
                                        <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' name="password" id="password" type="password"/>                                        
                                        <p style={{fontSize: '80%', color: 'red'}}>{errorSignUp && messageError}</p>
                                    </div>                                    
                                </div>
                                <div className={styles.button_sign_up}>
                                    <button type="submit">Create account</button>                                    
                                </div>
                                <div className={styles.continue_with_sign_up}>
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
                        <div className={styles.portada_sign_up}>
                            <Image src={cover} width={400} height={400} alt='prueba'/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}