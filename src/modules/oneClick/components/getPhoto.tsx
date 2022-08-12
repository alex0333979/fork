import React from 'react'

interface Props {}

const GetPhoto: React.FC<Props> = ({}) => {
  return (
    <>
    <div className="title">
                      <h1>
                        Taking your shot on your own or having someone take it
                        for you?
                      </h1>
                      <p>Select from the options below</p>
                    </div>
                    <div className="method-option">
                      <label>
                        <input
                          type="radio"
                          name="method"
                          checked={type === FACING_MODES.USER}
                          hidden
                          onChange={() => setType(FACING_MODES.USER)}
                        />
                        <span className="option-wrap">
                          <span className="bullet" />
                          <span className="img">
                            <NextImage
                              src="/images/steps/step-01-01-v2.png"
                              layout="fill"
                              alt=""
                            />
                          </span>
                          <span className="name">I&apos;ll take a selfie</span>
                        </span>
                      </label>

                      {matches && (
                        <label>
                          <input
                            type="radio"
                            name="method"
                            checked={type === FACING_MODES.ENVIRONMENT}
                            hidden
                            onChange={() => setType(FACING_MODES.ENVIRONMENT)}
                          />
                          <span className="option-wrap">
                            <span className="bullet" />
                            <span className="img">
                              <NextImage
                                src="/images/steps/step-01-02-v2.png"
                                layout="fill"
                                alt=""
                              />
                            </span>
                            <span className="name">
                              Someone’s taking my photo
                            </span>
                          </span>
                        </label>
                      )}
                    </div>
                    <div className="btn-wrap">
                      <div className="action-btn mobile-column">
                        <button
                          type="button"
                          className="main-btn big"
                          onClick={() => setOpenCamera(true)}>
                          <span className="icon-camera" />
                          Take A Photo
                        </button>
                        <button
                          type="button"
                          className="main-btn big outline upload-button"
                          onClick={() => inputFileRef?.current?.click()}>
                          <span className="icon-upload" />
                          Upload
                        </button>
                      </div>
                      {/* <div className="info-btn">*/}
                      {/*  <button*/}
                      {/*    type="button"*/}
                      {/*    className="main-btn outline"*/}
                      {/*    onClick={() => setOpenStepInfo(true)}>*/}
                      {/*    <i className="icon-info" />*/}
                      {/*  </button>*/}
                      {/* </div>*/}
                    </div></>
  )
}

export default GetPhoto
