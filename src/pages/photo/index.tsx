import { GetServerSideProps } from 'next'
import { PAGES } from '@/constants'

export { default } from './take-photo'

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: PAGES.photo.takePhoto,
    permanent: false,
  },
})
