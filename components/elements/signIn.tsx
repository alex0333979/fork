import React, { useCallback, useState } from 'react'
import { useAuth } from '@/lib/auth'
import ModalContainer from '@/components/elements/modalContainer'
import classNames from 'classnames'
import { Bars } from 'react-loading-icons'

const SignIn: React.FC = () => {
  const { openSignIn, toggleSignInModal, toggleSignUpModal } = useAuth()
  const [loading, setLoading] = useState<boolean>(false)

  const onValueChange = useCallback((name: string, value: string) => {
    console.log('======', name, value)
  }, [])

  const onSubmit = useCallback(() => {
    setLoading(true)
    setLoading(false)
  }, [])

  return (
    <ModalContainer
      open={openSignIn}
      closeModal={() => toggleSignInModal(false)}
      title={'Sign In'}
      label={'Sign in to safely access your dashboard'}>
      <form className="modal-form">
        <div className="form-fields">
          <label className="full-size">
            <span className="label">{'E-mail *'}</span>
            <span className="field">
              <input
                type="email"
                className={classNames({
                  'error-border': false,
                })}
                name="email"
                value={''}
                placeholder="E-mail"
                onChange={(e) => onValueChange(e.target.name, e.target.value)}
              />
            </span>
            {/* {error ? <span className="attention">{error}</span> : <></>}*/}
          </label>
          <label className="full-size">
            <span className="label">{'Password *'}</span>
            <span className="field">
              <input
                type="password"
                className={classNames({
                  'error-border': false,
                })}
                name="password"
                value={''}
                placeholder="Password"
                onChange={(e) => onValueChange(e.target.name, e.target.value)}
              />
            </span>
            {/* {error ? <span className="attention">{error}</span> : <></>}*/}
          </label>
          <label className="full-size">
            <button
              type="button"
              className="main-btn big full-size"
              disabled={false}
              onClick={onSubmit}>
              {loading ? (
                <Bars height={25} fill={'#FFFFFF'} stroke={'transparent'} />
              ) : (
                <>{'Sign In'}</>
              )}
            </button>
          </label>
          <label className="full-size">
            <p>{`Don't have account?`}</p>
          </label>
          <label className="full-size">
            <button
              type="button"
              className="main-btn big outline full-size"
              disabled={false}
              onClick={() => toggleSignUpModal(true)}>
              {'Sign Up'}
            </button>
          </label>
        </div>
      </form>
    </ModalContainer>
  )
}

export default SignIn
