import React from 'react'
import loadingIcon from "@/assets/Images/Loading.gif"
function Loading() {
  return (
    <div className='w-screen h-screen fixed top-0 left-0 z-50 flex justify-center items-center'>
        <img src={loadingIcon} width={100} />
      
    </div>
  )
}

export default Loading
