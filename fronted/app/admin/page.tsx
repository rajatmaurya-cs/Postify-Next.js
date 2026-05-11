import React from 'react'
import { Suspense } from 'react'

import StatusServer from '../admin/dashboard/StatusServer'

import BlogServer from '../admin/dashboard/BlogServer'

const Page = () => {
  return (
    <div>

       <Suspense fallback={<p>Loading Status...</p>}>
        <StatusServer />
      </Suspense>

      <Suspense fallback={<p>Loading Blogs...</p>}>
        <BlogServer />
      </Suspense>

     
    </div>
  )
}

export default Page
