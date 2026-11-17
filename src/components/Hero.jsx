import React from 'react'
import homeHero from '../assets/images/container.png'
import arrow from '../assets/icons/pointer.png'
export default function Hero({
  bg,
  title,
  desc,
  btn,
  btnContent,
  secondBtn,
  secondBtnContent
}) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 items-center bg-[#F6F3EC] text-[#191919] px-6 sm:px-10 lg:px-[5%] py-12 lg:py-0 min-h-[600px] lg:min-h-[657px]">

      <div className="flex flex-col items-start py-8 lg:py-12 min-w-0">

        <div className="flex items-center gap-4 mb-5">
          <p className="text-[10px] font-inter font-bold tracking-[0.2em]">
            COLLECTION 01
          </p>

          <span className="block w-16 h-px bg-[#F06432]" />
        </div>

        <h1 className="text-7xl sm:text-6xl lg:text-[84px] font-semibold font-heading leading-[0.95] tracking-[-0.05em] mb-8">
          {title}
        </h1>

        <p className="text-[15px] font-inter sm:text-base text-[#706F69] leading-7 max-w-lg  mb-9">
          {desc}
        </p>

        <div className="flex flex-wrap items-center gap-6">

          {btn && (
            <button className="bg-[#F06432] font-inter  text-white px-6 py-4 text-[12px] font-semibold hover:bg-[#191919] transition-colors duration-300">
              {btnContent}
              <span className="ml-5">→</span>
            </button>
          )}

          {secondBtn && (
            <button className="group flex items-center gap-3 border-b border-[#191919] pb-2 font-inter text-[12px]   font-semibold text-[#191919] hover: hover:transition-colors duration-300">
              {secondBtnContent}

              <img
  src={arrow}
  alt=""
  className="w-4 h-4 object-contain transition-transform duration-300 group-hover:translate-x-2"
/>
            </button>
          )}

        </div>
      </div>

      <div className="relative flex justify-center items-center min-w-0 w-full">

        <img
          src={bg || homeHero}
          alt="TechVault electronics collection"
          className="w-full h-auto max-h-[610]  max-w-[581.73] mb-6 mt-6 object-contain"
        />

      </div>

    </section>
  )
}