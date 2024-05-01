import React from 'react'
import api from '../../services/api'
import { useEffect, useState } from 'react'
// import { useHistory } from 'react-router-dom';
import './Produto.css'
import { Link } from 'react-router-dom';

export default function Produto() {
  // const history = useHistory();

    //passando dados via location
    

  const [produtoVenda, setProdutoVenda] = useState([])
  const [vazio, setVazio] = useState(false)
  const [carregar, setCarregar] = useState([])
  const [title, setTitle] = useState("")

  const getProdutoVenda = async ()=>{
    
    setCarregar(true)
    try{
      const response = await api.get('/produto');
      const res = response.data;
      console.log(response)
      if(res.error){
        alert(res.message);
        return false;
      }
      if(response.data.length === 0){
        setVazio(true)
        setCarregar(false)
      }

      setProdutoVenda(res);
      setVazio(false)
      setCarregar(false)

    }catch(err){
      alert(err.message);
    }
  }

  useEffect(() => {
    getProdutoVenda();
  }, [])


  const submitSearch = async (e) =>{
    e.preventDefault()
    const results = await api.post("/produto/search", {title: title.toLowerCase()})
    if(results.data.length === 0){
      setVazio(true)
      setCarregar(false)
      setProdutoVenda([])
    }else{
      setProdutoVenda(results.data)
      setVazio(false)
      setCarregar(false)
    }
  }


  return (
    <div className='fullFullCardf'>
        <form onSubmit={submitSearch} className='searchform'>
          <input className='searchformInportt' type="search" placeholder='Pesquise...' onChange={e => setTitle(e.target.value)} />
          <button type="submit" className='searchformButton'><i className="fa-solid fa-magnifying-glass colorSearch"></i></button>
        </form>
      {vazio && (<div className='Encontrar'><h5>Nenhum Produto encontrado ...</h5></div>)}
      {carregar && (<div className='Encontrar'><h5>Carregando ...</h5></div>)}

    <div className='fullFullCard'>
      <div className='centerCardFFF'>
        {produtoVenda?.map((p)=>(
          <div className='cardAluguelnewVendaNova' key={p?._id}>
              <div className="imagemAluguelSectionNeww">
              <img className="imgAluguelCArdAddw" src={p.photo} alt="" />
              </div>
              <div className="descritionAluguelSetionw">
                  {/* <i className="aluguelI">{p.cep.localidade}</i> */}
                  <h3 className="hpraceAluguel">{p.title}</h3>
                  <div className='CardVendaNewWay'>
                    <p className="pdescriçãoAluguel">R${p.preco},00</p>
                    <i className='AvendaColor'>A venda</i>
                  </div>
              </div>
              <div className="buttonAluguelSectionw">
              <Link to={`/post/${p?._id}`}><button className="buttonAluguelInfoCardw">Info...</button></Link>
              </div>
          </div>
        ))}

      </div>
    
    </div>
    </div>
  );
}