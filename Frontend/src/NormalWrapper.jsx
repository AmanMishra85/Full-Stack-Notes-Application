import React from 'react'
import { motion } from 'framer-motion'

function NormalWrapper({children}) {
  return (
    <motion.div
        initial={{opacity:0.6}}
        animate={{opacity:1}}
        transition={{duration:0.3}}
    >
        {children}
    </motion.div>
  )
}

export default NormalWrapper