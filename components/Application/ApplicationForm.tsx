import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth';
import {
  Entry,
  Form,
  useEntryLazyQuery,
  useEntryQuery,
  useFormsLazyQuery,
  useFormsQuery,
  useSubmitEntryMutation
} from '@/generated/graphql';
import { useRouter } from 'next/router';
import ApplicationList from '@/components/Application/ApplicationList';
import classNames from 'classnames';

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
  const [entry, setEntry] = useState<IEntry>({
    currentStep: 1,
    form: forms[0],
    formId: forms[0].id,
    isComplete: false
  });
  const [savedEntries, SetSavedEntries] = useState<string[]>([])
  const { getSavedEntries } = useAuth();
  // const [getEntry, { data: entry, loading, error: entryError }] = useEntryLazyQuery();
  const [submitEntry, { data: newEntry }] = useSubmitEntryMutation();

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
                <div className="form-fields">
                  <div className="extra-info">
                    <h3>Before start, please select an application type</h3>
                    <label>
                      <span className="field checkbox">
                        <span className="name">Unknown</span>
                        <input type="checkbox" placeholder="Male"/>
                        <span className="wrap">
                          <span className="bullet"/>
                          <span className="border"/>
                        </span>
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                  </div>
                  <div className="group">
                    <label className="third-size">
                      <span className="field radio">
                        <span className="name"><b>DS-11</b><i className="icon-about"/></span>
                        <span className="extra">New Passport Application</span>
                        <input type="radio" name="application" placeholder="Male"/>
                        <span className="wrap">
                          <span className="bullet"/>
                          <span className="border"/>
                        </span>
                      </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="third-size">
                        <span className="field radio">
                          <span className="name"><b>DS-82</b><i className="icon-about"/></span>
                          <span className="extra">Renewal Application</span>
                          <input type="radio" name="application" placeholder="Male"/>
                          <span className="wrap">
                              <span className="bullet"/>
                              <span className="border"/>
                          </span>
                        </span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="third-size">
                        <span className="field radio">
                          <span className="name"><b>DS-64</b><i className="icon-about"/></span>
                          <span className="extra">Lost/Stolen Application</span>
                          <input type="radio" name="application" placeholder="Male"/>
                          <span className="wrap">
                              <span className="bullet"/>
                              <span className="border"/>
                          </span>
                        </span>
                      <span className="warning">Warning message</span>
                    </label>
                  </div>
                </div>

                <form>
                  <div className="form-fields">
                    <div className="group">
                      <div className="group-label">
                        <p>Please select the document(s) for which you are applying</p>
                      </div>
                      <label className="third-size">
                        <span className="field radio">
                            <span className="name">U.S Passport Book</span>
                            <input type="radio" name="type" placeholder="Male"/>
                            <span className="wrap">
                                <span className="bullet"/>
                                <span className="border"/>
                            </span>
                        </span>
                        <span className="warning">Warning message</span>
                      </label>
                      <label className="third-size">
                        <span className="field radio">
                            <span className="name">U.S Passport Card</span>
                            <input type="radio" name="type" placeholder="Male"/>
                            <span className="wrap">
                                <span className="bullet"/>
                                <span className="border"/>
                            </span>
                        </span>
                        <span className="warning">Warning message</span>
                      </label>
                      <label className="third-size">
                        <span className="field radio">
                            <span className="name">Both</span>
                            <input type="radio" name="type" placeholder="Male"/>
                            <span className="wrap">
                                <span className="bullet"/>
                                <span className="border"/>
                            </span>
                        </span>
                        <span className="warning">Warning message</span>
                      </label>
                    </div>
                  </div>

                  <div className="form-fields limit-width">
                    <div className="form-notice">
                      <p>If you have no future travel plans, you can skip this step.
                        <span className="icon-info"/></p>
                    </div>
                    <label className="half-size">
                      <span className="label">Date Of Birth *</span>
                      <span className="field"><input type="date" placeholder=""/></span>
                      <span className="warning">Warning message</span>
                    </label>
                    <label className="half-size">
                      <span className="label">City Of Birth *</span>
                      <span className="field"><input type="text" placeholder="City Of Birth"/></span>
                    </label>
                    <label className="half-size">
                      <span className="label">Country Of Birth *</span>
                      <span className="field select">
                        <select>
                          <option disabled selected>Selcect country</option>
                          <option>Selcect country</option>
                          <option>Selcect country</option>
                          <option>Selcect country</option>
                        </select>
                      </span>
                    </label>
                    <div className="group">
                      <div className="group-label">
                        <p>Sex *</p>
                      </div>
                      <label className="half-size">
                        <span className="field radio">
                          <span className="name">Male</span>
                          <input type="radio" name="sex" placeholder="Male"/>
                          <span className="wrap">
                            <span className="bullet"/>
                            <span className="border"/>
                          </span>
                        </span>
                        <span className="warning">Warning message</span>
                      </label>
                      <label className="half-size">
                        <span className="field radio">
                          <span className="name">Female</span>
                          <input type="radio" name="sex" placeholder="Female"/>
                          <span className="wrap">
                            <span className="bullet"/>
                            <span className="border"/>
                          </span>
                        </span>
                      </label>
                    </div>
                    <label className="half-size">
                      <span className="label">Social Security Number</span>
                      <span className="field"><input type="text" placeholder="XXX-XX-XXXX"/></span>
                      <span className="attention">Due to security reasons, please fill out this field manually once you have printed/received your application.</span>
                    </label>
                    <label className="half-size">
                      <span className="label">Phone Type *</span>
                      <span className="more">
                        <span className="field select">
                        <select>
                          <option disabled selected>Home</option>
                          <option>Home</option>
                          <option>Home</option>
                          <option>Home</option>
                        </select>
                      </span>
                        <button type="button" className="add-btn">
                          <span className="icon-close"/>{'Add\n application'}
                        </button>
                      </span>
                    </label>
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
                  ): (<></>)
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
