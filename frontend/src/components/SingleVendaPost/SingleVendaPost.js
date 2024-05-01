import React from 'react'
import './SingleVendaPost.css'

export default function SingleVendaPost() {
  return (
    <div className='fullContentSingleVendaPost'>
        <div className='conteinerSinglePostVendaSingleVendaPost'>
       
        <div className='fullContentModerador'>
          <div className='imgContent'>
            <p id='categoria'>Categoria: Venda</p>
            <div className='imgDivSingle'>
              <img src='https://www.ceara.gov.br/wp-content/uploads/2019/08/unnamed-2019-08-08T111036.603.png' id='photoVendaId' alt='#' />
            </div>
            
          </div>
          <div className='descContentMonitor'>
            <div>
            <div className='avaliacao'>
              <i className="fa-solid fa-star" id='estrela'></i>
              <i className="fa-solid fa-star" id='estrela'></i>
              <i className="fa-solid fa-star" id='estrela'></i>
              <i className="fa-solid fa-star" id='estrela'></i>
              <i className="fa-solid fa-star-half-stroke" id='estrela'></i>
               (Avaliações)
            </div>
            <div className='codigoItem'>
              <p>Cód. Item </p>
            </div>
            <h2>R$ </h2>
            <p>Vendedor: </p>
            <p>Descrição: </p>
            <div className='cartoes'>
            
            </div>
            </div>
          </div>
          
            <div className='butoomContent'>
                <div className='buttonZapDiv' ><button  className='buttonEditar' id='colorAprovado'>Aprovar <i class="fa-solid fa-thumbs-up"></i></button></div>
             
                <div></div>

                <div className='buttonZapDiv'><button  className='buttonDeletar' >Reprovar <i class="fa-solid fa-thumbs-down"></i></button></div>
            </div>
          <footer className=''></footer>
        </div>
    </div>
    </div>
  )
}
