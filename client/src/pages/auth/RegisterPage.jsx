import Axios from "axios";
import React, { useState, useRef } from 'react'
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";
import { useForm } from "../../hooks/useForm";
import { motion } from "framer-motion"
import { Toast } from 'primereact/toast';
import { Checkbox } from "primereact/checkbox";
import { Tooltip } from 'primereact/tooltip';

export const RegisterPage = () => {
    const [checked, setChecked] = useState(false);

    const MAX_LENGTH = 15; // Longitud máxima permitida para los campos
    const MIN_LENGTH = 8; // Longitud mínima permitida para los campos
    const toast = useRef(null);

    const [value, setValue] = useState(''); // Estado para el campo de contraseña

    const header = <div className="font-bold mb-3"> Teclee su contraseña </div>; // Título para el campo de contraseña

    const { nombre, app, apm, correo, password, onInputChange, onResetForm } = useForm({
        nombre: '',
        app: '',
        apm: '',
        correo: '',
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
        // Si la contraseña no cumple con los requisitos, se muestra un mensaje de error con un toast
        if (password.length < MIN_LENGTH) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'La contraseña no cumple con los requisitos', life: 2000, closable: true, className: 'text-black' });
            return;
        } else {
            //si la contraseña cumple con los requisitos se manda la información al backend
            Axios.post('http://localhost:3000/register', {
                nombre: nombre,
                app: app,
                apm: apm,
                correo: correo,
                password: password
            }).then((response) => {
                console.log(response);
                if (response.data.success) {
                    toast.current.show({ severity: 'success', summary: 'Éxito', detail: 'Usuario registrado correctamente', life: 1000, closable: true, className: 'text-black' });
                    onResetForm();
                    setTimeout(() => {
                        window.location.href = '/';
                    }, 1000);
                } else {
                    toast.current.show({ severity: 'error', summary: 'Error', detail: response.data.message, life: 2000, closable: true, className: 'text-black' });
                }
            }).catch((error) => {
                console.log(error);
            });
        }
    }

    return (
        <>
            <Toast ref={toast} />
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='flex items-center justify-center' >
                <div className="w-full max-w-md">
                    <div className="text-center mb-2 mt-2">
                        <a href="/" className="text-4xl text-blue-900 font-bold">EduSmart</a>
                    </div>
                    <Card className="px-5 mb-2">
                        <h2 className="text-xl text-center font-bold mb-1">Crear cuenta</h2>
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
                                    name='correo'
                                    value={correo}
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
                                    // minLength={MIN_LENGTH}
                                    maxLength={MAX_LENGTH}
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
                                    Aceptar términos y condiciones
                                </label>
                            </div>
                            <div className=" mb-1" data-pr-tooltip="Debes aceptar los términos y condiciones">
                                <Tooltip target=".mb-1" disabled={checked} />
                                <Button
                                    label="Crear cuenta"
                                    className="w-full"
                                    type="submit"
                                    disabled={!checked}
                                />
                            </div>
                        </form>
                        <div className="text-center text-lg text-dark mt-3 pb-0">
                            ¿Ya tienes una cuenta? <a href="/" className="text-blue-500 hover:underline">Inicia sesión aquí</a>
                        </div>
                    </Card>
                </div>
            </motion.div>
        </>
    )
}
