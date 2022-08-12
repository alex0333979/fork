import React from 'react'

import DocModal from '@/modules/home/docModal'
import OneClickModal from './components/oneClickModal'
import { OneClickProvider } from './oneClickContext'
import TakePhoto from './components/takePhoto'

const OneClick: React.FC = () => (
  <OneClickProvider>
    {({
      modalType,
      country,
      document,
      form,
      entry,
      camera,
      onCloseModal,
      onSelectCountry,
      onSelectDocument,
      onEntrySubmitted,
    }) => (
      <>
        <DocModal
          open={modalType === 'select-doc'}
          onClose={onCloseModal}
          country={country}
          onSelectCountry={onSelectCountry}
          document={document}
          onSelectDocument={onSelectDocument}
        />
        {!!document?.id && form && (
          <OneClickModal
            open={modalType === 'take-photo'}
            className="one-click-take-photo"
            onClose={onCloseModal}>
            {modalType === 'take-photo' && (
              <TakePhoto
                documentId={document.id.toString()}
                form={form}
                entry={entry}
                camera={camera}
                onEntrySubmitted={onEntrySubmitted}
              />
            )}
          </OneClickModal>
        )}
      </>
    )}
  </OneClickProvider>
)

export default OneClick
