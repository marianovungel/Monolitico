import React, { useEffect, useState } from 'react'
import './CompartPost.css'
import api from '../../services/api'
import { Link } from 'react-router-dom'

export default function CompartPost() {
    const [Aluguel, setAluguel] = useState([])

  useEffect(()=>{
    const getAluguel = async ()=>{
      try{
        const product = await api.get('/compartilharmonitor')
        setAluguel(product.data)
      }catch(err){
        alert(err.message)
      }
    }
    getAluguel()
  }, [])
  return (
    <div className='fullVendaPost'>
     {Aluguel?.map((post)=>(
        <Link className="titleColor" to={`/monitor-compartilhar/${post?._id}`} key={post?._id}>
          <div className="cardVendaPost">
            <h6 className='titleVendaPost'>{post?.categories}</h6>
            <div className='verPost'>
              <i className='verText'>Ver o Post</i>
              <i className="fa-regular fa-eye eyesClass"></i>
            </div>
          </div>
        </Link>
     ))}
    </div>
  )
}
