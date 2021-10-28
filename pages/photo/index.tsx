import { GetServerSideProps } from 'next';
import { PAGES } from '../../constants';

export { default } from './select-type';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: PAGES.photo.selectType,
    permanent: false
  }
});
