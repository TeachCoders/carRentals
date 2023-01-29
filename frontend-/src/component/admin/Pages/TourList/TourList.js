import React, { useEffect, useState } from 'react'
import TourDetailsView from './TourtListView';
import axios from 'axios';


function TourList() {

   let [apiData, setApiData] = useState()

   //use useEffect for get api data on Browsser
   useEffect(() => {
      let fatchData = () => {
         axios.get('/tour/').then((x) =>{ 
            console.log(x.data)
            setApiData(x.data)
         }
         
         )
      }
      fatchData()
   }, [])

   return (
      <>{apiData ? <TourDetailsView data={apiData} /> : 'Data Loading..'}</>
   )
}

export default TourList