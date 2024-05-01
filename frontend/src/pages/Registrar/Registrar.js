import React from 'react'
import './Registrar.css'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import api from '../../services/api.js'
import Swal from 'sweetalert2'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

export default function Registrar() {

    function aleCod(max, min){
        return Math.floor(Math.random()*(max - min) + min)
    }

    const [newCod, setNewCod] = useState(aleCod(100000, 1000000))
    const [username, setUsername] = useState("")
    const [whatsapp, setWhatsapp] = useState("")
    const [email, setEmail] = useState("")
    const [forca, setForca] = useState(0)
    const [password, setPassword] = useState("")
    const [classificacao, setClassificacao] = useState("")
    const [error, seterror] = useState(false)
    const [creden, setCreden] = useState(false)
    const [err, setErr] = useState(false)
    const [confirmPassword, setConfirmPassword] = useState("")
    const [ale, setAle] = useState(false)
    const [aleEmail, setAleEmail] = useState(false)
    const [celular, setCelular] = useState(false)
    const [girar, setGirar] = useState(false)
    var checkValid = false;
    var checkValidEmail = false;
    var checkValidCelular = false;

    useEffect(()=>{
        setAle(false)
        setAleEmail(false)
        setGirar(false)
        setNewCod(aleCod(100000, 1000000));
    }, [])

    const fastConfirmTermo = async (e)=>{
        e.preventDefault();
        if(classificacao==="Forte" || classificacao==="Excelente"){
            if(confirmPassword===password && celular === false){
                if(ale === false || aleEmail === false){
                    const { value: accept } = await Swal.fire({
                    title: 'Termos e Políticas de Uso',
                    input: 'checkbox',
                    inputValue: 1,
                    inputPlaceholder:
                        'Selecione a caixa para criar usuário!',
                    confirmButtonText:
                        'Continue <i class="fa fa-arrow-right"></i>',
                    inputValidator: (result) => {
                        return !result && 'É necessário selecionar para proceguir!'
                        
                    }
                    })
                    
                    if (accept) {
                    // Swal.fire('You agreed with T&C :)')
                    handleSubmit()
                    }
                }
            }
        }
        ////////////////////////////////
      }

    const chackUser = async (e)=>{
        setCreden(false)
        checkValid = false;
        try{
            const result = await api.post("/auth/router/checkuser", {
                username: username,
            })
            if(result.data){
                checkValid = true;
            }
            setAle(checkValid)
        }catch(err){
            checkValid = true;
            setAle(checkValid)
        }
    }
    const chackEmail = async (e)=>{
        setCreden(false)
        checkValidEmail = false;
        try{
            const resultados = await api.post("/auth/router/usersearch", {
                to: email,
            })
            if(resultados.data){
                checkValidEmail = true;
            }
            setAleEmail(checkValidEmail)
        }catch(err){
            checkValidEmail = true;
            setAleEmail(checkValidEmail)
        }
    }
    const chackZap = async (e)=>{
        setCreden(false)
        checkValidCelular = false;
        try{
            const resultados = await api.post("/auth/router/numbersearch", {
                whatsapp: whatsapp,
            })
            if(resultados.data){
                checkValidCelular = true;
            }
            setCelular(checkValidCelular)
        }catch(err){
            checkValidCelular = true;
            setCelular(checkValidCelular)
        }
    }

    function validarSenhaForca(){
        setCreden(false)
        var senha = password;
        setErr(false)
        setForca(0);
        
        if((senha.length >= 6)){
            setForca(forca+60);
        }
        if((senha.length >= 8)){
            setForca(79);
        }
        mostrarForca(forca);
    }
    function mostrarForca(forca){
        if(forca < 30 ){
            setClassificacao("Fraca")
        }else if((forca >= 30) && (forca < 50)){
            setClassificacao("Média")
        }else if((forca >= 50) && (forca < 70)){
            setClassificacao("Forte")
        }else if((forca >= 70) && (forca < 100)){
            setClassificacao("Excelente")
        }
    }


    const CheckSenhaIqual = ()=>{
        if(confirmPassword!==password){
            seterror(true)
        }else{
            seterror(false)
        }
    }
    const handleSubmit = async ()=>{
        setCreden(false)
        setGirar(true)
        if(classificacao==="Forte" || classificacao==="Excelente"){
            if(confirmPassword===password && celular === false){
                if(ale === false || aleEmail === false){
                    try{
                       
                                
                        await api.post("/auth/router/sendemailtoconfirm", {
                            to: email,
                            username: username,
                            whatsapp: whatsapp,
                            codigo: newCod,
                            password: password,
                            from:"unilabtem@gmail.com",
                            
                        })

                        setGirar(false)
                        // Swal.fire({
                        //     title: 'Foi enviado uma mensagem de confirmação no seu email!',
                        //     timer: 15000,
                        //     showClass: {
                        //       popup: 'animate__animated animate__fadeInDown'
                        //     },
                        //     hideClass: {
                        //       popup: 'animate__animated animate__fadeOutUp'
                        //     }
                        //   })


                        window.location.replace("/registrar/send-confirm-email-to-register-accont");
                    }catch(err){
                        setCreden(true)
                    }
                }else{
                    setCreden(true)
                }
            }else{
                seterror(true)
            }
        }else{
            setErr(true)
        }
    }  
    
  return (
    <div className="fullContentRegister2">
        <div className="logoAndText">
            <img src="./image/newLogo.png" alt="" className="imagemLogooi" />
            <p className="paragrafoLogo">
                Vem juntar-se à comunidade Unilabtem
                e terá acesso a produtos, e oportunidades
                 que são divulgados aqui, Tudo mais perto e Tudo mais fácil!
            </p>
            <p className="paragrafoLogo1">UNILABTEM, Tem de Tudo!</p>
        </div>
        <div className="sectionRegisterNew">
            <h1 className="bboRegister">Cadastrar-se</h1>
            <form className="formRegister" onSubmit={fastConfirmTermo}>
                <input type="text" className="fastInput in" placeholder="Usuário..." onChange={e=>setUsername(e.target.value)} onBlur={chackUser} required/>
                <input type="email" className="fastInput in" placeholder="E-mail..." onChange={e=>setEmail(e.target.value)} onBlur={chackEmail} required/>
                <div className='fastInputFone'>
                    <PhoneInput placeholder="newPhone" value={whatsapp} onChange={setWhatsapp} defaultCountry="BR" className="telMundo" onBlur={chackZap} />
                </div>
                <input type="password" className="fastInput in" placeholder="Senha..." minLength='4' onKeyUp={validarSenhaForca} onChange={e=>setPassword(e.target.value)} required/>
                <input type="password" className="fastInput in" placeholder="Confirmar a Senha..." onBlur={CheckSenhaIqual} onChange={e=>setConfirmPassword(e.target.value)} required/>
                
                {girar ? (
                  <button className='inputLogin entrarbutton'><i className="fa-solid fa-spinner girar"></i></button>
                  ):(
                    <button className="entrarbuttonRegister fastInput">Cadastrar-se</button>
                )}
                {error && <h3 className='checkuserRegisterAlert'>Confirme Corretamente a sua Senha!</h3>}
                {err && <h3 className='checkuserRegisterAlert'>Só é possível registrar com senha Forte ou Excelente</h3>}
                {classificacao==="Fraca" && <h3 className='checkuserRegisterAlert'>Senha: {classificacao}</h3>}
                {classificacao==="Média" && <h3 className='errRegister2'>Senha: {classificacao}</h3>}
                {classificacao==="Forte" && <h3 className='errRegister3'>Senha: {classificacao}</h3>}
                {classificacao==="Excelente" && <h3 className='errRegister4'>Senha: {classificacao}</h3>}
                {ale && <h3 className='checkuserRegisterAlert'>Já existe usuário registrado com este nome!</h3>}
                {aleEmail && <h3 className='checkuserRegisterAlert'>Já existe usuário registrado com este email!</h3>}
                {celular && <h3 className='checkuserRegisterAlert'>Já existe usuário registrado com este celular!</h3>}
                {creden && <h3 className='checkuserRegisterAlert'>Credências inválidas!</h3>}
                <div className="criarNovaContaButtonRegister">
                    <small className="criarConta"><Link to='/' id='colorLinkRegister'>Login</Link></small>
                    <small className="criarConta"><Link to='/registrar/termos-politicas' id='colorLinkServerRegister'>Termos e Políticas de Uso</Link></small>
                </div>
            </form>
        </div>
    </div>
  )
}