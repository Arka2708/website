import React from 'react'
import './styles.scss'
import Icon from "../Icon/index";

export const BottomCallout = ({children, className }) => (
  <section 
    className={`${className ? className : "" } BottomCallout bg-blue section text-white py4`}>
    <div className="container">
    <div className="columns justify-around ">
      {children}
    </div>
    </div>
  </section>
  
)

export const Callout = ({icon, description, children, className}) => (
  <div className={`${className ? className : "" } Callout `}>
    <Icon size={32} img={icon} />
    <div className="py3 text-white">
      {description}
    </div>
    {children}
  </div>
)


export default BottomCallout