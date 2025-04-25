import React, { useEffect, useState } from 'react'

interface FadeInProps {
  children: React.ReactNode
  id: any
}
const FadeInText: React.FC<FadeInProps> = ({ children, id }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  const handleScroll = () => {
    const element = document.getElementById(`fade-in-text-${id}`)
    if (element) {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      if (rect.top < windowHeight - 200) {
        setIsVisible(true)
      }
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div id={`fade-in-text-${id}`} className={`fade-in ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  )
}

export default FadeInText
