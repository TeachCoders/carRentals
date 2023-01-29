import { React, useEffect, useState } from 'react'
import { useParams, Link} from 'react-router-dom';
import axios from 'axios'



function Sidebaar() {
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

console.log(items)
// alert(id)
  return (
    <>
<div className='sidbaar-list'>
    <div className='col-items'>
        {
            
            items.map((x, index)=>{
                return(
                    <>
                    {index === 0?    <h2> {x.SbctType} List</h2> : ''}
                    <h3> {x.Sbcth1}</h3>
                     
                        <ul>
                           {
                           
                           id === "tour" ?

                      
                           x.tourpageRefid.map((y)=>{
                            return(
                                <li><Link to={`/${x.SbctNavUrl}/${x.SbctUrl}/${y.tourUrl}`}>
                                    {y.tourDuration} Days - {y.tourNav}
                                    </Link></li>
                            )
                           })
                         
                            :
                           


                            x.dtlspageRefid.map((y)=>{
                                return(
                                    <li><Link to={`/${x.SbctNavUrl}/${x.SbctUrl}/${y.transUrl}`}>{y.transNav}</Link></li>
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

export default Sidebaar