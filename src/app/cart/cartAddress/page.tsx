
import SpinnerLoader from '@/components/ui/SpinnerLoader/SpinnerLoader'
import SelectAddress from '@/page-components/cart/components/cart-address/SelectAddress'
import React, { Suspense } from 'react'

function cartAddress() {
  return (
    <div>
      <Suspense fallback={
          <div>
            <SpinnerLoader />
          </div>
        }>
        <SelectAddress />
      </Suspense>
    </div>
  )
}

export default cartAddress
