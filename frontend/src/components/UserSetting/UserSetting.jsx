import React from 'react'
import { useEffect } from 'react'
import {useState, useContext} from 'react'
import {Context} from '../../Context/Context'
import api from '../../services/api'
// import upload from '../../services/upload'
import './UserSetting.css'
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

export default function UserSetting() {
    const [photo, setPhoto]= useState(null)
    const [name, setName]= useState(" ")
    const [email, setEmail]= useState(" ")
    const [whatsapp, setWhatsapp]= useState(" ")
    const [loading, setLoading] = useState(false)

    const { user } = useContext(Context)
    const {isFetching, dispatch } = useContext(Context)

    useEffect(()=>{
      const GetUser = async ()=>{
        const yourUser = await api.get(`/users/${user._id}`)
        // setPhoto(yourUser.data.profilePic)
        setName(yourUser.data.username)
        setEmail(yourUser.data.email)
        setWhatsapp(yourUser.data.whatsapp)
      }
      setLoading(false)
      GetUser()
    }, [user._id])

    const Update = async (e)=>{
        e.preventDefault()
        setLoading(true)
        dispatch({ type: "UPDATE_START"})
        const newPost = {
            username: name,
            whatsapp: whatsapp,
            email: email,
            userId: user._id,
          };
          console.log(newPost)
          if(photo){
            try{
              const description = Date.now() + photo.name;
              const result = await postImage({image: photo, description})
              newPost.profilePic = result
            }catch(err){}
          }

          if(user.sig === false){
            try{
              const userUpdate = await api.put(`/users/${user._id}`, newPost)
              await dispatch({ type: "UPDATE_SUCCESS", payload: userUpdate.data.updateUser})
            }catch(err){
              dispatch({ type: "UPDATE_FAILURE"})
              setLoading(false)
              alert(err)
            }
            
          }else{
            try{
              const userUpdate = await api.put(`/usersig/${user._id}`, newPost)
              await dispatch({ type: "UPDATE_SUCCESS", payload: userUpdate.data.updateUser})
            }catch(err){
              dispatch({ type: "UPDATE_FAILURE"})
              setLoading(false)
              alert(err)
            }
          }

              const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.addEventListener('mouseenter', Swal.stopTimer)
                  toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
              })
              
              Toast.fire({
                icon: 'success',
                title: 'Atualizado com sucesso!'
              })
              window.location.replace("/user");
    }

  return (
    <form className='fullContenUser' onSubmit={Update}>
            <h4 className="userInfo">Meus dados de Usuário...</h4>
            <div className="dados">
                <div className=" use imgUser">
                    <i className="Iselect photoUser">Foto de Perfil</i>
                    {photo ? (
                        <img src={URL.createObjectURL(photo)} alt=' ' className='borderImg' />
                    ):(
                        <img 
                        src={user.profilePic} 
                        alt="" className="borderImg" />
                    )}
                    <label for='imgUserPhoto' className="bolinha">
                        <i className="fa-solid fa-pen iconColor"></i>
                    </label>
                </div>
                <div className="expretionData">
                    {!user.sig && (<div className=" use userNameUser">
                        <i className="Iselect userNameOfUser">Nome de Usuário</i>
                        <input type="text" className="userInputB Bselect inputbBortder"  value={name} onChange={(e)=> setName(e.target.value)} />
                    </div>
                    )}
                    <div className=" use zapUser">
                        <i className="Iselect zapUserI">Whatsapp...</i>
                        <input type="text" className="userInputB Bselect inputbBortder"  value={whatsapp} onChange={(e)=> setWhatsapp(e.target.value)} />
                    </div>
                    <div className=" use e-mailUser">
                        <i className="Iselect EmailUserI">E-mail...</i>
                        <input type="text" className="userInputB Bselect inputbBortder"  value={email} onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <div className=" use e-mailUser displayNone">
                        <i className="Iselect EmailUserI displayNone">Imagem de Perfil...</i>
                        <input type="file" id='imgUserPhoto' accept="image/*" className="inputImgUser userInputB Bselect displayNone" onChange={(e)=> setPhoto(e.target.files[0])}  />
                    </div>
                    <div className=" use e-mailUser">
                        {loading ?
                          (<button disabled={isFetching} className="entrarbutton inputImgUser userInputB Bselect ButtonBackgrondcolor"><i className="fa-solid fa-spinner girar"></i></button>)
                          :
                          (<button type='submit'  className="entrarbutton inputImgUser userInputB Bselect ButtonBackgrondcolor">Salvar Alteração</button>)
                        }
                    </div>
                </div>
            </div>
        </form>
  )
}
