import React from 'react'

import DocModal from '@/modules/home/docModal'
import { OneClickProvider } from './oneClickContext'

const OneClick: React.FC = () => (
  <OneClickProvider>
    {({
      modalType,
      country,
      document,
      onCloseDocModal,
      onSelectCountry,
      onSelectDocument,
    }) => (
      <>
        <DocModal
          open={modalType === 'select-doc'}
          onClose={onCloseDocModal}
          country={country}
          onSelectCountry={onSelectCountry}
          document={document}
          onSelectDocument={onSelectDocument}
        />
      </>
    )}
  </OneClickProvider>
)

export default OneClick
