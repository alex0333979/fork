import React, { useEffect } from 'react';
import { Form, useCreateGuestMutation } from '@/generated/graphql';

type ApplicationFormProps = {
  id: string | undefined;
  forms: Form[]
};
const ApplicationForm: React.FC<ApplicationFormProps> = ({ id, forms }) => {
  const [createGuestMutation, { data, loading, error }] = useCreateGuestMutation({
    variables: {}
  });

  useEffect(() => {
    (async () => {
      await createGuestMutation();
    })()
    console.log('===data==', data);
    console.log('===error==', error);
  }, [createGuestMutation]);

  return (
    <>
      {id} {forms[0].name}
    </>
  );
};

export default ApplicationForm;
