import React from 'react'
import './SingleAluguel.css'
import Menu from '../../components/Menu/Menu'
import { useState, useEffect, useContext } from 'react';
import { Link, useLocation} from 'react-router-dom';
import api from '../../services/api'
import { Context } from '../../Context/Context';
import Swal from 'sweetalert2';
import Footer from '../../components/Footer/Footer';


export default function SingleAluguel() {
  const location = useLocation();

  const path = location.pathname.split("/")[3]
  const [post, setPost] = useState({})
  const [title, setTitle ] = useState("")
  const [desc, setDesc ] = useState("")
  const [foto, setFoto ] = useState("")
  const [cidade, setCidade ] = useState("")
  const [bairro, setBairro ] = useState("")
  const [logradouro, setLogradouro ] = useState("")
  const [editar, setEditar ] = useState(false)
  
  useEffect(()=>{
    const getPost = async ()=>{
      const res = await api.get("/aluguel/"+path)
      setCidade(res.data.cep.localidade)
      setBairro(res.data.cep.bairro)
      setLogradouro(res.data.cep.logradouro)
      setPost(res.data)
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setFoto(res.data.photo1)
    }
    getPost()
  }, [path])

const {user} = useContext(Context);
// const = "https://festupload.s3.amazonaws.com/";

const whatsappSend = () =>{
  const messageZap=`Olá ${post.username}. Gostaria de saber se A casa em compartilhamento  
  que divulgou na plataforma UnilabTem
  se ainda está em aluguel?
  https://unilabtem.com.br/habitacao/aluguel/${path}`;

  var nu = post.userwhatsapp.replace(/-/g, '');
  var nua = nu.replace(/ /g, '');
  var nub = nua.replace(")", '');
  var nuc = nub.replace("(", '');
  var nud = parseInt(nuc);

  window.open(`http://wa.me/${nud}?text=${messageZap}`)
}
const EditTrue = () =>{
  setEditar(true)
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
      await api.delete(`/aluguel/${post._id}`, {
        data: { username: user.username, userId: post.userId },
        headers: {authorization:"Bearer " + user.accessToken}
      });
      window.location.replace("/habitacao-aluguel");
  }catch(err){
      alert(err)
  }
}
const hendleUpdate = async () =>{
  try{
      await api.put(`/aluguel/${post._id}`, {
          username: user.username,
          title: title,
          desc: desc,
          userId: post.userId,
          authorization:"Bearer " + user.accessToken
      });
      window.location.reload('/habitacao-aluguel');
      setEditar(false)
  }catch(err){
      alert(err)
  }
}

const FotoChengOne = ()=>{
  setFoto(post.photo1)
}
const FotoChengTwo = ()=>{
  setFoto(post.photo2)
}
const FotoChengTrei = ()=>{
  setFoto(post.photo3)
}
const FotoChengFort = ()=>{
  setFoto(post.photo4)
}
const FotoChengFive = ()=>{
  setFoto(post.photo5)
}


  return (
    <div className='conteinerSinglePostVenda'>
        <div className='OI' >
            <Menu />
        </div>
        <div className='menuBootstrap' >
        <nav className="navbar navbar-expand-lg navbar-light  menuBootstrap">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/">
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
            <p id='categoria'>Categoria: {post.categories}</p>
            <div className='imgDivSingle'>
              <img id='photoVendaId' src={foto} alt='' />
            </div>
            <div className='imgDivSingleClass'>
              {post?.photo1  && (<img className='photoVendaclassName' onClick={FotoChengOne} src={post.photo1} alt='' />)}
              {post?.photo2  && (<img className='photoVendaclassName' onClick={FotoChengTwo} src={post.photo2} alt='' />)}
              {post?.photo3  && (<img className='photoVendaclassName' onClick={FotoChengTrei} src={post.photo3} alt='' />)}
              {post?.photo4  && (<img className='photoVendaclassName' onClick={FotoChengFort} src={post.photo4} alt='' />)}
              {post?.photo5  && (<img className='photoVendaclassName' onClick={FotoChengFive} src={post.photo5} alt='' />)}
            </div>
            
          </div>
          <div className='descContent'>
            {editar ? (
              <div 
              className='fullForm'>
                <h3 className='editVenda'>Editar</h3>
                <input className='inputFormEditVenda' value={title} onChange={e=>setTitle(e.target.value)} type='text' placeholder='Title ...' maxLength='60'/>
                <textarea className='inputFormEditVenda' value={desc} onChange={e=>setDesc(e.target.value)} placeholder='Descrição ...' maxLength='200' />
                <button className='buttonFormEditVenda' onClick={hendleUpdate}>Editar ...</button>
              </div>
            ) : (
            <>
            <h2>{post.title}</h2>
            <div className='codigoItem'>
              <p>(Cód. Item {post._id})</p>
              <Link to="/habitacao-aluguel"><i className='outrosProdutos'>Outros produtos</i></Link>
            </div>
            <p><i>Divulgador: </i> <b>{post.username}</b></p>
            <p><i>Preço: </i>R$ <b>{post.preco}</b></p>
            <p><i>Data de divulgação: </i> <b>{new  Date(post.createdAt).toDateString()}</b></p>
            <p><i>Estatos: </i> <b>Desponível</b></p>
            <p><i>Sala: </i><b>{post.sala}</b> </p>
            <p><i>Cozinha: </i> <b>{post.cozinha}</b></p>
            <p><i>Quarto: </i><b>{post.quarto}</b> </p>
            <p><i>Banheiro: </i><b>{post.banheiro}</b> </p>
            {cidade && (<p><i>Cidade: </i><b>{cidade}</b> </p>)}
            {bairro && (<p><i>Bairro: </i><b>{bairro}</b> </p>)}
            {logradouro && (<p><i>Logradouro: </i><b>{logradouro}</b> </p>)}
            <p><i>Info: </i> <b>{post.desc}</b> </p>
            </>
            )}
          </div>
          <div className='butoomContent'>
            {(post.username === user.username && post.userId === user._id) ? (
              <Link to={`/aluguel-edit/${post?._id}`}>
                  <div className='buttonZapDiv'><button  className='buttonEditar' onClick={EditTrue}>Editar <i className="fa-solid fa-pen-to-square"></i></button></div>
              </Link>
            ) : (
              <div></div>
            )}
            {(post.username === user.username && post.userId === user._id) ? (
              <div className='buttonZapDiv'><button  className='buttonDeletar' onClick={fastConfirmDelete}>Deletar <i className="fa-solid fa-trash-can"></i></button></div>
            ) : (
              <div className='buttonZapDiv'><button onClick={whatsappSend} className='buttonZap'>Enviar Zap <i className="fa-brands fa-whatsapp"></i></button></div>
            )}
          </div>
          <div className='FooterContainerFix'>
              <Footer />
          </div>
        </div>
    </div>
  )
}
