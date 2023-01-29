import React, { useEffect, useState } from 'react'
import CategoryView from './CategoryView';
import axios from 'axios';


function Category() {

   let [apiData, setApiData] = useState()

   //use useEffect for get api data on Browsser
   useEffect(() => {
      let fatchData = () => {
         axios.get('/category/').then((x) => {
            console.log(x.data)
         setApiData(x.data)
      }
         
         )
      }
      fatchData()
   }, [])

   return (
      <>{apiData ? <CategoryView data={apiData} /> : 'Data Loading..'}</>
   )
}

export default Category