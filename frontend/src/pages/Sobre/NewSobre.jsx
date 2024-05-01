import React from 'react'
import './NewSobre.css'
import { Link } from 'react-router-dom'
import {useContext} from 'react'
import {Context} from '../../Context/Context'
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer'

export default function NewSobre() {

    const { user } = useContext(Context)

    const SabiFunction  = ()=>{
        window.open('http://lattes.cnpq.br/2818665148998081')
    }
    const TalesFunction  = ()=>{
        window.open('http://lattes.cnpq.br/3410512550905802')
    }
    const MarianoFunction  = ()=>{
        window.open('http://lattes.cnpq.br/0916995612340632')
    }

  return (
    <div className='desapego'>
        <div className='OI' >
            <Menu />
        </div>
        <div className='menuBootstrap' >
        <nav className="navbar navbar-expand-lg navbar-light  menuBootstrap">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
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
                {user?.profilePic && (<li className="nav-item">
                    <Link className="nav-link text-light" to="/user">
                        {user.profilePic ? (<img src={user.profilePic} alt="" className='imgMenuHumburguer' />):
                        (<i>Usuário</i>)}
                    </Link>
                </li>
                )}
            </ul>
            </div>
        </div>
        </nav>
        </div>
        <div className='vidaContent'>
            <div className="servicess">

                <section className='sectionService'>
                    <div className="titleNewSobre">
                        <h3 className="titleSobreText">
                            Sobre...
                        </h3>
                    </div>
                    <div className="paragrafoDesc">
                        <p className="descP">
                            UnilabTem é uma iniciativa voluntária, solidária e
                            colaborativa que visa oferecer à comunidade interna e
                            externa uma plataforma digital de
                            integração de vários serviços tais como: pedido de ajuda, doação, feira de escambo
                            online, vendas e compras entre os pequenos empreendedores e consumidores de produtos
                            e serviços entregues e realizados em domicílio, 
                            oportunidades na Unilab (bolsa, estágio, emprego etc.), 
                            além disso é possível divulgar casa em aluguel e em Compartilhamento.
                        </p>
                    </div>
                    <h3 className='participantesTitleNew'>Participantes</h3>
                    <div className="userNewSobre">
                        <img src="https://sig.unilab.edu.br/shared/verFoto?idFoto=494816&key=c7bc69afa99a94c1404d79d7bded526d" alt="" className="imagemNewSobre" />
                        <div className="descNewSobre">
                            <i className="cargoNewSobre">Cordenador</i>
                            <b className="nameNewSobre">Prof.Dr. Sabi Yari Moïse Bandiri</b>
                            <i className="liteNewSobre" onClick={SabiFunction}>http://lattes.cnpq.br/2818665148998081</i>
                        </div>
                    </div>
                    <div className="userNewSobre">
                        <img src="https://sig.unilab.edu.br/shared/verFoto?idFoto=643363&key=846b8cc5a7457f43ef9bbc9380a869e6" alt="" className="imagemNewSobre" />
                        <div className="descNewSobre">
                        <i className="cargoNewSobre">Vice-Coordenador</i>
                            <b className="nameNewSobre">Prof.Dr. Tales Paiva Nogueira</b>
                            <i className="liteNewSobre" onClick={TalesFunction}>http://lattes.cnpq.br/3410512550905802</i>
                        </div>
                    </div>
                    <div className="userNewSobre">
                        <img src="./image/mariano.jpg" alt="" className="imagemNewSobre" />
                        <div className="descNewSobre">
                            <i className="cargoNewSobre">Bolsista</i>
                            <b className="nameNewSobre">Mariano António Vunge</b>
                            <i className="formacaoNewSobre">Graduando</i>
                            <i className="liteNewSobre" onClick={MarianoFunction}>http://lattes.cnpq.br/0916995612340632</i>
                        </div>
                    </div>
                    <div className="userNewSobre">
                        <img src="./image/marcos.png" alt="" className="imagemNewSobre" />
                        <div className="descNewSobre">
                            <i className="cargoNewSobre">Bolsista Voluntário</i>
                            <b className="nameNewSobre">Marcos Domingos Simão Kiacola</b>
                            <i className="formacaoNewSobre">Graduando</i>
                            <i className="liteNewSobre"></i>
                        </div>
                    </div>
                    <div className="userNewSobre">
                        <img src="./image/sumae.jpeg" alt="" className="imagemNewSobre" />
                        <div className="descNewSobre">
                            <i className="cargoNewSobre">Bolsista Voluntário</i>
                            <b className="nameNewSobre">Sumaé Embaló</b>
                            <i className="formacaoNewSobre">Graduando</i>
                            <i className="liteNewSobre"></i>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <div className='FooterContainerFix'>
            <Footer />
        </div>
    </div>
  )
}
