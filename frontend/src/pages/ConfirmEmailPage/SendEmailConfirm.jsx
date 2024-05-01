import React from 'react'
import "./ConfirmEmailPage.css"
import { Link } from 'react-router-dom'

export default function SendEmailConfirm() {
  return (
    <div className='ConfirmContent'>
        <div className="headerConfirm">
            <p className="headerConfirmText">E-mail de Confirmação!</p>
        </div>
        <div className="bodyConfirm">
            <p className="textConfirm">
                Foi enviado uma mensagem de confirmação no seu E-mail. 
                Verifique a caixa postal do seu E-mail para poder finalizar o seu cadastro.
            </p>
        </div>
        <div className="submitConfirm">
            <button className="buttonnComp"><Link to="/" className='linkPaginaDeLogin'>Página de Login</Link></button>
        </div>
    </div>
  )
}
