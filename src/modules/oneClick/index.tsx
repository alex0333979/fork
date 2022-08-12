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
      onCloseModal,
      onSelectCountry,
      onSelectDocument,
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
              <TakePhoto documentId={document.id.toString()} form={form} />
            )}
          </OneClickModal>
        )}
      </>
    )}
  </OneClickProvider>
)

export default OneClick
