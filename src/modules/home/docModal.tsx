import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import classNames from 'classnames'
import { Bars } from 'react-loading-icons'

import { PDocument, useDocumentsByCountryLazyQuery } from '@/apollo'
import { Maybe } from '@/types'
import { ICountry } from '@/components/elements/countrySelector'
import Modal from '@/components/elements/modal'
import { UK_PASSPORT_IMAGES, US_PASSPORT_IMAGES } from '@/constants'
const CountrySelector = dynamic(
  () => import('@/components/elements/countrySelector'),
  {
    ssr: false,
  },
)

interface Props {
  open: boolean
  onClose: () => void
  country: ICountry | undefined
  onSelectCountry: (country: ICountry) => void
  document: Maybe<PDocument>
  onSelectDocument: (d: Maybe<PDocument>) => void
}

const DocModal = ({
  open,
  onClose,
  country,
  onSelectCountry,
  document,
  onSelectDocument,
}: Props) => {
  const [documents, setDocuments] = useState<PDocument[]>([])

  const [fetchDocuments, { loading }] = useDocumentsByCountryLazyQuery({
    fetchPolicy: 'no-cache',
    onCompleted: (res) => {
      if (res?.DocumentsByCountry.data) {
        setDocuments(res.DocumentsByCountry.data)
      }
    },
  })

  useEffect(() => {
    if (country?.label) {
      fetchDocuments({
        variables: { country: country.label },
      })
    }
  }, [country?.label, fetchDocuments])

  return (
    <Modal
      className="general"
      preventBodyScroll={false}
      open={open}
      onClose={onClose}>
      {loading && (
        <div className="loading-wrapper">
          <Bars height={50} fill="#0080FF" stroke="transparent" />
        </div>
      )}
      <div className="content-scroll">
        <div className="select-document">
          <div className="form-fields">
            <label>
              <CountrySelector
                country={country}
                onSelectCountry={onSelectCountry}
              />
            </label>
          </div>
          <div className="document-options">
            {documents.map((d, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`document-${i}`}
                  checked={document?.id === d.id}
                  onChange={() => onSelectDocument(d)}
                />
                <span className="wrap-box">
                  <span className="bullet">
                    <span className="img">
                      {d.country === 'United States' &&
                      US_PASSPORT_IMAGES.find((i) => i.name === d.type) ? (
                        <Image
                          src={`/images/passports/${
                            US_PASSPORT_IMAGES.find((i) => i.name === d.type)
                              ?.image
                          }`}
                          layout="fill"
                          alt=""
                        />
                      ) : d.country === 'United Kingdom' &&
                        UK_PASSPORT_IMAGES.find((i) => i.name === d.type) ? (
                        <Image
                          src={`/images/passports/${
                            UK_PASSPORT_IMAGES.find((i) => i.name === d.type)
                              ?.image
                          }`}
                          layout="fill"
                          alt=""
                        />
                      ) : d.type === 'Passport' ? (
                        <Image
                          src={`/images/passports/${
                            d.countryCode?.toLowerCase() ?? 'passport'
                          }.png`}
                          layout="fill"
                          alt=""
                        />
                      ) : (
                        <Image
                          src="/images/passports/default-img.png"
                          layout="fill"
                          alt=""
                        />
                      )}
                    </span>
                  </span>
                  <span className="name">{d.type}</span>
                </span>
              </label>
            ))}
          </div>
          <div className="submit-btn">
            <a
              className={classNames('main-btn big outline', {
                disabled: !document,
              })}
              onClick={() => onSelectDocument(document)}>
              <i className="icon-camera" />
              Take A Photo
            </a>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default DocModal
