import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import { Toast } from 'primereact/toast';
import { Tooltip } from "primereact/tooltip";
import { useForm } from "../../hooks/useForm";
import { useState, useRef } from "react";
import Axios from "axios";

export const LoginPage = () => {
    //Numero de intentos de logeo permitidos
    const [loginAttempts, setLoginAttempts] = useState(0);

    const MAX_LENGTH = 15; // Longitud máxima permitida para los campos
    const MIN_LENGTH = 8; // Longitud mínima permitida para los campos
    const MAX_ATTEMPTS = 5; // Número máximo de intentos de logeo permitidos

    const toast = useRef(null);

    const { email, password, onInputChange, onResetForm } = useForm({
        email: '',
        password: '',
    });

    const [checked, setChecked] = useState(false);

    const onLogin = (e) => {
        e.preventDefault(); //Se previene el comportamiento por defecto del formulario
        Axios.post('http://localhost:3000/login', {
            email: email,
            password: password
        }).then((response) => {
            console.log(response);
            if (response.data.success) {
                window.location.href = '/home';
            } else {
                setLoginAttempts(loginAttempts + 1); //Se incrementa el número de intentos de logeo
                if (loginAttempts >= MAX_ATTEMPTS) {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: 'Número de intentos de excedido', life: 2000, closable: true, className: 'text-black' });
                    return;
                }
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Usuario o contraseña incorrectos', life: 2000, closable: true, className: 'text-black' });
            }
        })
    };



    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='flex gap-5 p-4 items-center justify-center'>
                <Toast ref={toast} position="top-center" />
                <div className='w-full max-w-md'>
                    <div className="text-center mb-3 mt-1">
                        <a href="/" className="text-4xl text-blue-900 font-bold">EduSmart</a>
                    </div>
                    <Card className='px-8 pt-6 pb-4 mb-4 border-slate-950 shadow-lg'>
                        <h2 className="text-xl text-center font-bold mb-5">CONTROL DE ACCESO</h2>
                        <Divider />
                        <form autoComplete='off' onSubmit={onLogin}>
                            <div className='mb-4'>
                                <label className="block text-gray-700 text-md font-bold mb-2">Correo electrónico</label>
                                <InputText
                                    className='w-full'
                                    name='email'
                                    value={email}
                                    onChange={onInputChange}
                                    placeholder='Ingrese su correo electrónico'
                                    autoFocus
                                    type="email"
                                    required
                                />
                            </div>
                            <div className="mb-1">
                                <div className="flex justify-between">
                                    <label className="block text-gray-700 text-md font-bold mb-2 ">Contraseña</label>
                                    <span className="text-md text-blue-500">
                                        <a href="recover-password">¿Perdiste tu contraseña?</a>
                                    </span>
                                </div>
                            </div>
                            <div className='mb-4'>
                                <Password
                                    className='w-full'
                                    name='password'
                                    value={password}
                                    onChange={onInputChange}
                                    placeholder='Ingrese su contraseña'
                                    required
                                    feedback={false}
                                    inputClassName='w-full'
                                    toggleMask
                                    maxLength={MAX_LENGTH}
                                    minLength={MIN_LENGTH}
                                />
                            </div>
                            <div className="mb-6">
                                <Checkbox
                                    id="terms"
                                    name="terms"
                                    onChange={(e) => setChecked(e.checked)}
                                    checked={checked}
                                />
                                <label
                                    className="ml-2 text-gray-700 text-sm font-semibold"
                                    onClick={() => setChecked(!checked)}>
                                    Recordar dispositivo
                                </label>
                            </div>
                            <div className="mb-1" data-pr-tooltip="Numero de intentos superado, por favor vuelve mas tarde">
                                <Tooltip target=".mb-1" disabled={loginAttempts < MAX_ATTEMPTS} />
                                <Button
                                    label="Ingresar"
                                    className="w-full"
                                    type="submit"
                                    disabled={loginAttempts >= MAX_ATTEMPTS}
                                />
                            </div>
                        </form>
                    </Card>
                    <div className="text-center text-lg text-dark mt-3">
                        ¿No tienes una cuenta? <a href="./register" className="text-blue-500 hover:underline"> Regístrate aquí</a>
                    </div>
                </div>
                <div className="hidden lg:block lg:col-span-1 w-2/5">
                    <img src="../../../public/undraw_secure_login_pdn4.svg" alt="" />
                </div>
            </motion.div >
        </>
    )
}
