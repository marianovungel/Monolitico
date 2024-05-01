import React from 'react'
import './Desapego.css'
import Menu from '../../components/Menu/Menu'
import {useState, useContext, useEffect} from 'react'
import {Context} from '../../Context/Context'
import api from '../../services/api'
// import upload from '../../services/upload'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'


import { imageDb } from '../../services/firebase';
import { v4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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

export default function Desapego() {
  
  const [title, setTitle] = useState("")
  const [cepp, setCepp] = useState("")
  const [categories, setcategories] = useState("")
  const [cep, setCep] = useState({})
  const [desc, setDesc] = useState("")
  const [cat, setCat] = useState("")
  const [cidade, setCidade] = useState("")
  const [cidadeSee, setCidadeSee] = useState(false)
  const [file, setFile] = useState(null)
  const [cadastrar, setCadastrar ] = useState(true)
  const [desapego, setDesapego] = useState([])
  const [vazio, setVazio] = useState(false)
  const [carregar, setCarregar] = useState(false)
  const [scroll, setScroll] = useState(true)
  const [side, setSide] = useState(true)
  const [titleSearh, setTitleSearh] = useState("")
  const [girar, setGirar] = useState(false)

  const { user } = useContext(Context)
  useEffect(()=>{
    const FetchDesapego = async () => {
      setCarregar(true)
        try{
            const res = await api.get("/desapego")
            if(res.data.length === 0){
              setVazio(true)
              setCarregar(false)
              setDesapego([])
            }
            setVazio(false)
            setCarregar(false)
            setDesapego(res.data)
        }catch(err){
            alert(err)
        }
    }

    FetchDesapego();
}, [])

  const Cepfuncion = async ()=>{
    try{
      const cepSearch = cepp.replace(/\D/g, '');
      await fetch(`https://viacep.com.br/ws/${cepSearch}/json/`)
      .then(res=>res.json()).then(data => setCep(data)
      )
    }catch(err){
      alert(err)
    }
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    setGirar(true)
    const newPost = {
      username: user.username,
      userwhatsapp: user.whatsapp,
      userId: user._id,
      title: title.toLowerCase(),
      desc,
      cep: cep,
      cidade: cep.localidade,
      categories: cat,
    };
    if(file){
      try{
        const description = Date.now() + file.name;
        const result = await postImage({image: file, description})
        console.log(result)
        newPost.photo = result;
        
        
      }catch(err){}
    }
    try{
      const {data: ress} =  await api.post("/desapego", newPost);
      setDesapego([ress, ...desapego])
      setCadastrar(true)
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1300
      })
      setGirar(false)
      window.location.reload('/desapego');
      setScroll(true)
        setSide(true)
        setCadastrar(true)
    }catch(err){}
  }
