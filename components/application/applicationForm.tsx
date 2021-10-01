import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/auth';
import {
  CartItemInput,
  FieldType,
  Form,
  FormStep,
  ProductType,
  useAddItemsToCartMutation,
  useSubmitEntryMutation
} from '@/generated/graphql';
import ApplicationList from '@/components/application/applicationList';
import classNames from 'classnames';
import RadioOption from '@/components/elements/radioOption';
import TextInput from '@/components/elements/textInput';
import CountryPicker from '@/components/elements/countryPicker';
import StatePicker from '@/components/elements/statePicker';
import DatePicker from '@/components/elements/datePicker';
import SelectBox from '@/components/elements/selectBox';
import { useRouter } from 'next/router';
import PhoneInput from '@/components/elements/phoneInput';
import ProcessStep, { ProcessStepProps } from '@/components/elements/processStep';
import ApplicationToolbar from '@/components/elements/applicationToolbar';
import { formValidation, ValidationError } from '@/lib/utils/formValidation';
import CheckBox from '@/components/elements/checkBox';

interface ApplicationFormProps {
  forms: Form[];
  entry: IEntry;
  step: number;
}

interface IEntry {
  id: string | null;
  currentStep: number;
  form: Form;
  formId: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ forms, entry, step }) => {
  const router = useRouter();
  const [formStep, setFormStep] = useState<FormStep | undefined>(
    entry.form.steps.find((s) => s.step === step)
  );
  const [country, setCountry] = useState<string>('US');
  const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);
  const [error, setError] = useState<ValidationError>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [unknown, setUnknown] = useState<boolean>(false);

  const { updateCart } = useAuth();
  const [submitEntry] = useSubmitEntryMutation();
  const [addToCart] = useAddItemsToCartMutation();

  const process: ProcessStepProps = useMemo(
    () => ({
      title: entry.form.description,
      step,
      steps: entry.form.steps.map((s) => ({
        name: s.name,
        step: s.step
      }))
    }),
    [entry.form.description, entry.form.steps, step]
  );

  const entityUsername = useMemo(() => {
    if (step === 1) {
      const a = formStep?.fields.find((f) => f.name === 'first_name');
      const b = formStep?.fields.find((l) => l.name === 'last_name');
      return `${a?.value ?? ''} ${b?.value ?? ''}`;
    }
    return '';
  }, [formStep?.fields, step]);

  useEffect(() => {
    setFormStep(entry.form.steps.find((s) => s.step === step));
    setCountry('US');
  }, [entry.form.steps, formStep, step]);

  const selectForm = useCallback(
    (formId: string) => {
      router.push(`/application/create?formId=${formId}`).then();
    },
    [router]
  );

  const onChangeUnknown = useCallback((status: boolean) => {
    setUnknown(status);
  }, []);

  const onValueChange = useCallback(
    (name: string, value: string | number | boolean | undefined) => {
      if (!formStep) {
        return;
      }
      const fieldIndex = formStep.fields.findIndex((field) => field.name === name);
      if (fieldIndex === -1) {
        return;
      }
      formStep.fields[fieldIndex].value = value;
      setFormStep(formStep);
      setError({});
    },
    [formStep]
  );

  const onSelectedCountry = useCallback(
    (name: string, value: string) => {
      onValueChange(name, value);
      setCountry(value);
    },
    [onValueChange]
  );

  const onAddToCartItem = useCallback(
    (cartItem: CartItemInput) => {
      setLoading(true);
      addToCart({
        variables: {
          cartItems: [cartItem]
        }
      }).then(({ data: cData }) => {
        setLoading(false);
        const cart = cData?.AddItemsToCart.data;
        if (cart) {
          updateCart(cart);
          router.push(`/application/${cartItem.productId}/${step + 1}`).then();
        }
      });
    },
    [addToCart, router, step, updateCart]
  );

  const onSubmit = useCallback(() => {
    if (!formStep) {
      return;
    }
    const error = formValidation(formStep.fields);
    setError(error);
    if (Object.keys(error).length > 0) {
      return;
    }
    setLoading(true);
    submitEntry({
      variables: { entryId: entry.id, formId: entry.formId, formStep }
    }).then(({ data, errors }) => {
      setLoading(false);
      if (data) {
        const result = data.SubmitEntry.data;
        if (result) {
          if (step === 1) {
            onAddToCartItem({
              name: entityUsername,
              description: 'Passport application',
              product: ProductType.PassportApplication,
              productId: result.id
            });
          } else {
            router.push(`/application/${result.id}/${step + 1}`).then();
          }
        }
      }
      console.log('===errors===', errors);
    });
  }, [
    formStep,
    submitEntry,
    entry.id,
    entry.formId,
    step,
    onAddToCartItem,
    entityUsername,
    router
  ]);

  return (
    <div className="application-page">
      <ApplicationList
        currentId={entry.id}
        isOpenAddFrom={isOpenAddForm}
        openAddForm={setIsOpenAddForm}
      />
      <div className="floating-wrap">
        <div className={classNames('application-form', { blur: isOpenAddForm })}>
          <div className="container">
            <div className="data-wrap">
              <ProcessStep title={process.title} step={process.step} steps={process.steps} />
              <div className="form-wrap">
                {formStep?.notes ? (
                  <div className="form-fields">
                    <div className="form-notice">
                      <p>
                        {formStep.notes}
                        <span className="icon-info" />
                      </p>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                {step === 1 ? (
                  <div className="form-fields">
                    <div className="extra-info">
                      <h3>{'Before start, please select an application type'}</h3>
                      <CheckBox text={'Unknown'} value={unknown} onChange={onChangeUnknown} />
                    </div>
                    <div className="group">
                      {forms.map((form, index) => (
                        <label
                          key={index}
                          className={classNames({
                            'third-size': forms.length > 2,
                            'half-size': !(forms.length > 2)
                          })}>
                          <span className="field radio">
                            <span className="name">
                              <b>{form.name}</b>
                              <i className="icon-about" />
                            </span>
                            <span className="extra">{form.description}</span>
                            <input
                              type="radio"
                              name="application"
                              checked={form.id === entry.formId}
                              onChange={() => selectForm(form.id)}
                            />
                            <span className="wrap">
                              <span className="bullet" />
                              <span className="border" />
                            </span>
                          </span>
                          <span className="warning">Warning message</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ) : (
                  <></>
                )}
                <form>
                  <div className="form-fields">
                    {formStep?.fields.map((field, index) => {
                      switch (field.type) {
                        case FieldType.Radio:
                          return (
                            <RadioOption
                              key={`${index}_${step}`}
                              formField={field}
                              onValueChange={onValueChange}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.Input:
                          return (
                            <TextInput
                              key={`${index}_${step}`}
                              formField={field}
                              onValueChange={onValueChange}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.PhoneInput:
                          return (
                            <PhoneInput
                              key={`${index}_${step}`}
                              formField={field}
                              onValueChange={onValueChange}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.Select:
                          return (
                            <SelectBox
                              key={`${index}_${step}`}
                              formField={field}
                              onValueChange={onValueChange}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.CountryPicker:
                          return (
                            <CountryPicker
                              key={`${index}_${step}`}
                              formField={field}
                              selectedCountry={onSelectedCountry}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.StatePicker:
                          return (
                            <StatePicker
                              key={`${index}_${step}`}
                              formField={field}
                              selectedState={onValueChange}
                              country={country}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.DatePicker:
                          return (
                            <DatePicker
                              key={`${index}_${step}`}
                              formField={field}
                              onValueChange={onValueChange}
                              error={error[field.name]}
                            />
                          );
                      }
                    })}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <ApplicationToolbar
          backLink={step > 1 ? `/application/${entry.id}/${step - 1}` : undefined}
          loading={loading}
          blur={isOpenAddForm}
          onNext={onSubmit}
        />
      </div>
    </div>
  );
};

export default ApplicationForm;
