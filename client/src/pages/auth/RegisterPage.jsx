import React, { useState } from 'react'
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useForm } from "../../hooks/useForm";
import { motion } from "framer-motion"

export const RegisterPage = () => {
    const MAX_LENGTH = 15; // Longitud máxima permitida para los campos
    const MIN_LENGTH = 8; // Longitud mínima permitida para los campos

    const [value, setValue] = useState(''); // Estado para el campo de contraseña
    const header = <div className="font-bold mb-3"> Teclee su contraseña </div>; // Título para el campo de contraseña

    const { nombre, app, apm, email, password, onInputChange, onResetForm } = useForm({
        nombre: '',
        app: '',
        apm: '',
        email: '',
        password: '',
    });

    const footer = (
        <>
            <Divider />
            <p className="mt-2">Sugerencias</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Al menos una letra mayúscula</li>
                <li>Al menos un número</li>
                <li>Al menos un carácter especial</li>
                <li>Mínimo 8 caracteres</li>
                <li>Máximo 15 caracteres</li>
            </ul>
        </>
    );

    const onRegister = (e) => {
        e.preventDefault();
        console.log('Formulario enviado');
        console.log(nombre, app, apm, email, password);
        onResetForm();
    }


    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='flex pt-3 pb-3 items-center justify-center' >
                <div className="w-full max-w-md">
                    <div className="text-center mb-3 mt-1">
                        <a href="/" className="text-4xl text-blue-900 font-bold">EduSmart</a>
                    </div>
                    <Card className="px-5 mb-2">
                        <h2 className="text-xl text-center font-bold mb-2">Crear cuenta</h2>
                        <Divider className="mb-2" />
                        <form onSubmit={onRegister} autoComplete='off'>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                                <InputText
                                    className='w-full'
                                    name='nombre'
                                    value={nombre}
                                    onChange={onInputChange}
                                    placeholder='Ingrese su nombre'
                                    autoFocus
                                    required
                                    maxLength={MAX_LENGTH}
                                />
                            </div>
                            <div className='flex w-full flex-wrap md:flex-nowrap gap-3  mb-2'>
                                <div className="w-full md:w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellido Paterno</label>
                                    <InputText
                                        className='w-full'
                                        name='app'
                                        value={app}
                                        onChange={onInputChange}
                                        placeholder='Su apelldo paterno'
                                        required
                                        maxLength={MAX_LENGTH}
                                    />
                                </div>
                                <div className="w-full md:w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellido Materno</label>
                                    <InputText
                                        className='w-full'
                                        name='apm'
                                        value={apm}
                                        onChange={onInputChange}
                                        placeholder='Su apellido materno'
                                        required
                                        maxLength={MAX_LENGTH}
                                    />
                                </div>
                            </div>
                            <div className="mb-2">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico</label>
                                <InputText
                                    className='w-full'
                                    name='email'
                                    value={email}
                                    onChange={onInputChange}
                                    placeholder='Ingrese su correo electrónico'
                                    required
                                    type='email'
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Contraseña</label>
                                <Password
                                    className='w-full'
                                    name='password'
                                    value={password}
                                    onChange={onInputChange}
                                    placeholder='Ingrese su contraseña'
                                    required
                                    feedback={true}
                                    inputClassName='w-full'
                                    toggleMask
                                    header={header}
                                    footer={footer}
                                    minLength={MIN_LENGTH}
                                    maxLength={MAX_LENGTH}
                                />
                            </div>
                            {/* boton */}
                            <div data-pr-tooltip="Debes aceptar los términos y condiciones">
                                <Button
                                    label="Crear cuenta"
                                    className="w-full"
                                    type="submit"
                                />
                            </div>
                        </form>
                    </Card>
                    <div className="text-center text-lg text-dark mt-3">
                        ¿Ya tienes una cuenta? <a href="/" className="text-blue-500 hover:underline">Inicia sesión aquí</a>
                    </div>
                </div>
            </motion.div>
        </>
    )
}
