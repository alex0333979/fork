import React from 'react'

export interface IFAQ {
  key: string
  question: string
  answer: React.ReactNode
}

export interface IFAQForm {
  email: string
  name: string
  question: string
}
