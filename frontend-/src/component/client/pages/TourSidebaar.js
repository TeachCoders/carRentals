import { React, useEffect, useState } from 'react'
import { useParams} from 'react-router-dom';
import axios from 'axios'



function TourSidebaar() {
    let { id } = useParams()
    let [items, setData]= useState([])

useEffect(()=>{
    let getdata = async()=>{
       await axios.get(`http://localhost:600/api/subCategory/${id}`)
        .then((x)=>{
            setData(x.data)
        })
    }
    getdata()
},[id])

console.log('------------')
// alert(id)
  return (
    <>
      {
  
      console.log(items)
      
      
      }

    

<div className='sidbaar-list'>
    <div className='col-items'>
        {
            
            items.map((x)=>{
                return(
                    <>
                      <h2> {x.Sbcth1}</h2>
                        <ul>
                            {
                            x.dtlspageRefid.map((y)=>{
                                return(
                                    <li>{y.transNav}</li>
                                )
                            })
                            }
                            
                        </ul>
                    </>
                )
            })
            
        }
      
    </div>
</div>

    </>
  )
}

export default TourSidebaar