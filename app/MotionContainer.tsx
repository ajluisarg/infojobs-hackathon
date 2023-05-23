'use client'

import * as React from 'react'
import { PanInfo, motion, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

import './MotionContainer.css'

type Props = {
  onSwipe: (side: 'left' | 'right') => void
  children: React.ReactNode
}

export const MotionContainer = ({ onSwipe, children }: Props) => {
  const x = useMotionValue(0)
  const xInput = [-100, 0, 100]
  const background = useTransform(x, xInput, [
    'linear-gradient(180deg, #ff9e8e 0%, #a62520 100%)',
    'linear-gradient(180deg, #A7def1 0%, #5ca4cd 100%)',
    'linear-gradient(180deg, #8ae287 0%, #2d8f2f 100%)',
  ])
  const color = useTransform(x, xInput, [
    'rgb(211, 9, 225)',
    '#FFFFFF',
    'rgb(3, 209, 0)',
  ])
  const tickPath = useTransform(x, [10, 100], [0, 1])
  const crossPathA = useTransform(x, [-10, -55], [0, 1])
  const crossPathB = useTransform(x, [-50, -100], [0, 1])

  const handleOnDragEnd = (info: PanInfo) => {
    if (info.offset.x < -205) onSwipe('left')
    if (info.offset.x > 205) onSwipe('right')
  }

  return (
    <motion.div
      className="flex flex-col gap-1 justify-center items-center w-screen h-screen"
      style={{ background }}
    >
      <header className="flex gap-4 items-center">
        <Image
          src="infojobs-logo.svg"
          alt="infojobs logo"
          width={100}
          height={50}
        />
        <h3 className="font-bold text-white">Swipe</h3>
        <div className="w-10 h-10 flex items-center">
          <svg className="progress-icon" viewBox="0 0 50 50">
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
              style={{ translateX: 5, translateY: 5 }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M14,26 L 22,33 L 35,16"
              strokeDasharray="0 1"
              style={{ pathLength: tickPath }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M17,17 L33,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathA }}
            />
            <motion.path
              fill="none"
              strokeWidth="2"
              stroke={color}
              d="M33,17 L17,33"
              strokeDasharray="0 1"
              style={{ pathLength: crossPathB }}
            />
          </svg>
        </div>
      </header>
      <motion.div
        className="content flex flex-col w-12"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_event, info) => handleOnDragEnd(info)}
      >
        {children}
        <div className="bg-white rounded-b-xl	w-20 flex justify-center items-center"></div>
      </motion.div>
    </motion.div>
  )
}
