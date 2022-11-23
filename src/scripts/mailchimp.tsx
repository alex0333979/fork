/* eslint-disable max-len */
import React from 'react'

const MailChimpScript: React.FC = () => (
  <>
    <script
      id="mailchimp"
      dangerouslySetInnerHTML={{
        __html: `!function(c,h,i,m,p){m=c.createElement(h),p=c.getElementsByTagName(h)[0],m.async=1,m.src=i,p.parentNode.insertBefore(m,p)}(document,"script","https://chimpstatic.com/mcjs-connected/js/users/90d49cd3b92c3258f92ad1ff1/8485d1ffa4f3784e20cfa7b8e.js");`,
      }}
    />
  </>
)

export default MailChimpScript
