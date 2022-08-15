import React from 'react'

import DocModal from '@/modules/home/docModal'
import OneClickModal from './components/oneClickModal'
import { OneClickProvider } from './oneClickContext'
import TakePhoto from './components/takePhoto'
import ProcessPhoto from './components/processPhoto'

const OneClick: React.FC = () => (
  <OneClickProvider>
    {({
      modalType,
      country,
      document,
      form,
      entry,
      camera,
      modalClass,
      onCloseModal,
      onSelectCountry,
      onSelectDocument,
      onEntrySubmitted,
      onChangePhoto,
    }) => (
      <>
        {console.log({ modalType })}
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
            open={['take-photo', 'process-photo'].includes(modalType)}
            className={modalClass}
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
            {modalType === 'process-photo' && entry && (
              <ProcessPhoto
                document={document}
                entry={entry}
                onChangePhoto={onChangePhoto}
              />
            )}
          </OneClickModal>
        )}
      </>
    )}
  </OneClickProvider>
)

export default OneClick
