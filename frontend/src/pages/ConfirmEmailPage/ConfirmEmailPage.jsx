import "./ConfirmEmailPage.css"
// import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import api from "../../services/api";
import Swal from "sweetalert2";

export default function ConfirmEmailPage() {
    const location = useLocation();

    const path = location.pathname.split("/")[2]
    const confirmEmail = async ()=>{
        try{
            const NewUser= await api.post("/auth/router/register", {path:path})
            console.log(NewUser)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuário criado com sucesso!',
                showConfirmButton: false,
                timer: 5000,
                timerProgressBar: true,
            })
            window.location.replace("/");
        }catch(err){

        }
    }

  return (
    <div className='ConfirmContent'>
        <div className="headerConfirm">
            <p className="headerConfirmText">Confirmação do E-mail</p>
        </div>
        <div className="bodyConfirm">
            <p className="textConfirm">
                Por questões de segurança dos nossos usuários, para criares a sua conta na plataforma UNILABTEM,
                é preciso confirmar o seu e-mail!
            </p>
        </div>
        <div className="submitConfirm">
            <button className="buttonnComp" onClick={confirmEmail}>Confirmar...</button>
        </div>
    </div>
  )
}
