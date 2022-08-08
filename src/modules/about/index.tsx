import React from 'react'

import Summary from './summary'
import AboutValues from './aboutValues'
import AboutWhatWeDo from './aboutWhatWeDo'
import AboutHistory from './aboutHistory'

const About: React.FC = () => (
  <>
    <Summary />
    <AboutValues />
    <AboutWhatWeDo />
    <AboutHistory />
  </>
)

export default About
