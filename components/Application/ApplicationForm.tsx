import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { FieldType, Form, useEntryLazyQuery, useSubmitEntryMutation } from '@/generated/graphql';
import ApplicationList from '@/components/Application/ApplicationList';
import classNames from 'classnames';
import RadioOption from '@/components/Application/RadioOption';
import TextInput from '@/components/Application/TextInput';
import CountryPicker from '@/components/Application/CountryPicker';
import StatePicker from '@/components/Application/StatePicker';
import DatePicker from '@/components/Application/DatePicker';
import SelectBox from '@/components/Application/SelectBox';
import removeTypename from '@naveen-bharathi/remove-graphql-typename';

interface ApplicationFormProps {
  forms: Form[];
}

interface IEntry {
  id?: string;
  currentStep: number;
  form: Form;
  formId: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ forms }) => {
  const [formIndex, setFormIndex] = useState<number>(0);
  const [entry, setEntry] = useState<IEntry>({
    id: undefined,
    currentStep: 1,
    form: forms[0],
    formId: forms[0].id
  });
  const [country, setCountry] = useState<string>('US');
  const [isOpenAddForm, setIsOpenAddForm] = useState<boolean>(false);
  const [entryIds, setEntryIds] = useState<string[]>([]);

  const { getSavedEntries, saveEntry } = useAuth();
  const [submitEntry] = useSubmitEntryMutation();
  const [getEntry, { data: getEntryResponse }] = useEntryLazyQuery();

  useEffect(() => {
    const ids = getSavedEntries();
    setEntryIds(ids);
  }, [getSavedEntries]);

  useEffect(() => {
    if (getEntryResponse?.Entry.data) {
      const data = removeTypename(getEntryResponse?.Entry.data);
      console.log('===set entry and next step2===', data.id);
      setCountry('US');
      setEntry({
        id: data.id,
        currentStep: data.currentStep + 1,
        form: data.form,
        formId: data.formId
      });
    }
  }, [getEntryResponse]);

  useEffect(() => {
    console.log('=====call set current step 1======');
    setEntry((value) => ({
      ...value,
      form: forms[formIndex],
      formId: forms[formIndex].id
    }));
  }, [formIndex, forms]);

  const selectedEntry = useCallback(
    (id: string | undefined) => {
      console.log('===%%%%%%%===', id);
      if (!id) {
        console.log('===setFormIndex===', id);
        setFormIndex(0);
      } else if (entry.id !== id) {
        console.log('===getEntry===', id, entry.id);
        getEntry({ variables: { entryId: id } });
      }
    },
    [entry.id, getEntry]
  );

  useEffect(() => {
    if (entryIds.length > 0) {
      console.log('===Initial useEffect1===', entryIds);
      selectedEntry(entryIds[entryIds.length - 1]);
    } else {
      console.log('===Initial useEffect2===', 'undefined');
      selectedEntry(undefined);
    }
  }, [entryIds]);

  const onValueChange = useCallback(
    (name: string, value: string | number | undefined) => {
      const formStepIndex = entry.form.steps.findIndex((step) => step.step === entry.currentStep);
      if (formStepIndex === -1) {
        return;
      }
      const fieldIndex = entry.form.steps[formStepIndex].fields.findIndex(
        (field) => field.name === name
      );
      if (fieldIndex === -1) {
        return;
      }
      entry.form.steps[formStepIndex].fields[fieldIndex].value = value;
      setEntry(entry);
    },
    [entry]
  );

  const onOptionSelected = useCallback(
    (name: string, index: number) => {
      const formStepIndex = entry.form.steps.findIndex((step) => step.step === entry.currentStep);
      if (formStepIndex === -1) {
        return;
      }
      const fieldIndex = entry.form.steps[formStepIndex].fields.findIndex(
        (field) => field.name === name
      );
      if (fieldIndex === -1) {
        return;
      }
      const options = entry.form.steps[formStepIndex].fields[fieldIndex].options;
      if (!options) {
        return;
      }
      entry.form.steps[formStepIndex].fields[fieldIndex].value = options[index].value;
      setEntry(entry);
    },
    [entry]
  );

  const onSelectedCountry = useCallback(
    (name: string, value: string) => {
      onValueChange(name, value);
      setCountry(value);
    },
    [onValueChange]
  );

  const preStep = useCallback(() => {
    if (entry.currentStep < 2) {
      return;
    }
    setEntry((values) => ({
      ...values,
      currentStep: values.currentStep - 1
    }));
    setCountry('US');
  }, [entry]);

  const validateForm = useCallback(() => {
    console.log('========');
  }, []);

  const formStep = useMemo(() => {
    console.log('===form step calculated====', entry);
    return entry.form.steps.find((step) => step.step === entry.currentStep);
  }, [entry]);

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
        const result = data.SubmitEntry.data;
        if (result) {
          saveEntry(result.id);
          result.currentStep += 1;
          setEntry(result);
        }
      }
      console.log('===errors===', errors);
    });
  }, [formStep, validateForm, submitEntry, entry.id, entry.formId, saveEntry]);

  return (
    <div className="application-page">
      <ApplicationList
        ids={entryIds}
        currentId={entry.id}
        isOpenAddFrom={isOpenAddForm}
        openAddForm={setIsOpenAddForm}
        selectedEntry={selectedEntry}
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
                              checked={index === formIndex}
                              onChange={() => setFormIndex(index)}
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
                  <button type="button" className="main-btn big outline" onClick={preStep}>
                    <span className="icon-left" /> Back
                  </button>
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
