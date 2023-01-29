import { React, useEffect, useState } from 'react'
import parse from 'html-react-parser';
import HeaderClient from '../Common/HeaderClient';
import FooterClient from '../Common/FooterClient';
import Sidebaar from './sidebaar';
import { useParams} from 'react-router-dom';
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";


import axios from 'axios';
function DetailsPage() {
  const [thumbsSwiper, setThumbsSwiper] = useState();
  let { id } = useParams()
  let { id2 } = useParams()
  let { id3 } = useParams()



  //state definfe
  let [list, setList] = useState([])




    


  useEffect(() => {
    
    let getData = async () => {
      const transports = axios.get(`http://localhost:600/api/subCategory/${id}/${id2}/${id3}`)
      await axios.all([transports]).then(
        axios.spread((...allData) => {
          setList(allData[0].data)
        })
      )
    }  
    getData()


  },[id, id2, id3])

  return (

    <>
      <HeaderClient />


      <div className='details-transport-page pt-3 pb-3'>
            {
             list.map((x)=>{
                return(
                  <>
                    <div className='container'>
                    <div className='row'>
                      <div className='col-lg-9'>

                        {/* thumbnail slider start from here */}
                       <div className='thumb-slider pb-3'>
                            <Swiper
                                style={{
                                  "--swiper-navigation-color": "#fff",
                                  "--swiper-pagination-color": "#fff",      
                                }}
                                  loop={true}
                                  spaceBetween={10}
                                  navigation={true}
                                  autoHeight={true}
                                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                  autoplay={{delay: 2000, disableOnInteraction: false}}
                                  modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                                  className="mySwiper2"
                                >
                                  {
                                    list.map((x) => {
                                      return (
                                        x.transSlider.map((y) => {
                                          return <><SwiperSlide key={Math.random()}><img src={`http://localhost:600/images/${y}`} alt='...' /></SwiperSlide></>
                                        })
                                      )
                                    })
                                  }
                            </Swiper>
                            <Swiper
                                  onSwiper={setThumbsSwiper}
                                  loop={true}
                                  spaceBetween={10}
                                  slidesPerView={6}
                                  grabCursor={true}
                                  freeMode={true}
                                  autoHeight={true}
                                  watchSlidesProgress={true}
                                  autoplay={{
                                    delay: 2000,
                                    disableOnInteraction: false,
                                  }}
                                  modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                                  className="mySwiper">
                                  {
                                    list.map((x) => {
                                      return (
                                        x.transSlider.map((y) => {
                                          return <><SwiperSlide key={Math.random()}><img src={`http://localhost:600/images/${y}`} alt='...' /></SwiperSlide></>
                                        })
                                      )
                                    })
                                  }
                            </Swiper>
                      </div>
                        {/*end  thumbnail slider start from here */}






                        <div className='details-view-cars pt-3'>


                          <h1>{x.transH1}</h1>

                                  <div className='serviceHlightView'>
                                       {parse(x.transHlView)}
                                  </div>

                                  <div className='serviceHlightView'>
                                  {parse(x.transHlPoint)}
                                  </div>
                         


                          {parse(x.transDtls)}

                          </div>
                      </div>
                      <div className='col-lg-3'>
                          <Sidebaar  />
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

export default DetailsPage