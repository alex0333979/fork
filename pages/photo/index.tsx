import { GetServerSideProps } from 'next';

export { default } from './step1';

export const getServerSideProps: GetServerSideProps = async () => ({
  redirect: {
    destination: '/photo/step1',
    permanent: false
  }
});
