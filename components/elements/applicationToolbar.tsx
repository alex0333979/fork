import React from 'react';
import { Bars } from 'react-loading-icons';
import classNames from 'classnames';
import { useRouter } from 'next/router';

interface ApplicationToolbarProps {
  backLink: string | undefined;
  loading: boolean;
  blur?: boolean;
  onNext: () => void;
  nextButtonText?: string;
  disableSubmit?: boolean;
}

const ApplicationToolbar: React.FC<ApplicationToolbarProps> = ({
  backLink,
  loading,
  blur = false,
  onNext,
  nextButtonText = 'Next',
  disableSubmit = false
}) => {
  const router = useRouter();

  return (
    <div className={classNames('application-toolbar', { blur })}>
      <div className="container">
        <div className="data-wrap">
          <div className="back-btn">
            {backLink ? (
              <button
                type="button"
                className="main-btn big outline"
                onClick={() => router.push(backLink)}>
                <span className="icon-left" /> {'Back'}
              </button>
            ) : (
              <></>
            )}
          </div>
          <div className="next-btn">
            <button
              type="button"
              className={classNames('main-btn big', { disabled: disableSubmit })}
              disabled={disableSubmit}
              onClick={onNext}>
              {loading ? (
                <Bars height={25} fill={'#FFFFFF'} stroke={'transparent'} />
              ) : (
                <>
                  {nextButtonText} <span className="icon-right" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationToolbar;
