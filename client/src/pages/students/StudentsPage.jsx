import React from 'react'
import { Navbar } from '../../components/Navbar'
import { motion } from "framer-motion";
import { Toolbar } from 'primereact/toolbar';
import { FileUpload } from 'primereact/fileupload';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Toast } from 'primereact/toast';
// import 'primeicons/primeicons.css';


export const StudentsPage = () => {
    const exportCSV = () => {
        dt.current.exportCSV();
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="csv/*" maxFileSize={1000000} label="Importar lista de alumnos" chooseLabel="Import" className="mr-2 inline-block" />
                <Button label="Exportar lista de alumnos" icon="pi pi-upload" className="p-button-" onClick={exportCSV} />
            </React.Fragment>
        );
    };
    return (
        <>
            {/* motion */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className=''>
                <Navbar />
                <div className='container mx-auto'>
                    <div className='card'>
                        <Toolbar className='container' right={rightToolbarTemplate} />
                    </div>

                    <div className='card'>

                    </div>
                </div>
            </motion.div>
        </>
    )
}
