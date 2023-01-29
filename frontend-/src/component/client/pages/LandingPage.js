import { React, useEffect, useState } from 'react'
//import parse from 'html-react-parser';
import HeaderClient from '../Common/HeaderClient';
import FooterClient from '../Common/FooterClient';
import { useParams, Link, useNavigate } from 'react-router-dom';
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, Navigation, Pagination } from "swiper";
import axios from 'axios';
function SuperSubPage() {
  let navigate = useNavigate()
  let { id } = useParams()




  //state definfe
  let [list, setList] = useState([])







  useEffect(() => {
    let getData = async () => {
      //Api Calling
      const transports = axios.get(`http://localhost:600/api/subCategory/${id}`)
      //Axios Method use
      await axios.all([transports]).then(
        axios.spread((...allData) => {

          if(allData[0].data[0]){
             setList(allData[0].data)
          }
          else{          
            navigate('/notfound')
          }
        
        })
      )
    }
    getData()
  }, [id])

  
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
        <div className='container'>
          <div className='row'>
            {
              list.map((x) => {
                return (
                  <div key={Math.random()} className='col-lg-4 mb-4'>
                    <div className="card text-start">
                      <img key={Math.random()} src={`http://localhost:600/images/${x.SbctThumb}`} className="card-img-top" alt="..." />
                      <div className="card-body">
                        <h5 className="card-title">{x.Sbcth1}</h5>
                        <ul>
                          {
                            id === 'tour' ?
                              x.tourpageRefid.map((y) => {
                                return (<li key={Math.random()}> <Link to={`/${x.SbctNavUrl}/${x.SbctUrl}/${y.tourUrl}`}>{y.tourH1} </Link></li>)
                              })
                              :
                              x.dtlspageRefid.map((y) => {
                                return (<li key={Math.random()}> <Link to={`/${x.SbctNavUrl}/${x.SbctUrl}/${y.transUrl}`}>{y.transNav} </Link></li>)
                              })
                              }
                        </ul>
                        <Link key={Math.random()} to={`/${x.SbctNavUrl}/${x.SbctUrl}`} className="btn btn-primary  text-center justify-content-center">View Details</Link>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <FooterClient />
    </>

  )
}

export default SuperSubPage