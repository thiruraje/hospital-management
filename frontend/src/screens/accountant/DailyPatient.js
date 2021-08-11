import React, { useEffect, useState } from 'react';
import Header from './layout/Header';
import Menu from './layout/Menu';
import Footer from './layout/Footer';
import Switch from "react-switch";
import axios from "axios";


function DailyPatient(props) {


    const [patients, setPatient] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        fetchData()
    }, []);
    const fetchData = async()=>{
        const data = await fetch('http://localhost:4000/api/accountant/daily-patients');
        const patients_data = await data.json();
        setPatient(patients_data);
        setFilteredPatients(patients_data)

    }

    const handleChange = (index, patientId)=>{
        if(filteredPatients[index].is_paid){
            let newArr = [...filteredPatients]
            newArr[index].is_paid = false
            setFilteredPatients(newArr)
            updatePaidStatus(patientId,false);
        }else{
            let newArr = [...filteredPatients]
            newArr[index].is_paid = true
            setFilteredPatients(newArr)
            updatePaidStatus(patientId,true);
        }
    }
    const updatePaidStatus = async (checkupId,status)=>{
        axios
        .post(`http://localhost:4000/api/accountant/daily-patient-paid-update`,{ checkupId,status })
        .then(result => {
            console.log(result);
        })
        .catch(error =>{
            console.log(error);
        }
        );
    }
    const formatter = new Intl.DateTimeFormat("en-GB", {
        year: "numeric",
        month: "long",
        day: "2-digit"
    });
    const serachNameChange = (e)=> {
        console.log(e.target.value)
        if(e.target.value !== ""){
            const filteredData = patients.filter(item => {
            return (
                item.patient_info.name.toLowerCase().search(e.target.value.toLowerCase()) !== -1
            );
            });
            setFilteredPatients(filteredData)
        }else{
            setFilteredPatients(patients)
        }
        
    }


    return (
        <div>
            <Header />
            <Menu />
            <div className="content-wrapper">
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Daily Patients</h1>
                            </div>{/* /.col */}
                             <div class="col-sm-6">
                                <ol class="breadcrumb float-sm-right">
                                    <input className="form-control" placeholder="search name" onChange={serachNameChange}/>
                                </ol>
                            </div>
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                <section className="content">
                
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Name</th>
                                <th scope="col">Date</th>
                                <th scope="col">Fee's</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                                filteredPatients.map((patient,index) => (
                                    <tr key={patient._id}>
                                        <td>#</td>
                                        <td>{patient.patient_info.name}</td>
                                        <td>{formatter.format(Date.parse(patient.createdAt))}</td>
                                        <td>{patient.fee}</td>
                                        <td>
                                        <Switch 
                                            checked={patient.is_paid}  
                                            onChange={()=>handleChange(index, patient._id)}
                                        />
                                    
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
            </div>
            <Footer />

        </div>
    );
}


export default DailyPatient;