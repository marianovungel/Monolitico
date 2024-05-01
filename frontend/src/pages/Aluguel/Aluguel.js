import React from 'react'
import './Aluguel.css'
import Menu from '../../components/Menu/Menu'
import {Link} from 'react-router-dom'
import {useState, useEffect} from 'react'
import api from '../../services/api'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'

export default function Aluguel() {

    const [aluguel, setAluguel] = useState([]);
    useEffect(()=>{
        const FetchDesapego = async () => {
            try{
                const res = await api.get("/aluguel")
                setAluguel(res.data);
            }catch(err){
                console.log(err)
            }
        }
        FetchDesapego();
    }, [])

    console.log(aluguel)
    const URLImg = "https://festupload.s3.amazonaws.com/";
  return (
    <div className='fullContentAluguel'>
        <Menu />
        <header className='headerAluguel'>
            <div className='flexHeaderAluguel'>
            <Header />
            </div>
        </header>
        <div className='contentSideBar'>
            {aluguel.map((p)=>(
                <div className='cardAluguel' key={p?._id}>
                <img className='imgAluguelCard' src={URLImg + p.photo1} alt='' />
                <div className='descPlaceAluguel'>
                    <div className='ajustPositionDesc'>
                        <p className='editP'><i>Categoria</i>: <b>{p.categories}</b></p>
                        <p className='editP'><i>Cidade</i>: <b>{p.cidade}</b></p>
                        <p className='editP'><i>Preço</i>: <b>R${p.preco}</b></p>
                        <p className='editP'><i>Status</i>: <b>Desponível</b></p>
                    </div>
                    <div className='buttomContentInfo'>
                        <Link to={`/habitacao/aluguel/${p?._id}`}><button className='buttonHeaderAluguela'>Mais informações</button></Link>
                    </div>
                </div>
            </div>
            ))}
        </div>
        <div className='FooterContainerFix'>
          <Footer />
        </div>
    </div>
  )
}
