import React from 'react'
import logoUrl from '../icon/Logo.svg'

import './subscriber-splash.css'
const SubscriberSplash = () => {
  return (
    <div className="splash_screen_container subscriber">
      <img src={logoUrl} alt="tempo logo" className="splashscreen-logo " />
      <h1 className="splashscreen-title">START YOUR OWN RADIO STATION!</h1>
    </div>
  )
}

export default SubscriberSplash
