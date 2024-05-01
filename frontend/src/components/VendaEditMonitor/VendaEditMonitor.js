import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import api from '../../services/api'
import './VendaEditMonitor.css'
import { Link } from 'react-router-dom'

export default function VendaEditMonitor() {

  const [produtoVenda, setProdutoVenda] = useState([])

  const getProdutoVenda = async ()=>{
    try{
      const response = await api.get('/produtomonitor/checkUpdate');
      setProdutoVenda(response.data)
      console.log(response.data)
    }catch(err){}
  }

  useEffect(() => {
    getProdutoVenda();
  }, [])

  return (
    <div className='fullVendaPost'>
      {produtoVenda?.map((post)=>(
        <Link className="titleColor" to={`/monitor-vendaedit/${post?._id}`} key={post._id}>
          <div className="cardVendaPost">
            <h6 className='titleVendaPost'>{post.title}</h6>
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
