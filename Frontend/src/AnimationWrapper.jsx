import React from 'react'
import { motion } from 'framer-motion'

function AnimationWrapper({children}) {
  return (
    <motion.div
        initial={{opacity:0,scale:0.5}}
        animate={{opacity:1,scale:1}}
        transition={{duration:0.7}}
    >
        {children}
    </motion.div>
  )
}

export default AnimationWrapper