import React from "react"
import './loader.module.css'

interface Props {
  showFullPage?: boolean
}

const Loader: React.FC<Props> = ({ showFullPage = true }) => {
  return (
    <div style={showFullPage ? {} : {
      position: 'fixed',
      zIndex: 9999999,
      width: '100vw',
      paddingTop: 'calc(50vh - 50px)',
      paddingBottom: '50vh',
      top: 0
    }}
      className={`${showFullPage && "fullPageWrapper"}`}
    >
      <div className="loader"></div>
    </div>
  )
}

export default Loader
