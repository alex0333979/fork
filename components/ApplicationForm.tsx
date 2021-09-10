import React from 'react';
import { Form } from '@/generated/graphql';

type ApplicationFormProps = {
  id: string | undefined;
  forms: Form[]
};
const ApplicationForm: React.FC<ApplicationFormProps> = ({ id, forms }) => {
  return (
    <>
      {id} {forms[0].name}
    </>
  );
};

export default ApplicationForm;
