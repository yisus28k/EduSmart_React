import React, { useRef, useState } from "react";
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Toast } from 'primereact/toast';
import { Tooltip } from "primereact/tooltip";
import { useForm } from "../../hooks/useForm";
import Axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthProvider";

export const LoginPage = () => {
    const [loginAttempts, setLoginAttempts] = useState(0);
    const MAX_LENGTH = 15;
    const MIN_LENGTH = 8;
    const MAX_ATTEMPTS = 5;
    const toast = useRef(null);
    const { isAuthenticated, setAuthData } = useAuth();
    const { email, password, onInputChange } = useForm({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    const onLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await Axios.post("http://localhost:3000/login", {
                email: email,
                password: password,
            });

            if (response.data.success) {
                setAuthData({
                    isAuthenticated: true,
                    token: response.data.token,
                });

                navigate("/home");
            } else {
                setLoginAttempts(loginAttempts + 1);

                if (loginAttempts >= MAX_ATTEMPTS) {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Número de intentos excedido, por favor vuelve más tarde',
                        life: 2000,
                        closable: true,
                        className: 'text-black',
                    });
                } else {
                    toast.current.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Usuario o contraseña incorrectos',
                        life: 2000,
                        closable: true,
                        className: 'text-black',
                    });
                }
            }
        } catch (error) {
            console.error("Error en la solicitud de inicio de sesión:", error);
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/home" />;
    }

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
            </motion.div>
        </>
    );
};
