import React from 'react'
import Hero from '../../components/Hero'
import Featured from '../../components/Featured.jsx'
import homeHero from '../../assets/images/container.png'
import sony from '../../assets/images/sony.png'
import nothing from '../../assets/images/nothing.png'
import apple from '../../assets/images/apple.png'
import google from '../../assets/images/google.png'
import AudioHero from '../../components/AudioHero'
import NewArrivals from '../../components/NewArrivals'
export default function Home() {

  const products = [
    {
      id: 1,
      brand: 'SONY',
      name: 'WH-1000XM5 Wireless',
      price: '$349.00',
      oldPrice: '$399.00',
      rating: '4.8',
      reviews: '284',
      label: 'BESTSELLER',
      image: sony
    },
    {
      id: 2,
      brand: 'NOTHING',
      name: 'Ear (2) True Wireless',
      price: '$129.00',
      oldPrice: '',
      rating: '4.6',
      reviews: '156',
      label: 'NEW',
      image: nothing
    },
    {
      id: 3,
      brand: 'APPLE',
      name: 'Watch Series 9 GPS',
      price: '$399.00',
      oldPrice: '$429.00',
      rating: '4.9',
      reviews: '421',
      label: 'STAFF PICK',
      image: apple
    },
    {
      id: 4,
      brand: 'GOOGLE',
      name: 'Pixel 8 Pro 256GB',
      price: '$799.00',
      oldPrice: '$899.00',
      rating: '4.7',
      reviews: '312',
      label: 'SAVE $100',
      image: google
    }
  ]

  return (
    <>
      <Hero
        bg={homeHero}
        title={
          <>
            GOOD TECH.
            <br />
            <span className="text-[#d66b45] italic font-georgia ">
              GREAT
            </span>
            <br />
            CHOICES.
          </>
        }
        desc="Discover devices designed to fit your work, your play, and everything in between."
        btn={true}
        btnContent="Explore products"
        secondBtn={true}
        secondBtnContent="Browse categories"
      />
            <div className="bg-[#F6F3EC] min-h-[1100px]" />


      <Featured
        products={products}
        title="FEATURED NOW"
        desc="Good design, useful features, fair value. These are the products earning a place in our edit."
      />
      <AudioHero />
      <NewArrivals />
      
    </>
  )
}