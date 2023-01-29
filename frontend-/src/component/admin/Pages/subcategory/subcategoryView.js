import { React, useEffect } from 'react'
//ui component
import SideNav from '../../common/SideNav'
import AdminHeader from '../../common/AdminHeader'
import AdminFooter from '../../common/AdminFooter'
//ui component
import $ from 'jquery';
import 'datatables/media/js/jquery.dataTables.min'
import { Link, useNavigate} from 'react-router-dom'
import axios from 'axios'


function ProductCategoryView(props) {

    let navigate = useNavigate()






    useEffect(() => {

        $('table').DataTable();

    }, [])



    let deleteData = async (e) => {
        await axios.delete(`/subcategory/deleteApi/${e}`)
            .then((x) => {
                navigate('/admin/dashboard/product/');
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
                            <h1 className='fs-4 pt-3 pb-3'>Product Category</h1>
                            <div className='row'>
                                <table className="table table-bordered" id="dataTable" width="100%">
                                    <thead>
                                        <tr>
                                            <th>sr.</th>
                                            <th>Thumbnail</th>
                                            <th>Category</th>  
                                            <th>Menu Name</th>                                            
                                            <th>H1</th>
                                            <th>Page Url</th>
                                            <th>Page Title / Name</th>
                                            <th>Met. Desc.</th>
                                            <th>Meta Key.</th>

                                            <th>Slider Photo</th>
                                            <th>Details</th>
                                            <th style={{ width: '134px', }}>Operations</th> 
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            props.data.map((x, i) => {
                                                return (
                                                    <>

                                                        <tr key={x._id}>
                                                            <td>{i + 1}</td>
                                                           <td width={20}>
                                                                {x.SbctThumb.map((a) => {
                                                                    console.log(a);
                                                                    return (<> <img src={`/images/${a}`} alt={x.Sbcth1} title={x.Sbcth1} width='100' /></>)
                                                                })}</td>
                                                            <td>{x.SbctType}</td>
                                                            <td>{x.SbctNav}</td>
                                                            <td>{x.Sbcth1}</td>
                                                            <td>{x.SbctUrl}</td>
                                                            <td>{x.SbctTitle}</td>
                                                            <td>{x.SbctMetadesc}</td>
                                                            <td>{x.SbctMetakey}</td>
                                                            <td width={20}>
                                                                {x.SbctSlider.map((a) => {
                                                                    console.log(a);
                                                                    return (<> <img src={`/images/${a}`} alt={x.Sbcth1} title={x.Sbcth1} height='25' /></>)
                                                                })}</td>

                                                            <td>{x.SbctDtls.slice(0, 5)}</td>
                                                            <td style={{ width: '150px', }}>
                                                                <Link title={`Edit ${x.Sbcth1} Category`} data-bs-toggle="tooltip" className="btn btn-primary me-1" to={`edit/${x.SbctUrl}`}>
                                                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                                                </Link>

                                                                <Link title={`Delet ${x.Sbcth1} Category`} to={'delete/' + x._id} onClick={() => { deleteData(x._id) }} className=' text-white btn btn-danger me-2'>
                                                                    <i class="fa fa-trash" aria-hidden="true"></i></Link>
                                                            </td> 
                                                        </tr>

                                                    </>
                                                    )
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

export default ProductCategoryView