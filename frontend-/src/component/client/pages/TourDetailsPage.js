import { React, useEffect, useState } from 'react'
import parse from 'html-react-parser';
import HeaderClient from '../Common/HeaderClient';
import FooterClient from '../Common/FooterClient';
import Sidebaar from './sidebaar';
import { useParams } from 'react-router-dom';
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Autoplay, FreeMode, Navigation, Thumbs } from "swiper";


import axios from 'axios';

function TourDetailsPage() {
  const [show, setShow] = useState(false)
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


  }, [id, id2, id3])

  return (

    <>
      <HeaderClient />


      <div className='tour-top-view pt-4'>
        <div className='container'>
          <div className='row'>
            <div className='col-lg-6'>
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
                  autoplay={{ delay: 2000, disableOnInteraction: false }}
                  modules={[Autoplay, FreeMode, Navigation, Thumbs]}
                  className="mySwiper2"
                >
                  {
                    list.map((x) => {
                      return (
                        x.tourSlider.map((y) => {
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
                        x.tourSlider.map((y) => {
                          return <><SwiperSlide key={Math.random()}><img src={`http://localhost:600/images/${y}`} alt='...' /></SwiperSlide></>
                        })
                      )
                    })
                  }
                </Swiper>
              </div>

            </div>
            <div className='col-lg-6'>

              {
                list.map((x) => {
                  return (
                    <>
                      <div className='highlight-details-page-over-view'>
                        <h1>  {x.tourDuration} Days - {x.tourH1}</h1>
                        <div className='tour-details-route'>
                          <strong>Tour Destination</strong><br />
                          {x.tourRoute}
                        </div>
                        <div className='tour-details-point'>
                          <strong>Tour Heighlights</strong><br />
                          {parse(x.tourHlPoint)}
                        </div>

                      </div>
                    </>
                  )
                })
              }



            </div>
          </div>
        </div>
      </div>

      <div className='details-tour-page pt-3 pb-3'>
        {
          list.map((x) => {
            return (
              <>
                <div className='container'>
                  <div className='row'>
                    <div className='col-lg-9'>









                      <div className='details-view-cars pt-3'>


                        <div className='tour-dtls-pag-over-view'>
                          <h2>Tour Over View</h2>
                          {parse(x.tourDtls)}
                        </div>

                        <div className='tour-dtls-pag-over-view pt-3'>
                          <h2>Day Program</h2>

                          <div class="accordion pt-3" id="accordionDayProgram">

                            {x.dayTours.map((y, index) => {
                              return (
                            <>
                                  {index === 0 ?


                                      <div class="accordion-item">
                                      <h4 class="accordion-button" data-bs-toggle="collapse" data-bs-target={`#collapse_${index}`} aria-expanded="true">
                                        Day {index + 1} : {y.dayCont}
                                      </h4>
                                      <div id={`collapse_${index}`} class="accordion-collapse collapse show" data-bs-parent="#accordionDayProgram">
                                        <div class="accordion-body">
                                          {parse(y.dayDtls)}
                                        </div>
                                      </div>
                                      </div>
                                    
                                    
                                    :




                                    <div class="accordion-item">
                                    <h4 class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse_${index}`} aria-expanded="false">
                                      Day {index + 1} : {y.dayCont}
                                    </h4>
                                    <div id={`collapse_${index}`} class="accordion-collapse collapse" data-bs-parent="#accordionDayProgram">
                                      <div class="accordion-body">
                                        {parse(y.dayDtls)}
                                      </div>
                                    </div>
                                  </div>
                                    
                                    
                                    
                                    
                                    }

                                  
                                </>
                              )


                            })}



                            {/* <div class="accordion" id="accordionDayProgram">
  <div class="accordion-item">
      <h4 class="accordion-button" data-bs-toggle="collapse" data-bs-target={`#collapse_1`} aria-expanded="true">
        Accordion Item #1
      </h4>
    <div id={`collapse_1`} class="accordion-collapse collapse show" data-bs-parent="#accordionDayProgram">
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
      <h4 class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse_2`} aria-expanded="false">
        Accordion Item #2
      </h4>
    <div id={`collapse_2`} class="accordion-collapse collapse" data-bs-parent="#accordionDayProgram">
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div class="accordion-item">
      <h4 class="accordion-button collapsed" data-bs-toggle="collapse" data-bs-target={`#collapse_3`} aria-expanded="false">
        Accordion Item #3
      </h4>
    <div id={`collapse_3`} class="accordion-collapse collapse" data-bs-parent="#accordionDayProgram">
      <div class="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div> */}

                          </div>


                        </div>



                      </div>
                    </div>
                    <div className='col-lg-3'>
                      <Sidebaar />
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

export default TourDetailsPage