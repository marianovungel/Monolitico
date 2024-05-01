import React from 'react'
import {Link} from 'react-router-dom'
import './HeaderCompart.css'

export default function HeaderCompart() {
  return (
    <div className='colorHeader'>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
            <Link className="nav-item nav-link active" to='/habitacao-aluguel'>Aluguel <span className="sr-only">(current)</span></Link>
            <Link className="nav-item nav-link" to='/habitacao-compartilhar'>Compartilhamento</Link>
            <Link className="nav-item nav-link" to='/compartilhar-cadastrar'>Divulgar casa...</Link>
            </div>
        </div>
        </nav>
    </div>
  )
}
