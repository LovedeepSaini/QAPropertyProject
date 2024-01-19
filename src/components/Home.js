import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

function Home() {

    
  return (
   <>
   <div className= "container">
    

    <section>
    <Carousel> 
      <Carousel.Item>
        <img src=  "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-size" />
        
        <Carousel.Caption>
          <h1 className='carouselColor display-1 font-weight-bold'>QA Properties</h1>
          <p ><emp>34 London Street, WC1</emp> </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src= "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-size" />
        <Carousel.Caption>
          <h3 className='carouselColor display-1 font-weight-bold'>Properties for Sale</h3>
          <p >London, Glasgow, Edinburgh, Manchester</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src= "https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-size" />
        <Carousel.Caption>
          <h3 className='carouselColor display-1 font-weight-bold'>Discounts</h3>
          <p>
            10% in London, 15% in Edinburgh & Glasgow Areas
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </section>
    </div>
   </>
  )
}

export default Home