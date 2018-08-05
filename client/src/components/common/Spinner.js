import React from 'react'
import spinnerGif from '../../img/spinner.gif'

export default () => {
  return (
    <div>
      <img
        src={spinnerGif}
        style={{ width: '50px', margin: 'auto', display: 'block' }}
        alt="Loading..."
      />
    </div>
  )
}
