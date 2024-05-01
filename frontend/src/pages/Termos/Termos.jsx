import React from 'react'
import './Termos.css'

export default function Termos() {
    const voltar =()=>{
        window.location.replace("/registrar");
    }
  return (
    <div className='termosContent'>
        <div className="termoSection">
            <h4 className="termoTitle">Termos e Políticas de Uso!</h4>
            <p className="termoParagrafo">
                -Proibido a divulgação de produtos nocivos; <br/>
                -Proibido a venda de armamento de guerra na plataforma; <br/>
                -Proibido venda de Pessoas; <br/>
                -Proibido Venda de qualquer natureza de praseres Sexuais; <br/>
                -Proibido a negociações de orgãos Humano; <br/>
                -Proibido a venda de drogas; <br/>
                -Proibido a divulgações de imagens impróprias; <br/>
                -Proibido a divulgações de textos imorais e ofencivos; <br/>
                -Proibido a fake news; <br/>
            </p>
            <b className="sancoes">
                Em cado de descumprimento dos itens acima, o usuário terá a sua conta banida na plataforma e correrá o risco de enfrentar um processo judicial formal.
            </b>
            <button className='voltar' onClick={voltar}>Voltar...</button>
        </div>
    </div>
  )
}
