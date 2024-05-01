import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'


export default function Footer() {

  return (
    <div className="containerfooter">
        <div className="footer_col">
            <h2>UNILABTEM</h2>
            <p className="footer_para">
                Vem juntar-se à comunidade Unilabtem
                e terá acesso a produtos e oportunidades
                que são divulgados aqui, Tudo mais perto e Tudo mais fácil.
                UnilabTem, Tem de Tudo!
            </p>
        </div>
        <div className="footer_col">
            <h3 className="text_office">
                Office
                <div className="underline"><span></span></div>
            </h3>
            <ul className='ulMenuFooter'>
                <p className='linkItemMenuFooter'>Redenção-CE</p>
                <p className='linkItemMenuFooter'>@unilatem</p>
                <p className='linkItemMenuFooter'>unilabtem@gmail.com</p>
                <p className='linkItemMenuFooter'>Engenharia na sociedade</p>
                <p className='linkItemMenuFooter'>+55 85 000 0000</p>
            </ul>
        </div>
        <div className="footer_col">
            <h3>
                Menu
                <div className="underline"><span></span></div>
            </h3>
            <ul className='ulMenuFooter'>
                <Link className='linkItemMenuFooter' to="/">Home</Link >
                <Link className='linkItemMenuFooter' to="/doacao">Doação</Link >
                <Link className='linkItemMenuFooter' to="/venda">Venda</Link>
                <Link className='linkItemMenuFooter' to="/habitacao-aluguel">Aluguel</Link>
                <Link className='linkItemMenuFooter' to="/habitacao-compartilhar">Compartilhamento</Link>
                <Link className='linkItemMenuFooter' to="/sobre">Sobre</Link>
            </ul>
        </div>
        <div className="footer_col">
            <h3>
                Newsletter
                <div className="underline"><span></span></div>
            </h3>
            <form action="">
                <i className="fa_solid fa_envelope"></i>
                <input type="text" placeholder="Enter Company Email" />
                <i className="fa-solid fa-arrow-right"></i>
            </form>
            <div className="social_icons">
                <i className="fa-brands fa-facebook"></i>
                <i className="fa-brands fa-instagram"></i>
                <i className="fa-brands fa-youtube"></i>
                <i className="fa-brands fa-google-plus"></i>
            </div>
        </div>
    </div>
  )}
