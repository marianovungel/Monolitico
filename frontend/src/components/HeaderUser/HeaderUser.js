import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../../Context/Context'

export default function HeaderUser() {

  const { dispatch } = useContext(Context)

  const hendSair = ()=>{
    dispatch({type: "LOGOUT"})
  }

  return (
    <div className='colorHeader'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <Link className="nav-item nav-link active" to='/user'>Perfil <span className="sr-only">(current)</span></Link>
            <Link className="nav-item nav-link active" to='/user-divulgacoes'>Minhas Divulgações</Link>
            <Link className="nav-item nav-link active" to='/user'>Editar Usuário</Link>
            <Link className="nav-item nav-link active" to='/' onClick={hendSair} >Logout...</Link>
            </div>
        </div>
        </nav>
    </div>
  )
}
