import { PrismicRichText } from '@prismicio/react'
import React from 'react'

interface Props {
  contact: any
}

const ContactItem: React.FC<Props> = ({ contact }) => (
  <li className="prismic-content">
    <PrismicRichText field={contact.list_title} />
    <PrismicRichText field={contact.list_text} />
  </li>
)

export default ContactItem
