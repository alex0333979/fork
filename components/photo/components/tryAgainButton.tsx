/* eslint-disable @next/next/no-img-element */
import React from 'react';

import { Bars } from 'react-loading-icons';
import { ProcessingStatus } from '../types';

interface Props {
  status: ProcessingStatus;
  onClick: () => void;
  onOpenInfo: (v: boolean) => void;
}

const TryAgainButton: React.FC<Props> = ({ status, onClick, onOpenInfo }) => {
  if (status !== ProcessingStatus.success) {
    return (
      <div className="btn-wrap single">
        <div className="action-btn">
          <button type="button" className="main-btn" onClick={onClick}>
            {status === ProcessingStatus.loading ? (
              <Bars height={25} fill={'#FFFFFF'} stroke={'transparent'} />
            ) : (
              <span>Try again</span>
            )}
          </button>
        </div>
        <div className="info-btn">
          <button type="button" className="main-btn outline" onClick={() => onOpenInfo(true)}>
            <i className="icon-info" />
          </button>
        </div>
      </div>
    );
  }

  return null;
};
export default TryAgainButton;
