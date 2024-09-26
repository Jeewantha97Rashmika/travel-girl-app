import React from 'react'
import ProfileLayout from '../layouts/ProfileLayout'

export default function Profile({user}) {
  return (
    <div>
      <ProfileLayout user={user}/>
    </div>
  )
}
