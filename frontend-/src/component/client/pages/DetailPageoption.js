import React from 'react'
import { useParams, Link } from 'react-router-dom';
import DetailsPage from './DetailsPage';
import TourDetailsPage from './TourDetailsPage';

function DetailPageoption() {

    
  let { id } = useParams()
  let { id2 } = useParams()
  let { id3 } = useParams()

  return (
   
    <>
    {id==="tour" ? <TourDetailsPage /> : <DetailsPage /> }
    </>
  )
}

export default DetailPageoption