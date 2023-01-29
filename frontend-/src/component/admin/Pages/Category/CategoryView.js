import { React, useEffect} from 'react'
//ui component
import SideNav from '../../common/SideNav'
import AdminHeader from '../../common/AdminHeader'
import AdminFooter from '../../common/AdminFooter'
//ui component
import $ from 'jquery';
import 'datatables/media/js/jquery.dataTables.min'
import { Link, useNavigate } from 'react-router-dom'




import axios from 'axios'

function CategoryView(props) {

    console.log(props)
    let navigate = useNavigate()



    useEffect(() => {
        //$('table').dataTable();
        $('table').DataTable();
       // $('#datatable').DataTable().page('last').draw('page');
 
     
    }, [])



    let deleteData = async (e)=>{
        await axios.delete(`/category/deleteApi/${e}`)
        .then((x)=>{
           navigate('/admin/dashboard/category/');
    
        })
      
      }

    return (
        <>

        <AdminHeader />
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-lg-2 sidebaare'><SideNav /></div>
                    <div className='col-lg-10'>
                        <div className="admin-content-area">
                            <h1 className='fs-4 pt-3 pb-3'>Category</h1>
                            <div className='row'>
                                <table className="table table-bordered" id="dataTable" width="100%">
                                    <thead>
                                        <tr>
                                        <th>sr.</th>
                                           <th>Thumbnail</th>
                                           <th>Category Name</th>                                          
                                            <th>Page Url</th>                                            
                                            <th>H1</th>
                                          <th>Page Title</th>
                                           <th>Met. Tag</th>
                                            <th>Meta Key.</th>
                                             <th>Slider Photo</th>
                                             <th>Details</th>
                                           <th  style={{width:'134px',}}>Operations</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                           props.data.map((x, i) => {
                                                return (
                                                    <>
                                                
                                                        <tr key={x._id}>
                                                            <td>{i+1}</td>
                                                            <td width={20}>
                                                             {x.ctThumb.map((a)=>{
                                                                console.log(a);
                                                            return (<> <img src={`/images/${a}`} alt={x.cth1} title={x.cth1} width='100'/></>)
                                                           })}</td>
                                                           <td>{x.ctType}</td>
                                                            <td>{x.ctUrl}</td>
                                                            <td>{x.cth1}</td>
                                                            <td>{x.ctTitle}</td>
                                                            <td>{x.ctMetadesc}</td>
                                                            <td>{x.ctMetakey}</td>                                                            
                                                            <td width={20}>
                                                             {x.ctSlider.map((a)=>{
                                                                console.log(a);
                                                            return (<> <img src={`/images/${a}`} alt={x.cth1} title={x.cth1}  height='25'/></>)
                                                           })}</td>
                                                         
                                                           <td>{x.ctDtls.slice(0, 5)}</td>
                                                             <td style={{width:'150px',}}>
                                                                <Link title={`Edit ${x.cth1} Category`} data-bs-toggle="tooltip" className="btn btn-primary me-1" to={`edit/${x.ctUrl}`}>
                                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                </Link>


                                                                <Link title={`Delet ${x.cth1} Category`}    to ={'delete/'+x._id} onClick={()=>{deleteData(x._id)}}  className=' text-white btn btn-danger me-2'>
                                                                <i class="fa fa-trash" aria-hidden="true"></i></Link> 

                                                            
                                                                <Link title={`Add Product in ${x.cth1} Category`} to ={`../product-category/add`} className="btn btn-primary ms-1" ><i className="fa fa-plus" aria-hidden="true"></i></Link>
                                                            </td> 
                                                        </tr>
                                                    </>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>

        <AdminFooter />

        </>
    )
}

export default CategoryView