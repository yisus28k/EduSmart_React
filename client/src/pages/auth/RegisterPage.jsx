import React, { useState } from 'react'
import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import { useForm } from "../../hooks/useForm";

export const RegisterPage = () => {
    const { name, password, onInputChange, onResetForm } =
        useForm({
            name: '',
            password: '',
        });
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
                                    value={name}
                                    onChange={onInputChange}
                                    placeholder='Ingrese su nombre'
                                    autoFocus
                                    required
                                />
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </>
    )
}
