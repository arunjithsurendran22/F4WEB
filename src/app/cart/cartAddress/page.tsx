
import SelectAddress from '@/page-components/cart/components/cart-address/SelectAddress'
import React, { Suspense } from 'react'

function cartAddress() {
  return (
    <div>
      <Suspense fallback={<div>Loading component...</div>}>
        <SelectAddress />
      </Suspense>
    </div>
  )
}

export default cartAddress
