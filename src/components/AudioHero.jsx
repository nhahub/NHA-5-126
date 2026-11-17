import React from 'react'
import audioHero from '../assets/images/hero2.png'
import arrow from '../assets/icons/pointer.png'

export default function AudioHero() {
  return (
    <section className="grid grid-cols-2 min-h-[75vh]">

      <div>
        <img
          src={audioHero}
          alt="Audio collection"
          className="w-full h-full min-h-[75vh] object-cover"
        />
      </div>

      <div className="bg-[#e85d2a] text-white px-12 py-16 flex flex-col justify-center items-start">
        <p className="text-[10px] font-bold tracking-widest mb-5 font-inter ">
          A BETTER KIND OF QUIET
        </p>

        <h1 className="text-[64.11px]  font-medium font-heading  leading-[1.05] mb-8">
          MAKE SPACE
          <br />
          FOR <span className="italic font-serif font-georgia">SOUND.</span>
        </h1>

        <p className="text-[12px] font-inter font-semibold leading-6 max-w-md mb-8">
          From focused work sessions to noisy commutes, our audio
          edit puts clarity, comfort, and character first.
        </p>

        <button className="group inline-flex items-center gap-3 whitespace-nowrap bg-white text-gray-900 px-6 py-4 text-sm hover:bg-gray-100 transition duration-300">
  Shop the audio edit
  <img
    src={arrow}
    alt=""
    className="w-4 h-4 object-contain transition-transform duration-300 group-hover:translate-x-2"
  />
</button>
      </div>

    </section>
  )
}