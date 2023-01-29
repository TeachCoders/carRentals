import React, { useEffect, useState } from 'react'
import ProductCategoryView from './subcategoryView';
import axios from 'axios';


function ProductCategory() {

   let [apiData, setApiData] = useState()

   //use useEffect for get api data on Browsser
   useEffect(() => {
      let fatchData = () => {
         axios.get('/subcategory/').then((x) =>{ 
            console.log(x.data)
            setApiData(x.data)
         }
         
         )
      }
      fatchData()
   }, [])

   return (
      <>{apiData ? <ProductCategoryView data={apiData} /> : 'Data Loading..'}</>
   )
}

export default ProductCategory