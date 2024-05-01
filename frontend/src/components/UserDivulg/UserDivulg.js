import React from 'react'
import { useEffect, useContext } from 'react'
import api from '../../services/api'
import './UserDivulg.css'
import { Context } from '../../Context/Context';
import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';

//var user
const URLImg = "https://festupload.s3.amazonaws.com/";

export default function UserDivulg() {
    const [venda, setVenda] = useState()
    const [vendaVazia, setVendaVazia] = useState(true)
    const [doacao, setDoacao] = useState()
    const [doacaoVazia, setDoacaoVazia] = useState(true)
    const [aluguel, setAluguel] = useState()
    const [aluguelVazia, setAluguelVazia] = useState(true)
    const [compartilhar, setCompartilhar] = useState()
    const [compartilharVazia, setCompartilharVazia] = useState(true)
    const {user} = useContext(Context);
    const carrocelDivulg = useRef(null)
    const carrocelAluguel = useRef(null)
    const carrocelDoacao = useRef(null)
    const carrocelVenda = useRef(null)
    
    useEffect(()=>{
        
        const GetAll = async ()=>{
            try{
                const vendas = await api.post("/produto/search/meu/id", {userId: user._id,})
                const doacoes = await api.post("/desapego/search/meu/id", {userId: user._id,})
                const Alugueis = await api.post("/aluguel/search/meu/id", {userId: user._id,})
                const compartilhamentos = await api.post("/compartilhar/search/meu/id", {userId: user._id,})
                setVenda(vendas.data)
                console.log(compartilhamentos.data.length)
                if(vendas.data.length > 2){
                    setVendaVazia(false)
                }
                setDoacao(doacoes.data)
                if(doacoes.data.length > 2){
                    setDoacaoVazia(false)
                }
                setAluguel(Alugueis.data)
                if(Alugueis.data.length > 2){
                    setAluguelVazia(false)
                }
                setCompartilhar(compartilhamentos.data)
                if(compartilhamentos.data.length > 2){
                    setCompartilharVazia(false)
                }
            }catch(err){
                alert("Erro ao conectar-se oa Servidor!")
            }
        }
        GetAll()
    }, [user._id])

    const Left = (e)=>{
        e.preventDefault()
        carrocelDivulg.current.scrollLeft -= carrocelDivulg.current.offsetWidth
    }
    const Right = (e)=>{
        e.preventDefault()
        carrocelDivulg.current.scrollLeft += carrocelDivulg.current.offsetWidth
    }
    const LeftVenda = (e)=>{
        e.preventDefault()
        carrocelVenda.current.scrollLeft -= carrocelVenda.current.offsetWidth
    }
    const RightVenda = (e)=>{
        e.preventDefault()
        carrocelVenda.current.scrollLeft += carrocelVenda.current.offsetWidth
    }
    const LeftDoacao = (e)=>{
        e.preventDefault()
        carrocelDoacao.current.scrollLeft -= carrocelDoacao.current.offsetWidth
    }
    const RightDoacao = (e)=>{
        e.preventDefault()
        carrocelDoacao.current.scrollLeft += carrocelDoacao.current.offsetWidth
    }
    const LeftAluguel = (e)=>{
        e.preventDefault()
        carrocelAluguel.current.scrollLeft -= carrocelAluguel.current.offsetWidth
    }
    const RightAluguel = (e)=>{
        e.preventDefault()
        carrocelAluguel.current.scrollLeft += carrocelAluguel.current.offsetWidth
    }
  return (
    <section className='fullContenUser'>
    <h4 className="userInfo">Minhas divulgações...</h4>
    <div className="vendaDivulgacoes">
        <i className="vendaI">Venda...</i>
        <div className="compartilharDiv" ref={carrocelVenda}>
        {venda?.map((post)=>(
            <Link className="titleColor" to={`/post/${post?._id}`} key={post._id}>
                {/* onClick={() => history.push(`/post/${post?.id}`, post)}  key={post?.photo} */}
            <div className="Produto" key={post?.photo}>
                <div className='imgProduto' id='Produto'>
                    <img className='imagemCard' src={URLImg+post?.photo} alt=' '/>
                </div>
                <div className='nomePreco'>
                    <h3 className='valorNome'>{post?.title}</h3>
                    <h3 className='valorNome'>R$ {post?.preco},00</h3>
                </div>
            </div>
            </Link>
        ))}
        </div>
        {!vendaVazia && (
            <div className='buttomGrupe'>
                <buttom onClick={LeftVenda} className='buttomLeft margnLeft'>
                    <i class="fa-solid fa-circle-chevron-left widthIconButtom"></i>
                </buttom>
                <buttom onClick={RightVenda} className='buttomLeft marginRight'>
                    <i class="fa-solid fa-circle-chevron-right widthIconButtom"></i>  
                </buttom>
            </div>
        )}
    </div>
    <div className="doacaoDivulgacoes">
        <i className="doacoaI">Doação...</i>
        <div className="compartilharDiv" ref={carrocelDoacao}>
        {doacao?.map((post)=>(
            <Link className="titleColor" to={`/doacao/${post?._id}`} key={post._id}>
                {/* onClick={() => history.push(`/post/${post?.id}`, post)}  key={post?.photo} */}
            <div className="Produto" key={post?.photo}>
                <div className='imgProduto' id='Produto'>
                    <img className='imagemCard' src={URLImg+post?.photo} alt=' '/>
                </div>
                <div className='nomePreco'>
                    <h3 className='valorNome'>{post?.title}</h3>
                    <h3 className='valorNome'>R$ {post?.preco},00</h3>
                </div>
            </div>
            </Link>
        ))}
        </div>
        {!doacaoVazia && (
            <div className='buttomGrupe'>
                <buttom onClick={LeftDoacao} className='buttomLeft margnLeft'>
                    <i class="fa-solid fa-circle-chevron-left widthIconButtom"></i>
                </buttom>
                <buttom onClick={RightDoacao} className='buttomLeft marginRight'>
                    <i class="fa-solid fa-circle-chevron-right widthIconButtom"></i>  
                </buttom>
            </div>
        )}
    </div>
    <div className="aluguelDivulgacoes">
        <i className="aluguelI">Aluguel...</i>
        <div className="compartilharDiv" ref={carrocelAluguel}>
        {aluguel?.map((post)=>(
            <Link className="titleColor" to={`/habitacao/aluguel/${post?._id}`} key={post._id}>
                {/* onClick={() => history.push(`/post/${post?.id}`, post)}  key={post?.photo} */}
            <div className="Produto" key={post?.photo}>
                <div className='imgProduto' id='Produto'>
                    <img className='imagemCard' src={URLImg+post?.photo1} alt=' '/>
                </div>
                <div className='nomePreco'>
                    <h3 className='valorNome'>{post?.title}</h3>
                    <h3 className='valorNome'>R$ {post?.preco},00</h3>
                </div>
            </div>
            </Link>
        ))}
        </div>
        {!aluguelVazia && (
            <div className='buttomGrupe'>
                <buttom onClick={LeftAluguel} className='buttomLeft margnLeft'>
                    <i class="fa-solid fa-circle-chevron-left widthIconButtom"></i>
                </buttom>
                <buttom onClick={RightAluguel} className='buttomLeft marginRight'>
                    <i class="fa-solid fa-circle-chevron-right widthIconButtom"></i>  
                </buttom>
            </div>
        )}
    </div>
    <div className="compartilhamentoDivulgacoes">
        <i className="compartilharI">Compartilhamento...</i>
        <div className="compartilharDiv" ref={carrocelDivulg}>
        {compartilhar?.map((post)=>(
            <Link className="titleColor" to={`/habitacao/compartilhar/${post?._id}`} key={post._id}>
                {/* onClick={() => history.push(`/post/${post?.id}`, post)}  key={post?.photo} */}
            <div className="Produto" key={post?.photo}>
                <div className='imgProduto' id='Produto'>
                    <img className='imagemCard' src={URLImg+post?.photo1} alt=' '/>
                </div>
                <div className='nomePreco'>
                    <h3 className='valorNome'>{post?.title}</h3>
                    <h3 className='valorNome'>R$ {post?.preco},00</h3>
                </div>
            </div>
            </Link>
        ))}
        </div>
        {!compartilharVazia && (
            <div className='buttomGrupe'>
                <buttom onClick={Left} className='buttomLeft margnLeft'>
                    <i class="fa-solid fa-circle-chevron-left widthIconButtom"></i>
                </buttom>
                <buttom onClick={Right} className='buttomLeft marginRight'>
                    <i class="fa-solid fa-circle-chevron-right widthIconButtom"></i>  
                </buttom>
            </div>
        )}
    </div>
    </section>
  )
}
