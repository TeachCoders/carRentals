import { React, useEffect, useState } from 'react'
import parse from 'html-react-parser';
import HeaderClient from '../Common/HeaderClient';
import FooterClient from '../Common/FooterClient';
import Sidebaar from './sidebaar';
import { useParams, Link } from 'react-router-dom';
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, Navigation, Pagination} from "swiper";


import axios from 'axios';
function SuperSubPage() {
  let { id } = useParams()
  let { id2 } = useParams()




  //state definfe
  let [list, setList] = useState([])




  
  useEffect(() => {
   
    let getData = async () => {
      //Api Calling
      const transports = axios.get(`http://localhost:600/api/subCategory/${id}/${id2}`)
      //Axios Method use
      await axios.all([transports]).then(
        axios.spread((...allData) => {
          setList(allData[0].data)
        })
      )
    }
    getData()
  


  }, [id, id2])

  return (

    <>
          <HeaderClient />


          
      
      <Swiper                               
       style={{
                "--swiper-navigation-color": "#fff",
                "--swiper-pagination-color": "#fff",      
              }}
        spaceBetween={30}
        loop={true}
        loopFillGroupWithBlank={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {

          list.map((x) => {
            return (
              x.SbctSlider.map((y) => {
                return <><SwiperSlide key={Math.random()}><img src={`http://localhost:600/images/${y}`} alt='...' /></SwiperSlide></>
              })
            )
          })
        }
      </Swiper>


      <div className='productmainPage pt-3 pb-3'>
   
         
      
            {
             list.map((x)=>{
                return(
                  <>
                  {/* Top Operview here */}
                  <div className='top-overView'>
                  <div className='container'>
                  <div className='row'>
                    <div className='col-lg-12'>
                    <h1 className="card-title">{x.Sbcth1}</h1>
                
                    {parse(x.SbctDtls)}
                      </div>
                      </div>
                    </div>
                    </div>
                  {/*End  Top Operview here */}



                  <div className='list-details'>
                  <div className='container'>
                    <div className='row'>
                      <div className='col-lg-3'>
                        <Sidebaar />
                      </div>
                      <div className='col-lg-9'>
                      {
                            id === 'tour' ?
                              x.tourpageRefid.map((y) => {
                                return (
                                  //Tour Content Start from here
                                          <div className="card mb-4 rounded-0 shadow-sm border-0">
                                            <div className="row">
                                              <div className="col-lg-4">
                                                <img src={`http://localhost:600/images/${y.tourThumb}`} className="img-fluid" alt="..." />
                                              </div>
                                              <div className="col-lg-6 mt-2 mb-2">
                                                <h2>{y.tourH1} </h2>
                                               <div className='landOverview'>
                                                {parse(y.tourHlView)}
                                                </div>
                                                <div className='landhighlight'>
                                                    {parse(y.tourHlPoint)}
                                                </div> 
                                              
                                              </div>
                                              <div className="col-2 mt-2 mb-2 d-flex flex-wrap p-0">
                                                <div className="align-self-center">
                                                  <Link className="btn btn-primary rounded-0 mb-2" to={`/${x.SbctNavUrl}/${x.SbctUrl}/${y.tourUrl}`}> View More </Link>
                                                  <Link className="btn btn-danger rounded-0 mb-2" to={`/${x.SbctNavUrl}/${x.SbctUrl}/${y.tourUrl}`}> View More </Link>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                  //End Tour Content from here
                                )
                              })
                              :
                              x.dtlspageRefid.map((y) => {
                                console.log(y)
                                return (
                                   //Transport Content Start from here
                                   <div className="card mb-4 rounded-0 shadow-sm border-0">
                                   <div className="row">
                                     <div className="col-lg-4">
                                       <img src={`http://localhost:600/images/${y.transThumb}`} className="img-fluid" alt="..." />
                                     </div>
                                     <div className="col-lg-6 mt-2 mb-2">
                                       <h2>{y.transH1} </h2>
                                      <div className='landOverview'>
                                                {parse(y.transHlView)}
                                                </div>
                                                 <div className='landhighlight'>
                                                    {parse(y.transHlPoint)}
                                                </div>                                      </div>
                                     <div className="col-2 mt-2 mb-2 d-flex flex-wrap">
                                       <div className="align-self-center">
                                         <Link className="btn btn-primary rounded-0 mb-2" to={`/${x.SbctNavUrl}/${x.SbctUrl}/${y.transUrl}`}> View More </Link>
                                         <Link className="btn btn-danger rounded-0 mb-2" to={`/${x.SbctNavUrl}/${x.SbctUrl}/${y.transUrl}`}> View More </Link>
                                       </div>
                                     </div>
                                   </div>
                                 </div>

                                   //end Transport Content From herre
                                )                 
                              })
                              }
                      </div>
                      </div>
                      </div>
                      </div>
                      </>
                )
             })
            }
      
          

      </div>
      <FooterClient />
    </>

  )
}

export default SuperSubPage