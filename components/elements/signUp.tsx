import React, { useCallback, useState } from 'react';
import { useAuth } from '@/lib/auth';
import ModalContainer from '@/components/elements/modalContainer';
import classNames from 'classnames';
import { Bars } from 'react-loading-icons';

const SignUp: React.FC = () => {
  const { openSignUp, toggleSignUpModal, toggleSignInModal } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);

  const onValueChange = useCallback((name: string, value: string) => {
    console.log('======', name, value);
  }, []);

  const onSubmit = useCallback(() => {
    setLoading(true);
    console.log('=======');
    setLoading(false);
  }, []);

  return (
    <ModalContainer open={openSignUp} closeModal={() => toggleSignUpModal(false)} title={'Sign Up'}>
      <form className="modal-form">
        <div className="form-fields">
          <label className="full-size">
            <span className="label">{'Nickname *'}</span>
            <span className="field">
              <input
                type="text"
                className={classNames({
                  'error-border': false
                })}
                name="nickname"
                value={''}
                placeholder="Nickname"
                onChange={(e) => onValueChange(e.target.name, e.target.value)}
              />
            </span>
            {/* {error ? <span className="attention">{error}</span> : <></>}*/}
          </label>
          <label className="full-size">
            <span className="label">{'E-mail *'}</span>
            <span className="field">
              <input
                type="email"
                className={classNames({
                  'error-border': false
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
                  'error-border': false
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
            <span className="label">{'Confirm password *'}</span>
            <span className="field">
              <input
                type="password"
                className={classNames({
                  'error-border': false
                })}
                name="cPassword"
                value={''}
                placeholder="Confirm password"
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
                <>{'Sign Up'}</>
              )}
            </button>
          </label>
          <label className="full-size">
            <p>{`Already have an account?`}</p>
          </label>
          <label className="full-size">
            <button
              type="button"
              className="main-btn big outline full-size"
              disabled={false}
              onClick={() => toggleSignInModal(true)}>
              {'Sign In'}
            </button>
          </label>
        </div>
      </form>
    </ModalContainer>
  );
};

export default SignUp;
