import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/auth';
import {
  CartItemInput,
  FieldType,
  Form,
  FormStep,
  ProductType,
  useAddItemsToCartMutation,
  useRemoveItemsFromCartMutation,
  useSubmitEntryMutation,
  ValidationType
} from '@/generated/graphql';
import ApplicationList from '@/components/application/applicationList';
import classNames from 'classnames';
import RadioOption from '@/components/application/radioOption';
import TextInput from '@/components/application/textInput';
import CountryPicker from '@/components/application/countryPicker';
import StatePicker from '@/components/application/statePicker';
import DatePicker from '@/components/application/datePicker';
import SelectBox from '@/components/application/selectBox';
import { useRouter } from 'next/router';
import PhoneInput from '@/components/application/phoneInput';
import { isPossiblePhoneNumber } from 'react-phone-number-input';
import ProcessStep, { ProcessStepProps } from '@/components/elements/processStep';
import ApplicationToolbar from '@/components/elements/applicationToolbar';

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

interface ValidationError {
  [key: string]: string;
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

  const { savedEntries, saveEntry, removeEntry, updateCart } = useAuth();
  const [submitEntry] = useSubmitEntryMutation();
  const [addToCart] = useAddItemsToCartMutation();
  const [removeFromCart] = useRemoveItemsFromCartMutation();

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
      const firstNameField = formStep?.fields.find((f) => f.name === 'first_name');
      const firstName = firstNameField ? firstNameField.value : '';
      const lastNameField = formStep?.fields.find((f) => f.name === 'last_name');
      const lastName = lastNameField ? lastNameField.value : '';
      return `${firstName} ${lastName}`;
    }
    return '';
  }, [formStep?.fields, step]);

  const onRemoveCartItem = useCallback(
    (id: string) => {
      removeFromCart({ variables: { ids: [id] } }).then();
    },
    [removeFromCart]
  );

  useEffect(() => {
    setFormStep(entry.form.steps.find((s) => s.step === step));
    setCountry('US');
  }, [entry.form.steps, formStep, step]);

  const deleteEntry = useCallback(
    (id: string | null) => {
      if (id) {
        onRemoveCartItem(id);
      }
      removeEntry(id);
    },
    [onRemoveCartItem, removeEntry]
  );

  const selectForm = useCallback(
    (formId: string) => {
      router.push(`/application/create?formId=${formId}`).then();
    },
    [router]
  );

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

  const validateForm = useCallback((): ValidationError => {
    if (!formStep) {
      return {};
    }
    const error: ValidationError = {};
    for (const field of formStep.fields) {
      if (field.required && (field.value == null || field.value === '')) {
        error[field.name] = `This field is required.`;
        continue;
      }
      if (field.options && (field.type === FieldType.Radio || field.type === FieldType.Select)) {
        const a = field.options.find((x) => x.value === field.value);
        if (!a) {
          error[field.name] = `This should be one of Options`;
          continue;
        }
      }
      if (field.type === FieldType.CheckBox && typeof field.value !== 'boolean') {
        error[field.name] = `This should be boolean type`;
        continue;
      }

      if (field.validations) {
        field.validations.forEach((v) => {
          field.value = field.value ?? '';
          switch (v.type) {
            case ValidationType.IsEmail:
              if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(field.value.toString())) {
                error[field.name] = `This should be email format.`;
              }
              break;
            case ValidationType.IsPhone:
              if (!isPossiblePhoneNumber(field.value.toString())) {
                error[field.name] = `This should have US phone number type.`;
              }
              break;
            case ValidationType.MaxLength:
              const maxLength = v.value || 0;
              if (field.value.toString().length > maxLength) {
                error[field.name] = `This should have less than ${maxLength} length`;
              }
              break;
            case ValidationType.MinLength:
              const minLength = v.value || 0;
              if (field.value.toString().length < minLength) {
                error[field.name] = `This should have longer than ${minLength} length`;
              }
              break;
            case ValidationType.Max:
              const max = v.value || 0;
              if (Number(field.value) > max) {
                error[field.name] = `This should have less than ${max}`;
              }
              break;
            case ValidationType.Min:
              const min = v.value || 0;
              if (Number(field.value) > min) {
                error[field.name] = `This should have greater than ${min}`;
              }
              break;
            case ValidationType.Nullable:
              break;
          }
        });
      }
    }
    return error;
  }, [formStep]);

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
    const error = validateForm();
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
          saveEntry(result.id);
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
    validateForm,
    submitEntry,
    entry.id,
    entry.formId,
    saveEntry,
    step,
    onAddToCartItem,
    entityUsername,
    router
  ]);

  return (
    <div className="application-page">
      <ApplicationList
        ids={savedEntries}
        currentId={entry.id}
        isOpenAddFrom={isOpenAddForm}
        openAddForm={setIsOpenAddForm}
        deleteEntry={deleteEntry}
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
                      <label>
                        <span className="field checkbox">
                          <span className="name">{'Unknown'}</span>
                          <input type="checkbox" placeholder="Male" />
                          <span className="wrap">
                            <span className="bullet" />
                            <span className="border" />
                          </span>
                        </span>
                        <span className="warning">{'Warning message'}</span>
                      </label>
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
                              step={step}
                              key={`${index}_${step}`}
                              formField={field}
                              onValueChange={onValueChange}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.Input:
                          return (
                            <TextInput
                              step={step}
                              key={`${index}_${step}`}
                              formField={field}
                              onValueChange={onValueChange}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.PhoneInput:
                          return (
                            <PhoneInput
                              step={step}
                              key={`${index}_${step}`}
                              formField={field}
                              onValueChange={onValueChange}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.Select:
                          return (
                            <SelectBox
                              step={step}
                              key={`${index}_${step}`}
                              formField={field}
                              onValueChange={onValueChange}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.CountryPicker:
                          return (
                            <CountryPicker
                              step={step}
                              key={`${index}_${step}`}
                              formField={field}
                              selectedCountry={onSelectedCountry}
                              error={error[field.name]}
                            />
                          );
                        case FieldType.StatePicker:
                          return (
                            <StatePicker
                              step={step}
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
                              step={step}
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
          backLink={step > 0 ? `/application/${entry.id}/${step - 1}` : undefined}
          loading={loading}
          blur={isOpenAddForm}
          onNext={onSubmit}
        />
      </div>
    </div>
  );
};

export default ApplicationForm;
