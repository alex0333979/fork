export interface ApplicationListProps {
  isOpenAddFrom: boolean
  currentId: string | null
  openAddForm: (status: boolean) => void
}

export interface ListProps {
  currentId: string | null
}

export interface AddProps {
  isOpenAddFrom: boolean
  openAddForm: (status: boolean) => void
  onCreate: () => void
}
