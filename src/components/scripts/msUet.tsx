/* eslint-disable max-len */
import React from 'react'

const MicrosoftUETScript: React.FC = () => (
  <>
    <script
      id="load-uet"
      dangerouslySetInnerHTML={{
        __html: `(function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[] ,f=function(){var o={ti:"148009486"}; o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")} ,n=d.createElement(t),n.src=r,n.async=1,n.onload=n .onreadystatechange=function() {var s=this.readyState;s &&s!=="loaded"&& s!=="complete"||(f(),n.onload=n. onreadystatechange=null)},i= d.getElementsByTagName(t)[0],i. parentNode.insertBefore(n,i)})(window,document,"script"," //bat.bing.com/bat.js","uetq");`,
      }}
    />
    <script
      id="trigger-uet"
      dangerouslySetInnerHTML={{
        __html: `window.uetq = window.uetq || [];
                window.uetq.push('event', 'page_view', { page_path: '/' + window.location.pathname });`,
      }}
    />
  </>
)

export default MicrosoftUETScript