///////////////--cadastrar--////////////
  const CadastrarTrue = () =>{
    setGirar(false)
    setCadastrar(false)
    setScroll(false)
    setSide(false)
  }

  const submitSearch = async (e) =>{
    e.preventDefault()
    const results = await api.post("/desapego/search", {title: titleSearh.toLowerCase(),})
    if(results.data.length === 0){
      setVazio(true)
      setCarregar(false)
      setDesapego([])
    }else{
      setDesapego(results.data)
      setVazio(false)
      setCarregar(false)
    }
  }
  const submitSearchMeu = async (e) =>{
    e.preventDefault()
    const results = await api.post("/desapego/search/meu/id", {userId: user._id,})
    if(results.data.length === 0){
      setVazio(true)
      setCarregar(false)
      setDesapego([])
    }else{
      setDesapego(results.data)
      setVazio(false)
      setCarregar(false)
    }
  }
  const submitSearchCat = async (e) =>{
    e.preventDefault()
    try{

      const results = await api.post("/desapego/search/cat", {categories: categories,})
      if(results.data.length === 0){
        setVazio(true)
        setCarregar(false)
        setDesapego([])
      }else{
        setDesapego(results.data)
        setVazio(false)
        setCarregar(false)
      }
    }catch(err){
      alert(err)
    }
  }
  const FetchDesapegoFiltro = async () => {
    setCarregar(true)
      try{
          const res = await api.get("/desapego")
          if(res.data.length === 0){
            setVazio(true)
            setCarregar(false)
            setDesapego([])
          }
          setVazio(false)
          setCarregar(false)
          setDesapego(res.data)
      }catch(err){
          alert(err)
      }
  }

  const setCidadeSeeFunction = () =>{
    setCidadeSee(true)
  }
  const submitSearchCidade = async (e) =>{
    e.preventDefault()
    try{

      const results = await api.post("/desapego/search/cidade", {cidade: cidade,})
      if(results.data.length === 0){
        setVazio(true)
        setCarregar(false)
        setDesapego([])
      }else{
        setDesapego(results.data)
        setVazio(false)
        setCarregar(false)
      }
    }catch(err){
      alert(err)
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

        setScroll(true)
        setSide(true)
        setCadastrar(true)
      }
    })
      
  }

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
        {/* /////////////////////////////////////--HTML--////////////////////////// */}
        <div className='sidebarDesapego'>
          {cadastrar ? (
             
              <div className='cadastrarProdutoCallForm'>
                <div className='buttonCad' onClick={CadastrarTrue}>Cadastrar Doação</div>
                <div className='filtrar'>
                  <h4 className='filtrarh4'>Filtrar <i className="fa-solid fa-filter"></i></h4>
                  <div className='itemList'>
                    <h5 className='filtraritem'onClick={FetchDesapegoFiltro}>Todos<i className='filtraritemSpace'></i>  <i className="fa-solid fa-calendar-days"></i></h5>
                    <h5 className='filtraritem' onClick={submitSearchMeu}>Meus Desapegos<i className='filtraritemSpace'></i>  <i className="fa-solid fa-person"></i></h5>
                    <h5 className='filtraritemCat'>
                    <select className='inputProdutoselet' type='text' placeholder='Categoria'  onChange={(e)=> setcategories(e.target.value)} onClick={submitSearchCat}>
                      <option className='inputSeletItem' value="Eletrodomesticos" >Eletrodomésticos</option>
                      <option className='inputSeletItem' value="Material eletrónico" >Material Eletrônico</option>
                      <option className='inputSeletItem' value="Vestuários" >Vestuários</option>
                      <option className='inputSeletItem' value="Calçados" >Calçados</option>
                      <option className='inputSeletItem' value="Diversos" >Diversos</option>
                    </select>
                    </h5>
                    <h5 className='filtraritem' onClick={setCidadeSeeFunction}>Cidade<i className='filtraritemSpace'></i>  <i className="fa-solid fa-city"></i></h5>
                    {cidadeSee && 
                      <>
                        <h5 className='filtraritem'><input type='search' id='filtraritemSpaceId' maxLength='30' placeholder='Digite a cidade ...' defaultValue='Redenção' required onChange={e=>setCidade(e.target.value)}/></h5>
                        <h5 className='filtraritem' id='filtraritemSpaceIdButton' onClick={submitSearchCidade}>Pesquisar por cidade<i className='filtraritemSpace' id='filtraritemSpaceIdButton'></i>  <i id='filtraritemSpaceIdButton' className="fa-solid fa-city" ></i></h5>
                      </>
                    }
                  </div>
                </div>
              </div>
            
          ) : (
          <form className='formProdutoDesapego' onSubmit={handleSubmit} key={file}>
              <h4 className='produtoFormModal'>Divulgar Doação</h4>
        
              <input type="file" className='imgInputContentform' accept="image/*" required onChange={(e)=> setFile(e.target.files[0])}/>
              <input className='inputProduto' type='text' placeholder='Titulo' required onChange={(e)=> setTitle(e.target.value)} />
              <input className='inputProduto' type='text' placeholder='CEP' maxLength='9'
              minLength='9' required onChange={(e)=> setCepp(e.target.value)} onBlur={Cepfuncion} />
              <select className='inputProduto' type='text' placeholder='Categoria' required onChange={(e)=> setCat(e.target.value)}>
                <option value="Eletrodomesticos">Eletrodomésticos</option>
                <option value="Material eletrónico">Material Eletrônico</option>
                <option value="Vestuários">Vestuários</option>
                <option value="Calçados">Calçados</option>
                <option value="Diversos">Diversos</option>
              </select>

              <textarea className="story" rows="10" cols="33" required onChange={(e)=> setDesc(e.target.value)} ></textarea>
              {girar ? (
                <button className='inputProduto colorbutton' type='submit'> <i className="fa-solid fa-spinner girar"></i> </button>
              ):(
                <button className='inputProduto colorbutton' type='submit'> Criar </button>
              )}
              <div className='todosProdutosnew' id='cancelform' onClick={TodosPro}><i>Cancelar</i></div>
            </form>
          )}

          {/* ///////////////////////////--center--///////////////////////// */}
          {scroll && (
            <div className='sidebarCardDesapego scroll' key="scrollKey">
                <>
                    {/* /////////////////////////////////--pesquisa--//////////////////////////////// */}
                <form onSubmit={submitSearch} className='searchform' id='searchFormDesapego' key="scrollKey1">
                    <input className='searchformInportDesapego' type="search" placeholder='Pesquise...' onChange={e => setTitleSearh(e.target.value)} />
                    <button type="submit" className='searchformButton'><i className="fa-solid fa-magnifying-glass colorSearch"></i></button>
                </form>
                {vazio && (<div key="scrollKey2" className='Encontrar'><h5>Nenhum Produto encontrado ...</h5></div>)}
                {carregar && (<div key="scrollKey3" className='Encontrar'><h5>Carregando ...</h5></div>)}
                {/* ///////////////////////////////--card--///////////////////////////// */}
                {desapego.map((p)=>(
                <div className='allCard' key={p?._id}>
                    <div className='divHeader'>
                        {/* <img className='imgcircul' src={URLImg + p.photo} alt=''/> */}
                        <p className='SpanUsername'>{ p?.username }</p>
                    </div>
                    <div className='descClassName'>
                      <span className='descSpan'>{p?.desc}</span>
                    </div>
                    <div className='divHero'><img id='heroIgm' src={p?.photo} alt='#'/></div>
                    <div className='divFooter'>
                        <span className='spanDate'> {new  Date(p.createdAt).toDateString()} </span>
                        <Link to={`/doacao/${p?._id}`}>
                          <button className='buttonSaiba'>Saiba Mais</button>
                        </Link>
                    </div>
                </div>
                ))}
              </>
            </div>
          )}
          {/* ////////////////////////////////////--sideBar--//////////////////////////// */}
          {side && (
          <div className='bannerDesapego'>
            <div className='bannerDesapegoFast'>
              <h3 className='h3Desapego'>Desapego</h3>
              <img 
              src='https://st3.depositphotos.com/6462898/18901/i/600/depositphotos_189015208-stock-photo-men-holding-donate-box-with.jpg' alt='' 
              className='bannerDesapegoimg'/>
              <p className='bannerDesapegoP'>A oportunidade de se desapegar de forma fácil 
                de bens na comunidade unilabiana...</p>
            </div>
          <div className='bannerDesapegoFast'>
              <h3 className='h3Desapego2'>Doação</h3>
              <p className='bannerDesapegoPp'>Doe aqui, desde bens alimentares e outros tipos de bens!</p>
          </div>
          </div>
          )}
        </div>
        
    </div>
  )
}
