import { useState } from 'react'

const inputClass = 'w-full h-12 px-3 bg-white border border-warmgray text-sm outline-none focus:border-ink'

function Field({ label, name, required, type = 'text', value, onChange, error, className = '' }) {
  return (
    <div className={className}>
      <label htmlFor={name} className="block text-[11px] text-muted mb-2">
        {label} {required && <span className="text-signal">*</span>}
      </label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} className={`${inputClass} ${error ? 'border-signal' : ''}`} />
      {error && <p className="text-[11px] text-signal mt-1">{error}</p>}
    </div>
  )
}

export default function ShippingStep({ shipping, setShipping, onNext }) {
  const [errors, setErrors] = useState({})

  const handleChange = (e) => setShipping({ ...shipping, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const required = ['fullName', 'email', 'phone', 'address', 'city', 'postalCode']
    const newErrors = {}
    required.forEach((key) => {
      if (!shipping[key].trim()) newErrors[key] = 'Required'
    })
    if (shipping.email && !/^\S+@\S+\.\S+$/.test(shipping.email)) newErrors.email = 'Enter a valid email'
    setErrors(newErrors)
    if (Object.keys(newErrors).length === 0) onNext()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <p className="label-editorial text-signal mb-3">Step 01</p>
      <h1 className="font-heading text-[clamp(3rem,7vw,5rem)] font-bold leading-[0.9] tracking-[-0.06em] uppercase mb-10">
        Where should we send it?
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
        <Field label="Full name" name="fullName" required value={shipping.fullName} onChange={handleChange} error={errors.fullName} />
        <Field label="Email address" name="email" required type="email" value={shipping.email} onChange={handleChange} error={errors.email} />
        <Field label="Phone number" name="phone" required type="tel" value={shipping.phone} onChange={handleChange} error={errors.phone} />
        <div className="hidden sm:block" />
        <Field label="Street address" name="address" required className="sm:col-span-2" value={shipping.address} onChange={handleChange} error={errors.address} />
        <Field label="City" name="city" required value={shipping.city} onChange={handleChange} error={errors.city} />
        <Field label="Postal code" name="postalCode" required value={shipping.postalCode} onChange={handleChange} error={errors.postalCode} />
        <div className="sm:col-span-2">
          <label htmlFor="country" className="block text-[11px] text-muted mb-2">Country</label>
          <select id="country" name="country" value={shipping.country} onChange={handleChange} className={inputClass}>
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
            <option>Egypt</option>
            <option>Germany</option>
            <option>France</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end mt-8">
        <button type="submit" className="h-12 px-8 bg-signal text-white text-sm font-semibold hover:bg-ink transition-colors">
          Continue <span className="ml-2">→</span>
        </button>
      </div>
    </form>
  )
}