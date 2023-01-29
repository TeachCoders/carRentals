import React, { useEffect, useState } from 'react'
import TransportDetailsView from './TransportListView';
import axios from 'axios';


function TransportList() {

   let [apiData, setApiData] = useState()

   //use useEffect for get api data on Browsser
   useEffect(() => {
      let fatchData = () => {
         axios.get('/transport/').then((x) =>{ 
            console.log(x.data)
            setApiData(x.data)
         }
         
         )
      }
      fatchData()
   }, [])

   return (
      <>{apiData ? <TransportDetailsView data={apiData} /> : 'Data Loading..'}</>
   )
}

export default TransportList