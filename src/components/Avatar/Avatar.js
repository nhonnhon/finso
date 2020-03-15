import React from 'react'
import './Avatar.scss'

const Avatar = ({ src }) => {
  return (
    <div className={`avatar ${src ? 'has-image' : ''}`}>
      <div className="bg-image" style={{ backgroundImage: `url(${src})` }}></div>
    </div>
  )
}

export default Avatar
