import React, { useState } from 'react'
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { useForm } from "../../hooks/useForm";

export const RegisterPage = () => {
    const { nombre, app, apm, email, password, onInputChange, onResetForm } = useForm({
        nombre: '',
        app: '',
        apm: '',
        email: '',
        password: '',
    });

    const [value, setValue] = useState('');
    const header = <div className="font-bold mb-3"> Teclee su contraseña </div>;
    const footer = (
        <>
            <Divider />
            <p className="mt-2">Sugerencias</p>
            <ul className="pl-2 ml-2 mt-0 line-height-3">
                <li>Al menos una letra mayúscula</li>
                <li>Al menos un número</li>
                <li>Al menos un carácter especial</li>
                <li>Mínimo 8 caracteres</li>
            </ul>
        </>
    );


    return (
        <>
            <div className='flex pt-5 pb-5 items-center justify-center' >
                <div className="w-full max-w-md">
                    <div className="text-center mb-2 mt-1">
                        <a href="/" className="text-3xl text-blue-900 font-bold">EduSmart</a>
                    </div>
                    <Card className="px-2 mb-2">
                        <h2 className="text-xl text-center font-bold mb-2">Crear cuenta</h2>
                        <Divider className="mb-2" />
                        <form autoComplete='off'>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                                <InputText
                                    className='w-full'
                                    name='nombre'
                                    value={nombre}
                                    onChange={onInputChange}
                                    placeholder='Ingrese su nombre'
                                    autoFocus
                                    required
                                />
                            </div>
                            <div className='flex w-full flex-wrap md:flex-nowrap gap-3  mb-3'>
                                <div className="w-full md:w-1/2">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Apellido Paterno</label>
                                    <InputText
                                        className='w-full'
                                        name='app'
                                        value={app}
                                        onChange={onInputChange}
                                        placeholder='Su apelldo paterno'
                                        required
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
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="block text-gray-700 text-sm font-bold mb-2">Correo electrónico</label>
                                <InputText
                                    className='w-full'
                                    name='email'
                                    value={email}
                                    onChange={onInputChange}
                                    placeholder='Ingrese su correo electrónico'
                                    required
                                />
                            </div>
                            <div className="mb-3">
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
                                />
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    )
}
