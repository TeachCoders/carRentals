import { React, useEffect, useState } from 'react'
import axios from 'axios'
import HeaderClient from '../Common/HeaderClient';
import FooterClient from '../Common/FooterClient';
import { Link} from 'react-router-dom'
import parse from 'html-react-parser';
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Pagination, Thumbs } from "swiper";

// import { Autoplay, Pagination, Navigation } from "swiper";

function Home() {





  let [SliderBanner, SetAllService] = useState([])
  let [transportType, SetTransportType] = useState([])
  let [transportList, SetTransportList] = useState([])
  let [tourList, SetTourList] = useState([])


  let getData = () => {

    //Api Store in variable
    let sliderApi = 'http://localhost:600/api/category';
    let transportsApi = 'http://localhost:600/api/subCategory/transport';
    let toursApi = 'http://localhost:600/api/subCategory/tour';


    //Api Call in axions
    const sliders = axios.get(sliderApi)
    const transports = axios.get(transportsApi)
    const tours = axios.get(toursApi)



    axios.all([sliders, transports, tours]).then(
      
      axios.spread((... allData)=>{
          SetAllService(allData[0].data)
          SetTransportType(allData[1].data)  
          SetTourList(allData[2].data)
      })
      )


  }

  useEffect(() => {
    getData()

  }, [])



  return (
    <>


      <HeaderClient />





      <Swiper
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

          SliderBanner.map((x) => {
            console.log(x.ctSlider)
            return (
              x.ctSlider.map((y) => {
                return <><SwiperSlide key={Math.random()}><img src={`http://localhost:600/images/${y}`} alt='...' /></SwiperSlide></>
              })
            )
          })
        }
      </Swiper>




      <div className='service-type-bg'>
        <div className='container pt-5 pb-5'>
          <div className='row justify-content-center'>
            <div className='col-lg-12 text-center justify-content-center'><h1 className='pb-4'>Our Services</h1></div>
            <Swiper
              slidesPerView={3}
              spaceBetween={30}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Pagination, Autoplay, Navigation]}
              className="mySwiper">
              {
                SliderBanner.map((x) => {
                  return (                
                      <SwiperSlide  key={Math.random()} >
                        <div className="card">
                          <img  key={Math.random()}  src={`http://localhost:600/images/${x.ctThumb}`} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title"  key={Math.random()}>{x.cth1}</h5>
                            <div style={{textAlign:"left"}}>
                               {parse(x.ctDtls)}
                            </div>
                           
                            <a  key={Math.random()} href={x.ctUrl} className="btn btn-primary">View Details</a>
                          </div>
                        </div> 
                      </SwiperSlide>       
                  )
                })
              }

            </Swiper>
          </div>
        </div>
      </div>





      <div className='service-type-bg'>
        <div className='container pt-5 pb-5'>
          <div className='row'>
            <div className='col-lg-12 text-center justify-content-center'><h1 className='pb-4'>Transport Services</h1></div>

          <Swiper
              slidesPerView={3}
              spaceBetween={20}
              loop={true}
              loopFillGroupWithBlank={true}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Pagination, Autoplay, Navigation]}
              className="mySwiper">
              {
                transportType.map((x) => {
                  return (
                      <SwiperSlide key={Math.random()} >
                      <div className="card text-start">
                        <img  key={Math.random()} src={`http://localhost:600/images/${x.SbctThumb}`} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5  key={Math.random()} className="card-title">{x.Sbcth1}</h5> 
                                <ul>                              
                                  {
                                    x.dtlspageRefid.map((y)=>{
                                      return(<li key={Math.random()}> <Link to={`${x.SbctNavUrl}/${x.SbctUrl}/${y.transUrl}`}>{y.transNav} </Link></li>)
                                    })
                                  }
                                </ul>
                                <a  key={Math.random()} href={x.SbctUrl} className="btn btn-primary  text-center justify-content-center">View Details</a>                     
                          </div>
                      </div>
                      </SwiperSlide>

                  )
                })
              }

            </Swiper>
          </div>
        </div>
      </div>

      <div className='service-type-bg'>
        <div className='container pt-5 pb-5'>
          <div className='row'>
            <div className='col-lg-12 text-center justify-content-center'><h1 className='pb-4'>Tour Services</h1></div>
              <Swiper
                  slidesPerView={4}
                  spaceBetween={15}
                  loop={true}
                  loopFillGroupWithBlank={true}
                  pagination={{
                    clickable: true,
                  }}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: false,
                  }}
                  navigation={true}
                  modules={[Pagination, Autoplay, Navigation]}
                  className="mySwiper">
                  {
                    tourList.map((x) => {
                      return (
                          <SwiperSlide key={Math.random()} >
                          <div className="card text-start">
                            <img  key={Math.random()} src={`http://localhost:600/images/${x.SbctThumb}`} className="card-img-top" alt="..." />
                            <div className="card-body">
                              <h5  key={Math.random()} className="card-title">{x.Sbcth1}</h5>
                                  <ul>
                                   {
                                      x.tourpageRefid.map((y)=>{
                                        return(<li  key={Math.random()}> <Link to={`${x.SbctNavUrl}/${x.SbctUrl}/${y.tourUrl}`}>  {y.tourNav} </Link></li>)
                                      })
                                    } 
                                  </ul>
                                  <Link key={Math.random()} to={`${x.SbctNavUrl}/${x.SbctUrl}`} className="btn btn-primary  text-center justify-content-center">View Details</Link>    
                                 
                            </div>
                          </div>
                          </SwiperSlide>
                      )
                    })
                  }
                </Swiper>
          </div>
        </div>
      </div>






      <FooterClient />
    </>
  )
}

export default Home