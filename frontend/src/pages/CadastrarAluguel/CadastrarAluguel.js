import React from 'react'
import Menu from '../../components/Menu/Menu'
import './CadastrarAluguel.css'
import {useState, useContext} from 'react'
import {Context} from '../../Context/Context'
// import upload from '../../services/upload'
import api from '../../services/api'
import { Link } from 'react-router-dom'

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

export default function CadastrarAluguel() {

    //useStates
    const { user, isFetching } = useContext(Context)
    const [file1, setFile1] = useState(null)
    const [file2, setFile2] = useState(null)
    const [file3, setFile3] = useState(null)
    const [file4, setFile4] = useState(null)
    const [file5, setFile5] = useState(null)
    const [cat, setCat] = useState("")
    const [preco, setPreco] = useState("")
    const [cepp, setCepp] = useState("")
    const [cep, setCep] = useState("")
    // const [contrato, setContrato] = useState("")
    const [quarto, setQuarto] = useState("")
    const [sala, setSala] = useState("")
    const [cozinha, setCozinha] = useState("")
    const [banheiro, setBanheiro] = useState("")
    const [area, setArea] = useState("")
    const [desc, setDesc] = useState("")
    const [alertImg, setAlertImg] = useState(false)
    const [pfile1, setPfile1] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setLoading(true)
        const newPost = {
          username: user.username,
          userwhatsapp: user.whatsapp,
          userId: user._id,
          categories: cat,
          preco,
          desc,
          cep: cep,
          cidade: cep.localidade,
          // contrato,
          quarto,
          sala,
          cozinha,
          banheiro,
          area,

        };
        if(file1){
          try{
            const description = Date.now() + file1.name;
            const result = await postImage({image: file1, description})
            newPost.photo1 = result
            
            
          }catch(err){}
        }
        if(file2){
          try{
            const description = Date.now() + file2.name;
            const result = await postImage({image: file2, description})
            newPost.photo2 = result
            
            
          }catch(err){}
        }
        if(file3){
            try{
              const description = Date.now() + file3.name;
              const result = await postImage({image: file3, description})
              newPost.photo3 = result
              
              
            }catch(err){}
          }
          if(file4){
            try{
              const description = Date.now() + file4.name;
              const result = await postImage({image: file4, description})
              newPost.photo4 = result
              
              
            }catch(err){}
          }
          if(file5){
            try{
              const description = Date.now() + file5.name;
              const result = await postImage({image: file5, description})
              newPost.photo5 = result
              
              
            }catch(err){}
          }
        try{
          if(file1 !== null || file2 !== null || file3 !== null || file4 !== null || file5 !== null){
            await api.post("/aluguel", newPost);
            setAlertImg(false)
            window.location.replace("/habitacao-aluguel");
          }else{
            setAlertImg(true)
          }
        }catch(err){
          setLoading(false)
        }
      }


      const setImg = () =>{
        if(file1 !== null || file2 !== null || file3 !== null || file4 !== null || file5 !== null){
          if(file1 === null){
            setPfile1(true)
            setAlertImg(false)
          }else{
            setAlertImg(false)
          }
        }else{
          setAlertImg(true)
        }
      }

      //cep
      const Cepfuncion = async ()=>{
        try{
          const cepSearch = cepp.replace(/\D/g, '');
          await fetch(`https://viacep.com.br/ws/${cepSearch}/json/`)
          .then(res=>res.json()).then(data => setCep(data))
        }catch(err){
          alert(err)
        }
      }

  return (
    <div className='fullContentAluguel'>
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
        <header className='headerAluguel'>
            <div className='flexHeaderAluguel'>
                <p className='buttonHeaderAluguelHeaderCadastrar'>Divulgar Casa em aluguel...</p>
            </div>
        </header>
        <div className='contentSideBarForm'>
            <form className='formCadastrarContent' onSubmit={handleSubmit}>
              {alertImg && (<h6 className='headerIAlert'>Adicionar no mínimo uma imagens...</h6>)}
              {pfile1 && (<h6 className='headerIAlert'>É oprigatório colocar a primeira imagem...</h6>)}
                <i className='headerI'>Adiciona até cinco (5) imagens...</i>
                <div className='imgPhotosHoome'>
                {file1 ? (
                    <img src={URL.createObjectURL(file1)} alt='uploadImg' className='labelFotoObject' />
                ):(
                    <label for='foto1' className='labelFoto'><i className="fa-solid fa-circle-plus sizeAdd" ></i></label>
                )}
                    <input type="file" accept="image/*" id='foto1' required className='inputFotoLabelAlugel'onChange={(e)=> setFile1(e.target.files[0])} />
                    {file2 ? (
                    <img src={URL.createObjectURL(file2)} alt='uploadImg' className='labelFotoObject' />
                    ):(
                    <label for='foto2' className='labelFoto'><i className="fa-solid fa-circle-plus sizeAdd"></i></label>
                    )}
                    <input type="file" accept="image/*" id='foto2'  className='inputFotoLabelAlugel' onChange={(e)=> setFile2(e.target.files[0])}/>
                    {file3 ? (
                    <img src={URL.createObjectURL(file3)} alt='uploadImg' className='labelFotoObject' />
                    ):(
                    <label for='foto3' className='labelFoto'><i className="fa-solid fa-circle-plus sizeAdd"></i></label>
                    )}
                    <input type="file" accept="image/*" id='foto3'  className='inputFotoLabelAlugel' onChange={(e)=> setFile3(e.target.files[0])}/>
                    {file4 ? (
                    <img src={URL.createObjectURL(file4)} alt='uploadImg' className='labelFotoObject' />
                    ):(
                    <label for='foto4' className='labelFoto'><i className="fa-solid fa-circle-plus sizeAdd"></i></label>
                    )}
                    <input type="file" accept="image/*" id='foto4'  className='inputFotoLabelAlugel' onChange={(e)=> setFile4(e.target.files[0])}/>
                    {file5 ? (
                    <img src={URL.createObjectURL(file5)} alt='uploadImg' className='labelFotoObject' />
                    ):(
                    <label for='foto5' className='labelFoto'><i className="fa-solid fa-circle-plus sizeAdd"></i></label>
                    )}
                    <input type="file" accept="image/*" id='foto5'  className='inputFotoLabelAlugel' onChange={(e)=> setFile5(e.target.files[0])}/>
                </div>
                <div className='inputsFormeCadastrarAluguel'>
                    <div className='precoType'>
                        <input type='text' placeholder='Categoria' required className='precoTypeInput' onChange={(e)=> setCat(e.target.value)}/>
                        <input type='number' placeholder='Preço' required className='precoTypeInput' onChange={(e)=> setPreco(e.target.value)}/>
                    </div>
                    <div className='precoType'>
                    <input type='number' placeholder='Nº quarto' required className='precoTypeInput' onChange={(e)=> setQuarto(e.target.value)}/>
                        <input type='text' placeholder='CEP' maxLength='9'
                                minLength='9' required className='precoTypeInput'
                                onChange={(e)=> setCepp(e.target.value)} 
                                onBlur={Cepfuncion}
                        />
                    </div>
                    <div className='precoType'>
                        <input type='number' placeholder='Nº Sala' required className='precoTypeInput' onChange={(e)=> setSala(e.target.value)}/>
                        <input type='number' placeholder='Nº Área' required className='precoTypeInput' onChange={(e)=> setArea(e.target.value)}/>
                    </div>
                    <div className='precoType'>
                        <input type='number' placeholder='Nº Cozinha' required className='precoTypeInput' onChange={(e)=> setCozinha(e.target.value)}/>
                        <input type='number' placeholder='Nº Banheiro' required className='precoTypeInput' onChange={(e)=> setBanheiro(e.target.value)}/>
                        
                    </div>
                    <div className='precoType'>
                        <textarea className='forNewDesc' placeholder='Descreve a casa em poucas palavras....' maxLength='200' onChange={(e)=> setDesc(e.target.value)}></textarea>
                    </div>
                    <div className='precoType'>
                    {loading ? 
                        (<button disabled={isFetching} className='CadastrarcasaEmAluguel'><i className="fa-solid fa-spinner girar"></i></button>)
                        :(<button type='submit' onClick={setImg} className='CadastrarcasaEmAluguel'>Cadastrar Aluguel</button>)
                    }
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}
