//page.tsx the routing Should be lowercase based on convention not configuration Delete
//If I add any other files to this folder users page will not be accessible
// If we do a click event or form this has to be on the client side because servers don't handle that; they listened for it
"use client"
import React from 'react'
import { useRouter } from 'next/navigation'//'next/router'has been updated

const NewUserPage = () => {
  const router = useRouter();
  return (
    // In the onclick function you can't use link so you have to use programic routing. So we're going to use router Object. we have a hook called useRouter()
    <button className="btn btn-primary" onClick={() => router.push('/users')}>Create</button>
  )
}

export default NewUserPage
