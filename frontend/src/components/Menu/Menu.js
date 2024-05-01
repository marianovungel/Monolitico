import React from 'react'
import './menu.css'
import {useContext} from 'react'
import {Context} from '../../Context/Context'
import {Link} from 'react-router-dom'
// import Swal from 'sweetalert2';
import { Avatar, Chip } from '@mui/material'

export default function Menu() {

  const { user } = useContext(Context)


  // const Producao = ()=>{
  //   Swal.fire({
  //     title: 'Está em produção e será disponibilizada em breve!',
  //     showClass: {
  //       popup: 'animate__animated animate__fadeInDown'
  //     },
  //     hideClass: {
  //       popup: 'animate__animated animate__fadeOutUp'
  //     }
  //   })
  // }

  return (
    <div className="menu">
      <div className='logo'>
            <img className='imagemLogo' src="./image/preta.png" alt="logoUnilabtem" />
        </div>
      <nav className="navbar navbar-expand-lg navbar-light bg-blue blueHeader" id='navDesa'>
                <button className="navbar-toggler" id='iconMenuBut' type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
            <div className="container-fluid" id='contentMenuBox'>
                <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                <Link to='/doacao' className="nav-link active" aria-current="page" href="#">Doação</Link>
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <Link to='/' className="nav-link" href="#">Vida na Unilab</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/venda' className="nav-link" href="#">Venda</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/habitacao-aluguel' className="nav-link" href="#">Habitação</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/oportunidade' className="nav-link" href="#">Oportunidades</Link>
                    </li>
                    <li className="nav-item">
                    <Link to='/sobre' className="nav-link" href="#">Sobre</Link>
                    </li>
      
                </ul>
                </div>
            </div>
      </nav>

        <ul className='menuList'>
            <Link to='/' id='idManu'><li>Vida na Unilab</li></Link>
            <Link to='/doacao' id='idManu'><li>Doação</li></Link>
            <Link to='/venda' id='idManu'><li>Venda</li></Link>
            <Link to='/habitacao-aluguel' id='idManu'><li>Habitação</li></Link>
            <Link to='/oportunidade' id='idManu'>Oportunidades</Link>
            <Link to='/sobre' id='idManu'><li>Sobre</li></Link>
        </ul>
        <div className='fotoPerfil'>
          {/* <i className="fa-solid fa-user"></i> */}
              {user?.profilePic && (<Link to='/user' >
                  <Chip
                  id='colorandPoiter'
                    avatar={<Avatar alt="Natacha" src={user?.profilePic} />}
                    label={user?.username}
                    variant="outlined"
                  />
              </Link>
              )}
        </div>
    </div>
  )
}