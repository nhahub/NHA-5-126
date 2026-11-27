import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { clearCart, selectCartItems, selectCartSubtotal } from '../../store/cartSlice'
import ShippingStep from './ShippingStep'
import DeliveryStep from './DeliveryStep'
import ReviewStep from './ReviewStep'
import ConfirmationStep from './ConfirmationStep'
import OrderSummary from './OrderSummary'

export const formatPrice = (price) => `$${Number(price).toFixed(2)}`

const steps = ['Shipping information', 'Delivery & payment', 'Review order']

export default function CheckoutPage() {
  const dispatch = useDispatch()
  const items = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartSubtotal)

  const [step, setStep] = useState(1)
  const [shipping, setShipping] = useState({
    fullName: '', email: '', phone: '', address: '', city: '', postalCode: '', country: 'United States',
  })
  const [delivery, setDelivery] = useState('standard')
  const [payment, setPayment] = useState('card')
  const [order, setOrder] = useState(null)

  const shippingCost = delivery === 'express' ? 18 : 0
  const total = subtotal + shippingCost

  // Nothing to check out -> back to cart
  if (items.length === 0 && !order) return <Navigate to="/cart" replace />

  const placeOrder = () => {
    setOrder({
      reference: `TV-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      items,
      total,
      city: shipping.city,
      postalCode: shipping.postalCode,
      address: shipping.address,
      delivery,
    })
    dispatch(clearCart())
    setStep(4)
  }

  if (step === 4 && order) return <ConfirmationStep order={order} />

  return (
    <div className="bg-ivory text-ink min-h-[calc(100vh-116px)]">
      {/* Progress steps */}
      <div className="px-5 sm:px-10 lg:px-[5%]">
        <div className="max-w-[1280px] mx-auto grid grid-cols-3 gap-4">
          {steps.map((name, i) => (
            <div key={name} className={`border-t-2 pt-3 ${step >= i + 1 ? 'border-signal' : 'border-warmgray'}`}>
              <span className={`text-[10px] font-bold mr-2 ${step >= i + 1 ? 'text-signal' : 'text-muted'}`}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className={`text-xs font-semibold ${step === i + 1 ? 'text-ink' : 'text-muted'}`}>{name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-10 lg:px-[5%] py-10 sm:py-14">
        <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(320px,1fr)] gap-12 lg:gap-24 items-start">
          <section className="max-w-[560px] w-full">
            {step === 1 && (
              <ShippingStep
                shipping={shipping}
                setShipping={setShipping}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <DeliveryStep
                delivery={delivery}
                setDelivery={setDelivery}
                payment={payment}
                setPayment={setPayment}
                onBack={() => setStep(1)}
                onNext={() => setStep(3)}
              />
            )}
            {step === 3 && (
              <ReviewStep
                shipping={shipping}
                delivery={delivery}
                payment={payment}
                items={items}
                onEdit={setStep}
                onBack={() => setStep(2)}
                onPlace={placeOrder}
              />
            )}
          </section>

          <div className="lg:justify-self-end w-full lg:max-w-[360px]">
            <OrderSummary subtotal={subtotal} shippingCost={shippingCost} total={total} />
          </div>
        </div>
      </div>
    </div>
  )
}