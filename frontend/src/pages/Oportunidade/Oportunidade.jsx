import React from 'react'
import './Oportunidade.css'
import { Link } from 'react-router-dom'
import {useContext} from 'react'
import {Context} from '../../Context/Context'
import Menu from '../../components/Menu/Menu';
import Footer from '../../components/Footer/Footer'

export default function Oportunidade() {

    const { user } = useContext(Context)

    

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
                        {user?.profilePic ? (<img src={user?.profilePic} alt="" className='imgMenuHumburguer' />):
                        (<i>Usuário</i>)}
                    </Link>
                </li>
                )}
            </ul>
            </div>
        </div>
        </nav>
        </div>
        <div className='Oportunidade'>
            {/* <div className="imgContentOpor">
                <div className="containerOport"></div>
            </div> */}
            <div className="fullnewHeaderOpor">
                <div className="healfOpor">
                    <div className="leftTextOpor">Upcoming Events</div>
                    <div className="rightIconOpor">
                        <i className="fa-solid fa-newspaper"></i>
                        <i className="fa-solid fa-folder-open"></i>
                    </div>
                </div>
            </div>
            <div className="fullnewHeaderOpor">
                <div className="healfPostOpor">
                    <div className="dataOport">
                        <div className='MesOport'>JUN</div>
                        <div className='MesTracoOport'></div>
                        <div className='MesOport'>23</div>
                    </div>
                    <div className="imgOportPodt">
                        <img src="./image/uni.png" alt="" className='ImgOportPostItem' />
                    </div>
                    <div className="textOpotPost">
                        <div className="titleOportCard">Título Principal</div>
                        <div className="subOportCard">Subtitulo ou data e horário 10:00 até 15:00</div>
                        <div className="paragrafOportCard">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sint explicabo laudantium repudiandae recusandae, dignissimos aliquam, sed optio alias quidem autem! Pariatur laborum sed non ipsum expedita dolorem, distinctio voluptatem!</div>
                        <div className="tracoOport"></div>
                        <div className="linkOport">Acessar o Link <i class="fa-solid fa-arrow-right"></i></div>
                    </div>
                </div>
                <div className="healfPostOpor">
                    <div className="dataOport">
                        <div className='MesOport'>JUN</div>
                        <div className='MesTracoOport'></div>
                        <div className='MesOport'>23</div>
                    </div>
                    <div className="imgOportPodt">
                        <img src="./image/uni.png" alt="" className='ImgOportPostItem' />
                    </div>
                    <div className="textOpotPost">
                        <div className="titleOportCard">Título Principal</div>
                        <div className="subOportCard">Subtitulo ou data e horário 10:00 até 15:00</div>
                        <div className="paragrafOportCard">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sint explicabo laudantium repudiandae recusandae, dignissimos aliquam, sed optio alias quidem autem! Pariatur laborum sed non ipsum expedita dolorem, distinctio voluptatem!</div>
                        <div className="tracoOport"></div>
                        <div className="linkOport">Acessar o Link <i class="fa-solid fa-arrow-right"></i></div>
                    </div>
                </div>
                <div className="healfPostOpor">
                    <div className="dataOport">
                        <div className='MesOport'>JUN</div>
                        <div className='MesTracoOport'></div>
                        <div className='MesOport'>23</div>
                    </div>
                    <div className="imgOportPodt">
                        <img src="./image/uni.png" alt="" className='ImgOportPostItem' />
                    </div>
                    <div className="textOpotPost">
                        <div className="titleOportCard">Título Principal</div>
                        <div className="subOportCard">Subtitulo ou data e horário 10:00 até 15:00</div>
                        <div className="paragrafOportCard">Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus sint explicabo laudantium repudiandae recusandae, dignissimos aliquam, sed optio alias quidem autem! Pariatur laborum sed non ipsum expedita dolorem, distinctio voluptatem!</div>
                        <div className="tracoOport"></div>
                        <div className="linkOport">Acessar o Link <i class="fa-solid fa-arrow-right"></i></div>
                    </div>
                </div>
            </div>
        </div>
        <div className='FooterContainerFix'>
            <Footer />
        </div>
    </div>
  )
}
