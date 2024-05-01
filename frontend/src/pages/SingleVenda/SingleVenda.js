import React from 'react'
import Menu from '../../components/Menu/Menu'
import './SingleVenda.css'
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation} from 'react-router-dom';
// import { useLocation, useHistory} from 'react-router-dom';
import api from '../../services/api'
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer/Footer';
// import { Link } from 'react-router-dom';


export default function SingleVenda() {
  const location = useLocation();

  const path = location.pathname.split("/")[2]
  const [post, setPost] = useState({})
  const [title, setTitle ] = useState("")
  const [preco, setPreco ] = useState("")
  const [desc, setDesc ] = useState("")
  const [editar, setEditar ] = useState(false)
  const [showButtons, setShowButtons ] = useState(true)
  // const history = useHistory()
  
  
  useEffect(()=>{
    const getPost = async ()=>{
      const res = await api.get("/produto/"+path)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setPreco(res.data.preco)
    }
    getPost()
    setShowButtons(true)
  }, [path])

const {user} = useContext(Context);

const whatsappSend = () =>{
  const messageZap=`Olá ${post.username}. Gostaria de saber se o produto ${post.title} 
  que divulgou na plataforma UnilabTem no preço de R$${post.preco} 
  se ainda está a venda? 
  https://unilabtem.com.br/post/${path}`;

  var nu = post.userwhatsapp.replace(/-/g, '');
  var nua = nu.replace(/ /g, '');
  var nub = nua.replace(")", '');
  var nuc = nub.replace("(", '');
  var nud = parseInt(nuc);
  window.open(`http://wa.me/${nud}?text=${messageZap}`)
}
// const Zoom = () =>{
//   window.open(`${URLImg}${post.photo}`)
// }
const Home = () =>{
  // window.open("http://localhost:3000")
  window.location.replace("/venda");
}
const EditTrue = () =>{
  setEditar(true)
  setShowButtons(false)
}

const fastConfirmDelete = async ()=>{
  const { value: accept } = await Swal.fire({
    title: 'Deletar',
    input: 'checkbox',
    inputValue: 0,
    inputPlaceholder:
      'Selecione a caixa se desejas deletar!',
    confirmButtonText:
      'Continue <i class="fa fa-arrow-right"></i>',
    inputValidator: (result) => {
      return !result && 'É necessário selecionar a caixa para deletar!'
      
    }
  })
  
  if (accept) {
    // Swal.fire('You agreed with T&C :)')
    confirmDelete()
  }
}

const confirmDelete= async () => {
  const { isConfirmed } = await Swal.fire({
      title: `Deletar ${post?.title}`,
      text: "Esta ação não poderá ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, tenho certeza!',
      cancelButtonText: "Cancelar"
    });

    if(isConfirmed){
      handleDelete();
    }
};

const handleDelete = async () =>{
  try{
      await api.delete(`/produto/${post._id}`, {
          data: { username: user.username, userId: post.userId },
          headers: {authorization:"Bearer " + user.accessToken}
      });
      window.location.replace("/venda");
  }catch(err){
      console.log(err)
  }
}
const hendleUpdate = async () =>{
  try{
      await api.put(`/produto/${post._id}`, {
          username: user.username,
          title: title.toLowerCase(),
          desc: desc,
          preco: preco,
          authorization:"Bearer " + user.accessToken,
          userId: post.userId
      });
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1300
      })
      // window.location.reload();
      window.location.replace("/venda");
      setEditar(false)
      setShowButtons(true)
  }catch(err){
      console.log(err)
  }
}

const TodosPro = ()=>{
  Swal.fire({
    title: 'Deseja cancelar?',
    text: "",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim!'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Cancelado!',
        'Divulgação de produto  cancelado!',
        'success'
      )

      setEditar(false)
      setShowButtons(true)
    }
  })
    
}


  return (
    <div className='conteinerSinglePostVenda'>
        <div className='OI' >
            <Menu />
        </div>
        <div className='menuBootstrap' >
        <nav className="navbar navbar-expand-lg navbar-light  menuBootstrap">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/venda">
                <div className='logoBootstrap'>
                    <div></div>
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
                        {user.profilePic ? (<img src={user.profilePic} alt="" className='imgMenuHumburguer' />):
                        (<i>Usuário</i>)}
                    </Link>
                </li>
            </ul>
            </div>
        </div>
        </nav>
        </div>
        <div className='fullContent'>
          <div className='imgContent'>
            <p id='categoria'>Categoria: Venda</p>
            <div className='imgDivSingle'>
              <img id='photoVendaId' src={post.photo} alt='#' />
            </div>
            
          </div>
          <div className='descContent'>
            {editar ? (
              <div 
              className='fullForm'>
                <h3 className='editVenda'>Editar O Produto</h3>
                <input className='inputFormEditVenda' value={title} onChange={e=>setTitle(e.target.value)} type='text' placeholder='Title ...' maxLength='60'/>
                <input className='inputFormEditVenda' value={preco} onChange={e=>setPreco(e.target.value)}  type='Number' placeholder='R$ 0,00' maxLength='10' />
                <textarea className='inputFormEditVenda' value={desc} onChange={e=>setDesc(e.target.value)} placeholder='Descrição ...' maxLength='200' />
                <button className='buttonFormEditVenda' onClick={hendleUpdate}>Editar ...</button>
                <div className='todosProdutosnew' id='cancelform' onClick={TodosPro}><i>Cancelar</i></div>
              </div>
            ) : (
            <>
            <div className='avaliacao'>
              <i className="fa-solid fa-star" id='estrela'></i>
              <i className="fa-solid fa-star" id='estrela'></i>
              <i className="fa-solid fa-star" id='estrela'></i>
              <i className="fa-solid fa-star" id='estrela'></i>
              <i className="fa-solid fa-star-half-stroke" id='estrela'></i>
               (Avaliações)
            </div>
            <h2>{post.title}</h2>
            <div className='codigoItem'>
              <p>(Cód. Item {post._id})</p>
              <i className='outrosProdutos' onClick={Home}>Outros produtos</i>
            </div>
            <h2>R$ {post.preco}</h2>
            <p>Vendedor: {post.username}</p>
            <p>Descrição: {post.desc}</p>
            <div className='cartoes'>
            {(post.username === user.username && post.userId === user._id) && (<i>Assim que o produto for comprado, delete-o caso não esteje a vende-lo novamente!</i>)}
            </div>
            </>
            )}
          </div>
          {showButtons && (
            <div className='butoomContent'>
              {(post.username === user.username && post.userId === user._id) ? (
                <div className='buttonZapDiv'><button  className='buttonEditar' onClick={EditTrue}>Editar <i className="fa-solid fa-pen-to-square"></i></button></div>
              ) : (
                <div></div>
              )}
              {(post.username === user.username && post.userId === user._id) ? (
                <div className='buttonZapDiv'><button  className='buttonDeletar' onClick={fastConfirmDelete}>Deletar <i className="fa-solid fa-trash-can"></i></button></div>
              ) : (
                <div className='buttonZapDiv'><button onClick={whatsappSend} className='buttonZap'>Enviar Zap <i className="fa-brands fa-whatsapp"></i></button></div>
              )}
            </div>
          )}
          <div className='FooterContainerFix'>
          <Footer />
        </div>
        </div>
    </div>
  )
}
