import PaymentMethod from '@/page-components/cart/components/paymentMethod/PaymentMethod'
import React, { Suspense } from 'react'

function paymentMethodPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading component...</div>}>

        <PaymentMethod />
      </Suspense>
    </div>
  )
}

export default paymentMethodPage
