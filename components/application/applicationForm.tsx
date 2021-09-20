import React, { useCallback, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { FieldType, Form, FormStep, useSubmitEntryMutation } from '@/generated/graphql';
import ApplicationList from '@/components/application/applicationList';
import classNames from 'classnames';
import RadioOption from '@/components/application/radioOption';
import TextInput from '@/components/application/textInput';
import CountryPicker from '@/components/application/countryPicker';
import StatePicker from '@/components/application/statePicker';
import DatePicker from '@/components/application/datePicker';
import SelectBox from '@/components/application/selectBox';
import removeTypename from '@naveen-bharathi/remove-graphql-typename';
import Link from 'next/link';
import { useRouter } from 'next/router';

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
  const [isNewEntry, setIsNewEntry] = useState<boolean>(false);

  const { savedEntries, saveEntry, removeEntry } = useAuth();
  const [submitEntry] = useSubmitEntryMutation();

  const createEntry = useCallback(() => {
    console.log('===createEntry===');
    setIsNewEntry(true);
    setIsOpenAddForm(false);
  }, []);

  const deleteEntry = useCallback(
    (id: string | null) => {
      console.log('====delete entry====', id);
      if (!id) {
        setIsNewEntry(false);
      } else {
        removeEntry(id);
      }
    },
    [removeEntry]
  );

  const selectForm = useCallback((formId: string) => {
    console.log(formId);
  }, []);

  const onValueChange = useCallback(
    (name: string, value: string | number | undefined) => {
      if (!formStep) {
        return;
      }
      const fieldIndex = formStep.fields.findIndex((field) => field.name === name);
      if (fieldIndex === -1) {
        return;
      }
      formStep.fields[fieldIndex].value = value;
      setFormStep(formStep);
    },
    [formStep]
  );

  const onOptionSelected = useCallback(
    (name: string, index: number) => {
      if (!formStep) {
        return;
      }
      const fieldIndex = formStep.fields.findIndex((field) => field.name === name);
      if (fieldIndex === -1) {
        return;
      }
      const options = formStep.fields[fieldIndex].options;
      if (!options) {
        return;
      }
      formStep.fields[fieldIndex].value = options[index].value;
      setFormStep(formStep);
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

  const validateForm = useCallback(() => {
    // todo add validation
    console.log('========');
  }, []);

  const submitForm = useCallback(() => {
    if (!formStep) {
      return;
    }
    validateForm();
    submitEntry({
      variables: { entryId: entry.id, formId: entry.formId, formStep }
    }).then(({ data, errors }) => {
      console.log('===data===', data);
      if (data) {
        const result = removeTypename(data.SubmitEntry.data);
        if (result) {
          saveEntry(result.id);
          router.push(`/application/${result.id}/${step + 1}`).then();
        }
      }
      console.log('===errors===', errors);
    });
  }, [formStep, validateForm, submitEntry, entry.id, entry.formId, saveEntry, router, step]);

  return (
    <div className="application-page">
      <ApplicationList
        ids={savedEntries}
        currentId={entry.id}
        isOpenAddFrom={isOpenAddForm}
        openAddForm={setIsOpenAddForm}
        deleteEntry={deleteEntry}
        createEntry={createEntry}
        isNewEntry={isNewEntry}
      />
      <div className="floating-wrap">
        <div className={classNames({ 'application-form': true, blur: isOpenAddForm })}>
          <div className="container">
            <div className="data-wrap">
              <div className="progress-wrap">
                <h2>{entry.form.description}</h2>
                <ul>
                  {entry.form.steps.map((step, index) => (
                    <li
                      key={index}
                      className={classNames({
                        done: step.step < entry.currentStep,
                        current: step.step === entry.currentStep
                      })}>
                      <div className="counter">
                        <span className="line">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <circle
                              cx="24"
                              cy="24"
                              r="22.5"
                              fill="transparent"
                              strokeWidth="3"
                              strokeDasharray={
                                step.step < entry.currentStep
                                  ? '295%,1000'
                                  : step.step === entry.currentStep
                                  ? '295%,1000'
                                  : '0%,1000'
                              }
                              strokeDashoffset="0"
                            />
                          </svg>
                        </span>
                        <span className="index" />
                      </div>
                      <div className="name">
                        <h4>{step.name}</h4>
                        <p>{step.step < entry.currentStep ? 'Done' : 'On progress'}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
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
                {entry.currentStep === 1 ? (
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
                        <label key={index} className="third-size">
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
                              key={index}
                              formField={field}
                              onOptionSelected={onOptionSelected}
                            />
                          );
                        case FieldType.Input:
                          return (
                            <TextInput
                              key={index}
                              formField={field}
                              onValueChange={onValueChange}
                            />
                          );
                        case FieldType.Select:
                          return (
                            <SelectBox
                              key={index}
                              formField={field}
                              onValueChange={onValueChange}
                            />
                          );
                        case FieldType.CountryPicker:
                          return (
                            <CountryPicker
                              key={index}
                              formField={field}
                              selectedCountry={onSelectedCountry}
                            />
                          );
                        case FieldType.StatePicker:
                          return (
                            <StatePicker
                              key={index}
                              formField={field}
                              selectedState={onValueChange}
                              country={country}
                            />
                          );
                        case FieldType.DatePicker:
                          return (
                            <DatePicker
                              key={index}
                              formField={field}
                              onValueChange={onValueChange}
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
        <div className={classNames({ 'application-toolbar': true, blur: isOpenAddForm })}>
          <div className="container">
            <div className="data-wrap">
              <div className="back-btn">
                {entry.currentStep !== 1 ? (
                  <Link href={`application/${entry.id}/${step - 1}`}>
                    <a className="main-btn big outline">
                      <span className="icon-left" /> Back
                    </a>
                  </Link>
                ) : (
                  <></>
                )}
              </div>
              <div className="next-btn">
                <button type="button" className="main-btn big" onClick={submitForm}>
                  Next <span className="icon-right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationForm;
