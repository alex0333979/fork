import React, { useCallback } from 'react'
import { useRouter } from 'next/router'

import { PAGES } from '@/constants'

import List from './list'
import Add from './add'
import { ApplicationListProps } from './types'

const ApplicationList: React.FC<ApplicationListProps> = ({
  currentId,
  isOpenAddFrom,
  openAddForm,
}) => {
  const router = useRouter()

  const onCreate = useCallback(() => {
    openAddForm(false)
    router.push(PAGES.application.create)
  }, [openAddForm, router])

  return (
    <div className="application-list">
      <div className="container">
        <div className="data-wrap">
          <ul>
            <List currentId={currentId} />
            <Add
              isOpenAddFrom={isOpenAddFrom}
              openAddForm={openAddForm}
              onCreate={onCreate}
            />
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ApplicationList
