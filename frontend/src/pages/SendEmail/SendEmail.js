import React from 'react'
import './SendEmail.css'
import { useState, useEffect} from 'react'
import api from '../../services/api'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function SendEmail() {

    function aleCod(max, min){
        return Math.floor(Math.random()*(max - min) + min)
    }

    const textinv = true;
    const [confirm, setConfirm] = useState(false)
    const [confDiferente, setConfDiferente] = useState(false)
    const [diferente, setDiferente] = useState(false)
    const [invalid, setInvalid] = useState(false)
    const [confirmf, setConfirmf] = useState(true)
    const [reset, setReset] = useState(false)
    const [email, setEmail] = useState("")
    const [pSenha, setPSenha] = useState("")
    const [sSenha, setSSenha] = useState("")
    const [user, setUser] = useState({})
    const [conf, setConf] = useState(4)
    const [newCod, setNewCod] = useState(aleCod(100000, 1000000))

    useEffect(()=>{
        setNewCod(aleCod(100000, 1000000));
    }, [])

    const enter = ()=>{
        setConfirm(false)
        setConfirmf(true)
        setReset(false)
    }

    const sendEmail = async (e) => {
        e.preventDefault()
        try{
            const inval = await api.post("/auth/router/usersearch", {
                to: email
            })
            if(inval.data === textinv){
                const codigoRequest = await api.post("/auth/router/sendemail", {
                    to: email,
                    codigo: newCod,
                    from:"unilabtem@gmail.com",
                })
                setUser(codigoRequest.data)
                setConfirm(true)
                setConfirmf(false)
                setReset(false)
            }else{
                setInvalid(true)
            }   
        }catch(err){
        }
    }

    const ConfEmail = async (e) => {
        e.preventDefault()
        try{
            const valores = parseInt(conf)
            if(newCod === valores){
                setReset(true)
                setConfirm(false)
                setConfirmf(false)
                setDiferente(false)
            }else{
                setDiferente(true)
            }
        }catch(err){
            alert(err)
        }
    }

    const ResetSenha = async (e)=>{
        e.preventDefault()
        if(pSenha === sSenha){
            setConfDiferente(false)
            try{
                await api.put(`/users/${user._id}`, {
                    password: pSenha,
                    userId: user._id
                })
                Swal.fire({
                    position: 'top-center',
                    icon: 'success',
                    title: 'Senha recuperada com sucesso!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  window.location.replace("/");
            }catch(err){
                alert(err)
            }
        }else{
            setConfDiferente(true)
        }
    }
    
  return (
    <div className='sendEmail'>
        {confirmf && (
        <form className='enterEmail' onSubmit={sendEmail}>
            <img src='./image/preta.png' alt='' className='imgenterEmail'/>
            <h4 className='h4enterEmail'>Recuperar Senha...</h4>
            <input type='email' className='inputEnterEmail' placeholder='Digite seu email...' minLength="9" onChange={(e)=> setEmail(e.target.value)} required />
            <div className='buttonsEnterEmail'>
            <Link to='/login' className='cancelEnterEmail cancelColor'><i>Cancelar</i></Link>
                <button className='cancelEnterEmail receberColor' type='submit'>Receber Código</button>
            </div>
            {invalid && <i className='cod'>Não existe usuário cadastrado com este email!</i>}
        </form>
        )}
        {confirm && (
            <form className='enterEmailConfirm' onSubmit={ConfEmail}>
                <img src='./image/preta.png' alt='' className='imgenterEmail'/>
                <h4 className='h4enterEmail'>Recuperar Senha...</h4>
                <p className='penterEmail'>Acabamos de enviar o código de verificação no email: {email} </p>
                <input type='number' className='inputEnterEmail' placeholder='Digite o codigo enviado...' minLength="6" onChange={(e)=> setConf(e.target.value)} required />
                <div className='buttonsEnterEmailSecund'>
                    <div className='vidSeparadora'>
                        <button className='cancelEnterEmail cancelColor canc' onClick={enter}>Cancelar</button>
                        <button className='cancelEnterEmail receberReSend canc' onClick={sendEmail}>Reenviar</button>
                    </div>
                    <button className='cancelEnterEmail receberColor cancBlue' type='submit'>Confirmar</button>
                </div>
                {diferente && <i className='cod'>Código inválido!</i>}
            </form>
        )}
        {reset && (
            <form className='enterEmailInput' onSubmit={ResetSenha}>
                <img src='./image/preta.png' alt='' className='imgenterEmail'/>
                <h4 className='h4enterEmail'>Recuperar Senha...</h4>
                <p className='penterEmail'>Acabamos de efetuar o enviar um Email com o Código de confirmação no email: </p>
                <input type='password' className='inputEnterEmail' placeholder='Nova senha...' minLength="6" onChange={(e)=> setPSenha(e.target.value)} required />
                <input type='password' className='inputEnterEmail' placeholder='Confirmar senha...' minLength="6" onChange={(e)=> setSSenha(e.target.value)} required />
                <div className='buttonsEnterEmail'>
                    <Link to='/login' className='cancelarButt'>
                        <button className='cancelEnterEmail cancelColor pixValor' >Cancelar</button>
                    </Link>
                    <button className='cancelEnterEmail receberColor cancelarButt' type='submit'>Salvar</button>
                </div>
                {confDiferente && <i className='cod'>Confirme corretamente a senha!</i>}
            </form>
        )}
    </div>
  )
}
