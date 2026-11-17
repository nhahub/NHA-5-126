import { useEffect, useState } from 'react'
import Hero from '../../components/Hero'
import Featured from '../../components/Featured.jsx'
import homeHero from '../../assets/images/Container.png'
import AudioHero from '../../components/AudioHero'
import NewArrivals from '../../components/NewArrivals'
import { productService } from '../../Helpers/productService'

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const loadProducts = async () => {
      try {
        const fetchedProducts = await productService.getAllProducts(controller.signal)
        setProducts(fetchedProducts.slice(0, 4))
      } catch (requestError) {
        if (controller.signal.aborted) return
        setError(requestError.message)
      } finally {
        if (!controller.signal.aborted) setLoading(false)
      }
    }

    loadProducts()

    return () => controller.abort()
  }, [])

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
        loading={loading}
        error={error}
        title="FEATURED NOW"
        desc="Good design, useful features, fair value. These are the products earning a place in our edit."
      />
      <AudioHero />
      <NewArrivals />
    </>
  )
}
