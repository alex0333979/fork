import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

interface ApplicationListProps {
  ids: string[];
  isOpenAddFrom: boolean;
  currentId: string | undefined;
  openAddForm: (status: boolean) => void;
  selectedEntry: (id: string | undefined) => void;
}
const ApplicationList: React.FC<ApplicationListProps> = ({
  ids,
  isOpenAddFrom,
  currentId,
  openAddForm,
  selectedEntry
}) => (
  <div className="application-list">
    <div className="container">
      <div className="data-wrap">
        <ul>
          {ids.map((id, index) => (
            <li key={index}>
              <Link href={'/application/'}>
                <a
                  className={classNames({ 'main-btn': true, small: true, blank: id === currentId })}
                  onClick={() => selectedEntry(id)}>
                  Application №{index + 1}
                  <span className="icon-remove" />
                </a>
              </Link>
            </li>
          ))}
          {ids.length === 0 ? (
            <li>
              <Link href={'/application/'}>
                <a className={classNames({ 'main-btn': true, small: true, blank: true })}>
                  Application №1
                </a>
              </Link>
            </li>
          ) : (
            <></>
          )}

          <li className={classNames({ 'add-application': true, active: isOpenAddFrom })}>
            <button type="button" className="add-btn" onClick={() => openAddForm(!isOpenAddFrom)}>
              <span className="icon-close" />
              {'Add\n application'}
            </button>

            <div className="add-form">
              <div className="bg-wrap">
                <button type="button" className="icon-close" onClick={() => openAddForm(false)} />
                <div className="top-info">
                  <h4>Add Another Application?</h4>
                </div>
                <table>
                  <tbody>
                    <tr>
                      <td>Your new package price:</td>
                      <td>$89.00</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td>Total: 2</td>
                      <td>
                        <span>$89.00</span>
                      </td>
                    </tr>
                  </tfoot>
                </table>
                <div className="btn-wrap">
                  <button type="button" className="main-btn small">
                    Add an application
                  </button>
                  <button
                    type="button"
                    className="main-btn small blank cancel"
                    onClick={() => openAddForm(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

export default ApplicationList;
