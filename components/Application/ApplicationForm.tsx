import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import { FieldType, Form, useSubmitEntryMutation } from '@/generated/graphql';
import { useRouter } from 'next/router';
import ApplicationList from '@/components/Application/ApplicationList';
import classNames from 'classnames';
import RadioOption from '@/components/Application/RadioOption';
import TextInput from '@/components/Application/TextInput';
import CountryPicker from '@/components/Application/CountryPicker';
import StatePicker from '@/components/Application/StatePicker';
import DatePicker from '@/components/Application/DatePicker';
import SelectBox from '@/components/Application/SelectBox';

type ApplicationFormProps = {
  id: string | undefined;
  forms: Form[]
};

interface IEntry {
  currentStep: number;
  form: Form;
  formId: string;
  isComplete: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ id, forms }) => {
  const router = useRouter();

  const [formIndex, setFormIndex] = useState<number>(0);
  const [entry, setEntry] = useState<IEntry>({
    currentStep: 1,
    form: forms[0],
    formId: forms[0].id,
    isComplete: false
  });
  const [savedEntries, SetSavedEntries] = useState<string[]>([]);
  const { getSavedEntries } = useAuth();
  // const [getEntry, { data: entry, loading, error: entryError }] = useEntryLazyQuery();
  const [submitEntry, { data: newEntry }] = useSubmitEntryMutation();
  useEffect(()=>{
    setEntry({
      currentStep: 1,
      form: forms[formIndex],
      formId: forms[formIndex].id,
      isComplete: false
    })
  },[formIndex])
  useEffect(() => {
    // if (id) {
    //   getEntry({ variables: { entryId: id } });
    // } else {
    //   const entries = getSavedEntries();
    //   if (entries.length > 0) {
    //     getEntry({ variables: { entryId: entries[0] } });
    //   } else {
    // (async () => {
    //   await submitEntry({ variables: { formId: forms[0].id} });
    // })()
    // }
    // }

    // const entries = getSavedEntries();
    // if (entries.length == 0) {
    //   const data = useEntryQuery({ variables: { entryId: '612df48b1accd31d2d50894b'}})
    //
    // }
  }, []);

  // useEffect(() => {
  //   if (entryError) {
  //     // router.push('/').then()
  //   }
  // }, [entryError, router])

  const formStep = entry.form.steps.find(step => step.step === entry.currentStep);

  return (
    <div className="application-page">
      <ApplicationList ids={savedEntries}/>
      <div className="floating-wrap">
        <div className="application-form">
          <div className="container">
            <div className="data-wrap">
              <div className="progress-wrap">
                <h2>{entry.form.description}</h2>
                <ul>
                  {
                    entry.form.steps.map((step, index) => {
                      return (
                        <li key={index} className={classNames({
                          'done': step.step < entry.currentStep,
                          'current': step.step === entry.currentStep
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
                                  strokeDasharray={step.step < entry.currentStep ? '295%,1000' : (step.step === entry.currentStep ? '25%,1000' : '0%,1000')}
                                  strokeDashoffset="0"/>
                                </svg>
                            </span>
                            <span className="index"/>
                          </div>
                          <div className="name">
                            <h4>{step.name}</h4>
                            <p>{step.step < entry.currentStep ? 'Done' : 'On progress'}</p>
                          </div>
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="form-wrap">
                {
                  formStep?.notes ? (
                    <div className="form-fields">
                      <div className="form-notice">
                        <p>{formStep.notes}
                          <span className="icon-info"/></p>
                      </div>
                    </div>
                  ) : (<></>)
                }
                {
                  entry.currentStep === 1 ? (
                    <div className="form-fields">
                      <div className="extra-info">
                        <h3>{'Before start, please select an application type'}</h3>
                        <label>
                          <span className="field checkbox">
                            <span className="name">{'Unknown'}</span>
                            <input type="checkbox" placeholder="Male"/>
                            <span className="wrap">
                              <span className="bullet"/>
                              <span className="border"/>
                            </span>
                          </span>
                          <span className="warning">{'Warning message'}</span>
                        </label>
                      </div>
                      <div className="group">
                        {
                          forms.map((form, index) => {
                            return (
                              <label key={index} className="third-size">
                                <span className="field radio">
                                  <span className="name"><b>{form.name}</b><i className="icon-about"/></span>
                                  <span className="extra">{form.description}</span>
                                  <input type="radio" onChange={(e) => setFormIndex(index)} name="application" placeholder="Male"/>
                                  <span className="wrap">
                                    <span className="bullet"/>
                                    <span className="border"/>
                                  </span>
                                </span>
                                <span className="warning">Warning message</span>
                              </label>
                            );
                          })
                        }
                      </div>
                    </div>
                  ) : (<></>)
                }
                <form>
                  <div className="form-fields">
                    {
                      formStep?.fields.map((field, index) => {
                        switch (field.type) {
                          case FieldType.Radio:
                            return (
                              <RadioOption key={index} formField={field}/>
                            );
                          case FieldType.Input:
                            return (
                              <TextInput key={index} formField={field}/>
                            );
                          case FieldType.Select:
                            return (
                              <SelectBox key={index} formField={field}/>
                            );
                          case FieldType.CountryPicker:
                            return (
                              <CountryPicker key={index} formField={field}/>
                            );
                          case FieldType.StatePicker:
                            return (
                              <StatePicker key={index} formField={field}/>
                            );
                          case FieldType.DatePicker:
                            return (
                              <DatePicker key={index} formField={field}/>
                            );
                        }
                      })
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="application-toolbar">
          <div className="container">
            <div className="data-wrap">
              <div className="back-btn">
                {
                  entry.currentStep !== 1 ? (
                    <button type="button" className="main-btn big outline">
                      <span className="icon-left"/> Back
                    </button>
                  ) : (<></>)
                }
              </div>
              <div className="next-btn">
                <button type="button" className="main-btn big">
                  Next <span className="icon-right"/>
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
