import React from 'react'
import './Visto.css'
import { Link } from 'react-router-dom'
import Menu from '../../components/Menu/Menu';
import {useContext} from 'react'
import {Context} from '../../Context/Context'
import { useEffect } from 'react'
import { useState } from 'react';
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
const URLImg = "https://festupload.s3.amazonaws.com/";

export default function Visto() {

    const { user } = useContext(Context)

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [zoom, setZoom] = useState(0);

    const add = ()=>{
        if(zoom !== 200){
            setZoom(zoom+50)
        }
    }
    const menos = ()=>{
        if(500+zoom !== 350){
            setZoom(zoom-50)
        }
    }

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
        setPageNumber(1)
    }

    useEffect(()=>{
        setPageNumber(1)
    }, [])

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
                <li className="nav-item">
                    <Link className="nav-link text-light" to="/user">
                        {user.profilePic ? (<img src={URLImg+user.profilePic} alt="" className='imgMenuHumburguer' />):
                        (<i>Usuário</i>)}
                    </Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        </div>
        <div className='vidaContent'>
            <div className="services" id='marginTopVisto'>
                <h4 className="serviceTitleVida addMarginVisto">Renovação de Visto</h4>
                <section className='sectionService'>
                    <div className='center'>
                        <Document file="/pdfFile.pdf" onLoadSuccess={onDocumentLoadSuccess}>
                            <Page height={500+zoom} pageNumber={pageNumber} />
                            {/* {URL.createObjectURL(pageNumber) numPages={numPages}} */}
                        </Document>
                        <p>
                            <div className="buttomzoom">
                                <i className="marginToo plasZoom" onClick={menos}>-</i>
                                <i className='valorAtual'>{50+(zoom/4)}%</i>
                                <i className="marginToo menosZoom" onClick={add}>+</i>
                            </div>
                            <div className="buttomzoom">
                                Page {pageNumber} of {numPages}
                            </div>
                        </p>
                    </div>
                </section>
            </div>
        </div>
    </div>
  )
}
