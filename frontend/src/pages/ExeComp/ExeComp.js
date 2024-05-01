import React from 'react'
import Menu from '../../components/Menu/Menu'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import api from '../../services/api'
import HeaderCompart from '../../components/HeaderCompart/HeaderCompart'

export default function ExeComp() {

    const [compartilhar, setCompartilhamento] = useState([]);;
    useEffect(()=>{
        const FetchDesapego = async () => {
            try{
                const res = await api.get("/compartilhar")
                setCompartilhamento(res.data);
            }catch(err){
                console.log(err)
            }
        }
    
        FetchDesapego();
    }, [])

    console.log(compartilhar)
    const URLImg = "https://festupload.s3.amazonaws.com/";

  return (
    <div>
        <div className='fullContentAluguel'>
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
                <Link className="nav-link active" aria-current="page" to="/desapego">Doação</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/venda">Venda</Link>
                </li>
                <li className="nav-item">
                <Link className="nav-link" to="/sobre">Sobre</Link>
                </li>
                <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Habitação
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <li><Link className="dropdown-item" to="/exe">Aluguel</Link></li>
                    <li><Link className="dropdown-item" to="/habitacao-compartilhar">Compartilhamento</Link></li>
                    <li><Link className="dropdown-item" to="/aluguel-cadastrar">Divulgar Aluguel</Link></li>
                </ul>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        </div>
        <header className='headerAluguel'>
            <div className='flexHeaderAluguel'>
            <HeaderCompart />
            </div>
        </header>
        <div className='contentSideBar'>
            {compartilhar?.map((p)=>(
                <div className='cardAluguel' key={p?._id}>
                <img className='imgAluguelCard' src={URLImg + p.photo1} alt='' />
                <div className='descPlaceAluguel'>
                    <div className='ajustPositionDesc'>
                        <p><i>Categoria</i>: <b>{p.categories}</b></p>
                        <p><i>Cidade</i>: <b>{p.cidade}</b></p>
                        <p><i>Preço</i>: <b>R${p.preco}</b></p>
                        <p><i>Status</i>: <b>Desponível</b></p>
                    </div>
                    <Link to={`/habitacao/compartilhar/${p?._id}`}><button className='buttonHeaderAluguela'>Mais informações</button></Link>
                </div>
            </div>
            ))}
    </div>
    </div>
    </div>
  )
}
