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

function TransportListView(props) {
    console.log(props.data)

    let navigate = useNavigate()



    useEffect(() => {
        //$('table').dataTable();
        $('table').DataTable();
       // $('#datatable').DataTable().page('last').draw('page');
 
     
    }, [])



    let deleteData = async (e)=>{
        await axios.delete(`/transport/deleteApi/${e}`)
        .then((x)=>{
           navigate('/admin/transport-list/');
    
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
                            <h1 className='fs-4 pt-3 pb-3'>Transport List</h1>
                            <div className='row'>
                                <table className="table table-bordered" id="dataTable" width="100%">
                                    <thead>
                                        <tr>
                                        <th>sr.</th>
                                           <th>Thumbnail</th>
                                           {/* <th>Category</th>  */}
                                           <th>Menu Name</th>
                                           <th>Page url</th> 
                                            <th>H1</th>                                                                                  
                                              
                                            <th>Page Title / Name</th>                                           
                                            <th>Met. Desc.</th>
                                            <th>Meta Key.</th>
                                            
                                            <th>Slider Photo</th>
                                            <th>Details</th>
                                           <th  style={{width:'134px'}}>Operations</th> 
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
                                                             {x.transThumb.map((a)=>{
                                                                console.log(a);
                                                            return (<> <img src={`/images/${a}`} alt={x.transH1} title={x.transH1} width='90'/></>)
                                                           })}</td> 
                                                            {/* <td>{x.Transport_relational_id[0].Sbcth1}</td> */}
                                                            <td>{x.transNav}</td>                                                           
                                                            <td>{x.transUrl}</td>
                                                            <td>{x.transH1}</td>
                                                            
                                                            <td>{x.transTitle}</td>
                                                            <td>{x.transMetaDesc}</td>
                                                            <td>{x.transMetaKey}</td>                                                            
                                                            <td width={20}>
                                                             {x.transSlider.map((a)=>{
                                                                console.log(a);
                                                            return (<> <img src={`/images/${a}`} alt={x.transH1} title={x.transH1}  height='25'/></>)
                                                           })}</td>
                                                         
                                                           <td>{x.transDtls.slice(0, 5)}</td>
                                                             <td style={{width:'150px',}}>
                                                                <Link title={`Edit ${x.transH1} Category`} data-bs-toggle="tooltip" className="btn btn-primary me-1" to={`edit/${x.transUrl}`}>
                                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                </Link>


                                                                <Link title={`Delet ${x.transH1} Category`}    to ={'delete/'+x._id} onClick={()=>{deleteData(x._id)}}  className=' text-white btn btn-danger me-2'>
                                                                <i class="fa fa-trash" aria-hidden="true"></i></Link> 

                                                            
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

export default TransportListView