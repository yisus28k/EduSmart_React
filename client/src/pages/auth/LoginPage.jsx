import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { Tooltip } from 'primereact/tooltip';
import { motion } from "framer-motion";

import { useForm } from "../../hooks/useForm";
import { useState } from "react";

export const LoginPage = () => {
    const { email, password, onInputChange, onResetForm } = useForm({
        email: '',
        password: '',
    });

    const [checked, setChecked] = useState(false);

    return (
        <>
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className='flex gap-5 p-4 items-center justify-center'>
                <div className='w-full max-w-md'>
                    <div className="text-center mb-3 mt-1">
                        <a href="/" className="text-4xl text-blue-900 font-bold">EduSmart</a>
                    </div>
                    <Card className='px-8 pt-6 pb-4 mb-4 border-slate-950 shadow-lg'>
                        <h2 className="text-xl text-center font-bold mb-5">CONTROL DE ACCESO</h2>
                        <Divider />
                        <form autoComplete='off'>
                            <div className='mb-4'>
                                <label className="block text-gray-700 text-md font-bold mb-2">Correo electrónico</label>
                                <InputText
                                    className='w-full'
                                    name='email'
                                    value={email}
                                    onChange={onInputChange}
                                    placeholder='Ingrese su correo electrónico'
                                    autoFocus
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
                            <div className="mb-1" data-pr-tooltip="Debes aceptar los términos y condiciones">
                                <Tooltip target=".mb-1" disabled={checked} />
                                <Button
                                    label="Ingresar"
                                    className="w-full"
                                    type="submit"
                                    disabled={!checked}
                                />
                            </div>
                        </form>
                    </Card>
                    <div className="text-center text-lg text-dark mt-3">
                        ¿No tienes una cuenta? <a href="./register" className="text-blue-500 hover:underline">Regístrate aquí</a>
                    </div>
                </div>
                <div className="hidden lg:block lg:col-span-1 w-2/5">
                    <img src="../../../public/undraw_secure_login_pdn4.svg" alt="" />
                </div>
            </motion.div >
        </>
    )
}
