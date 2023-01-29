// import React from 'react'
// import AdminRoute from './component/admin/AdminRoute'
// import ClientRouter from './ClientRouter'
// function MainRoute() {
//   return (
//    <>    
//   <ClientRouter  /> 
//    <AdminRoute />
//    </>
//   )
// }

// export default MainRoute




import React from 'react'
import {Routes, Route} from 'react-router-dom';
/* client Component*/
import Home from './component/client/pages/Home';
import AboutUs from './component/client/pages/AboutUs';
import SuperSubPage from './component/client/pages/LandingPage';
import InnderLandingPage from './component/client/pages/InnderLandingPage';
import DetailPageoption from './component/client/pages/DetailPageoption';
import NotFond from './component/admin/Pages/NotFond';


//AdminRouter
import Admin from './component/admin/Pages/Admin';

//Category Component
import Category from './component/admin/Pages/Category/Category';
import CategoryAdd from './component/admin/Pages/Category/CategoryAdd';
import CategoryEdit from './component/admin/Pages/Category/CategoryEdit';


//Product Category Component
import ProductCategory from './component/admin/Pages/subcategory/subcategory';
import ProductCategoryAdd from './component/admin/Pages/subcategory/subcategoryAdd';
import ProductCategoryEdit from './component/admin/Pages/subcategory/subcategoryEdit';
// import FindCatForAddProduct from './component/admin/Pages/Category/FindCatForAddProduct';


//Transport Category Component
import TransportList from './component/admin/Pages/TransportList/TransportList';
import TransportListAdd from './component/admin/Pages/TransportList/TransportListAdd';
import TransportListEdit from './component/admin/Pages/TransportList/TransportListEdit';


import TourList from './component/admin/Pages/TourList/TourList';
import TourListAdd from './component/admin/Pages/TourList/TourListAdd';
import TourListEdit from './component/admin/Pages/TourList/TourListEdit';



import FormikForm from './component/admin/Pages/Auth/FormikTest';
import Login from './component/admin/Pages/Auth/Login';
import Registration from './component/admin/Pages/Auth/Registration';

//Product Component

function MainRoute() {
  return (
   <>
   
    <Routes>
      {/* Client Router Start From Here */}

        <Route>
        {/* <Route path='notfound' element={<NotFond />} />  */}
        <Route excat path="/notfound" element={<NotFond />} />
                <Route excat path="/" element={<Home />} />
                <Route excat path='about-us' element={<AboutUs />} />
                <Route path="/:id" element={<SuperSubPage />} /> 
                <Route path="/:id/:id2" element={<InnderLandingPage />} />     
                <Route path="/:id/:id2/:id3" element={<DetailPageoption />} />   
        </Route>
        
 
      
      {/* End Client Router Start From Here */}

   


{/* <Route path='/signup' element={<Signup />} />
<Route path='/login' element={<Login />}/> */}

      {/* Admin Router Start From Here */}

      <Route path="/test-form" element={<FormikForm />} /> 
      <Route path="/admin/">
      <Route index element={<Login />} />
         <Route path="/admin/registration" element={<Registration />} /> 


      <Route path="/admin/dashboard/">  
               <Route index element={<Admin />} />                 
                {/* Category Route From Here */}
                <Route path="category">  
                    <Route index element={<Category  />} />                
                    <Route path="add" element={<CategoryAdd />} />
                    <Route path='edit/:id' element={<CategoryEdit />} />
                </Route>

                {/* Product Category Start From Here */}
                <Route path="product">  
                    <Route index element={<ProductCategory  />} />             
                    <Route path="add/:id" element={<ProductCategoryAdd />} />
                    {/* <Route path='add/:id' element={<ProductCategoryAdd />} /> */}
                    <Route path='edit/:id' element={<ProductCategoryEdit />} />
                </Route>
                

               <Route path="transport-list">  
                    <Route index element={<TransportList  />} />                
                    <Route path="add/:transport" element={<TransportListAdd />} />
                    <Route path='edit/:id' element={<TransportListEdit />} />
                </Route> 



                <Route path="tour-list">  
                    <Route index element={<TourList/>} />                
                    <Route path="add/:tour" element={<TourListAdd />} />
                    <Route path='edit/:id' element={<TourListEdit />} />
                </Route> 
          </Route>
      
      </Route> 
      
         
          
          

          


          



     </Routes>

   </>
  )
}

export default MainRoute