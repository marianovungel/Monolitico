import React from 'react'
import './UserPage.css'
import { Link } from 'react-router-dom'
import Menu from '../../components/Menu/Menu'
// import HeaderUser from '../../components/HeaderUser/HeaderUser'
import UserDivulg from '../../components/UserDivulg/UserDivulg'
import UserSetting from '../../components/UserSetting/UserSetting'
import UserPerfil from '../../components/UserPerfil/UserPerfil'
import { useState } from 'react'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Context } from '../../Context/Context'

export default function UserPage() {
    //var
    const [showPerfil, setShowPerfil] = useState(true)
    const [showPost, setShowPost] = useState(false)
    const [showset, setShowset] = useState(false)

    useEffect(()=>{
        setShowPerfil(true)
        setShowPost(false)
        setShowset(false)
    }, [])

    const SetPerfil = ()=>{
        setShowPerfil(true)
        setShowPost(false)
        setShowset(false)
    }
    const SetPost = ()=>{
        setShowPerfil(false)
        setShowPost(true)
        setShowset(false)
    }
    const SetSet = ()=>{
        setShowPerfil(false)
        setShowPost(false)
        setShowset(true)
    }

    const { dispatch, user } = useContext(Context)

    const hendSair = ()=>{
        dispatch({type: "LOGOUT"})
    }

  return (
    <div className='UserPage'>
        <div className='OI' >
            <Menu />
        </div>
        <div className='menuBootstrap' >
        <nav className="navbar navbar-expand-lg navbar-light  menuBootstrap">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/venda">
                <div className='logoBootstrap'>
                    <img className='imagemLogo' src="./image/preta.png" alt="logoUnilabtem" />
                </div>
            </Link>
            <button className="bg-light braca" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon bg-light braca"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className="nav-link active text-light" aria-current="page" to="/">Vida na Unilab</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link active text-light" aria-current="page" to="/doacao">Doação</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link text-light" to="/venda">Venda</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link text-light" to="/sobre">Sobre</Link>
                </li>
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-light" to="" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Habitação
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item" to="/habitacao-aluguel">Aluguel</Link></li>
                    <li><Link className="dropdown-item" to="/habitacao-compartilhar">Compartilhamento</Link></li>
                    <li><Link className="dropdown-item" to="/aluguel-cadastrando">Divulgar Aluguel</Link></li>
                </ul>
                </li>
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle text-light" to="" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.profilePic ? (<img src={user.profilePic} alt="" className='imgMenuHumburguer' />):
                    (<i>Usuário</i>)}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item" to='/user' onClick={SetPerfil}>Perfil</Link></li>
                    <li><Link className="dropdown-item" to='/user' onClick={SetPost}>Minhas Divulgações</Link></li>
                    <li><Link className="dropdown-item" to='/user' onClick={SetSet}>Editar Usuário</Link></li>
                    <li><Link className="dropdown-item" to='/' onClick={hendSair}>Logout...</Link></li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        </div>
        <header className='headerAluguel topMargin'>
            <div className='flexHeaderAluguel'>
                <div className='colorHeader'>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                        <Link className="nav-item nav-link active" to='/user' onClick={SetPerfil}>Perfil <span className="sr-only">(current)</span></Link>
                        <Link className="nav-item nav-link active" to='/user' onClick={SetPost}>Minhas Divulgações</Link>
                        <Link className="nav-item nav-link active" to='/user' onClick={SetSet}>Editar Usuário</Link>
                        <Link className="nav-item nav-link active" to='/' onClick={hendSair} >Logout...</Link>
                        </div>
                    </div>
                    </nav>
                </div>
            </div>
        </header>
        {showPerfil && (<UserPerfil />)}
        {showPost && (<UserDivulg />)}
        {showset && (<UserSetting />)}
    </div>
  )
}
