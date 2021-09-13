import React from 'react';
import Link from 'next/link';
import classNames from 'classnames';

type ApplicationListProps = {
  ids: string[];
};
const ApplicationList: React.FC<ApplicationListProps> = ({ ids }) => {

  return (
    <div className="application-list">
      <div className="container">
        <div className="data-wrap">
          <ul>
            {ids.map((id, index) => {
              return (
                <li key={index}>
                  <Link href={'/application/[entryId]'} as={`/application/${id}`}>
                    <a className={classNames({"main-btn": true,  "small": true, "blank": index === 1})}>
                      Application №{index + 1}
                      <span className="icon-remove"/>
                    </a>
                  </Link>
                </li>
              );
            })}

            <li className="add-application">
              <button type="button" className="add-btn">
                <span className="icon-close"/>
                {'Add\n application'}
              </button>
              <div className="add-form">
                <div className="bg-wrap">
                  <button type="button" className="icon-close"/>
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
                      <td><span>$89.00</span></td>
                    </tr>
                    </tfoot>
                  </table>
                  <div className="btn-wrap">
                    <button type="button" className="main-btn small">Add an application</button>
                    <button type="button" className="main-btn small blank cancel">Cancel</button>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default ApplicationList;