
import {Routes, Route} from 'react-router-dom';


import Admin from '../admin/Pages/Admin';
import Category from '../admin/Pages/subcategory/Category';
import CategoryAdd from '../admin/Pages/subcategory/CategoryAdd';
import CategoryEdit from '../admin/Pages/subcategory/CategoryEdit';
import FindCatForAddProduct from '..//admin/Pages/ProductDetails/FindCatForAddProduct';
// import AdminFooter from '../admin/common/AdminFooter';
// import AdminHeader from '../admin/common/AdminHeader';


function AdminRoute() {
  return (

          <Routes>
          <Route path="/admin">  
               <Route path="/admin" element={<Admin />} />                
               <Route path="add-category" element={<CategoryAdd />} />
               <Route path='edit-category/:id' element={<CategoryEdit />} />
               <Route path="/admin/category/">  
                    <Route path='/admin/category/' element={<Category />} /> 
                     <Route path='AddProduct/:id' element={<FindCatForAddProduct />} />
               </Route>
          </Route>
     </Routes>


  )
}

export default AdminRoute