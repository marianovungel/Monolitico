import React from 'react'
import Menu from '../../components/Menu/Menu'
import Produto from '../../components/Produto/Produto'
import './Venda.css';
import {useState, useContext} from 'react'
import {Context} from '../../Context/Context'
import api from '../../services/api'
import { Link} from 'react-router-dom'
import Swal from 'sweetalert2';
//upload img
// import upload from '../../services/upload'
// async function postImage({image, description}) {
//   const formData = new FormData();
//   formData.append("image", image)
//   formData.append("description", description)

//   const result = await upload.post('/upload/upload', formData, { headers: {'Content-Type': 'multipart/form-data'}})
//   console.log(result.data.url)
//   return result.data.url;
// }

import { imageDb } from '../../services/firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Footer from '../../components/Footer/Footer';

const handleClick = async (URL)=>{
    try {
       const imgRef = ref(imageDb, `files/${v4()}`)
       uploadBytes(imgRef, URL)
       const snapshot = await uploadBytes(imgRef, URL)
       const downloadURL = await getDownloadURL(snapshot.ref);
       return (downloadURL)
    } catch (error) {
        console.log(error)
    }
}
//upload img
async function postImage({image, description}) {
    const formData = new FormData();
    formData.append("image", image)
    formData.append("description", description)

    const result = await handleClick(image)
    console.log(result)
  return result;
}

function Venda() {

  const [preco, setPreco] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [cadastrarFunc, setCadastrarFunc] = useState(false)
  const [banner, setBanner] = useState(true)
  const [file, setFile] = useState(null)
  const [girar, setGirar] = useState(false)
  

  const { user } = useContext(Context)
//upload img function

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setGirar(true)
    const newPost = {
      username: user.username,
      userwhatsapp: user.whatsapp,
      userId: user._id,
      preco,
      title: title.toLowerCase(),
      desc,
    };
    if(file){
      try{
        const description = Date.now() + file.name;
        const result = await postImage({image: file, description})
        newPost.photo = result;
        console.log(newPost)
      }catch(err){}
    }
    try{
      await api.post("/produto", newPost)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1300
      })
      setCadastrarFunc(false)
      setGirar(false)
      setBanner(true)
      window.location.replace("/venda");
    }catch(err){}
  }

  const Ative = ()=>{
    if(banner && !cadastrarFunc){
      setCadastrarFunc(true)
      setGirar(false)
      setBanner(false)
    }else{
      setCadastrarFunc(false)
      setBanner(true)
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

        setCadastrarFunc(false)
        setBanner(true)
      }
    })
      
  }
  return (
    <div className="venda">
      <div className='OI' >
            <Menu />
        </div>
        <div className='menuBootstrap' >
        <nav className="navbar navbar-expand-lg navbar-light  menuBootstrap">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/venda">
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
                <li className="nav-item" onClick={Ative}>
                <Link className="nav-link text-light" to="">Cadastrar venda</Link>
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
      <div className='conteiner'>
            {cadastrarFunc ? (
        <div className='cadastrarProdutonew'>
            <form className='formProdutonewww' onSubmit={handleSubmit} >
              <h4 className='produtoFormModalnew'>Cadastrar Produto</h4>
              <input type="file" className='imgInputContentnew' accept="image/*" required onChange={(e)=> setFile(e.target.files[0])}/>
              <input className='inputProdutonew' type='text' placeholder='Titulo' required onChange={(e)=> setTitle(e.target.value)} />
              <input className='inputProdutonew' type='Number' placeholder='R$ 00,00' required onChange={(e)=> setPreco(e.target.value)} />
              <textarea placeholder='descrição...' className="storynew" rows="10" cols="33" required onChange={(e)=> setDesc(e.target.value)} ></textarea>
              {girar ? (

              <button className='inputProdutonew colorbutton' type='submit'> <i className="fa-solid fa-circle-notch girar"></i></button>
              ):(

              <button className='inputProdutonew colorbutton' type='submit'> Cadastrar </button>
              )}
              <div className='todosProdutosnew' id='cancelform' onClick={TodosPro}><i>Cancelar</i></div>
            </form>
        </div>
            ):(
          <div className='sidebarw'>
              <Produto />
          </div>
            )}
      </div>
        {banner && (<div className='ativeCadastrar' id='ativ' onClick={Ative}><i>Cadastrar Produto</i></div>
        )}
        <div className='FooterContainerFix'>
          <Footer />
        </div>
    </div>
  );
}

export default Venda;
