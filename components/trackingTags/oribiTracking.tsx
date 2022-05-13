import React from 'react'

const OribiTrackingScript = () => (
  <>
    <script
      id="oribi-tracking"
      dangerouslySetInnerHTML={{
        __html: `(function(b,o,n,g,s,r,c){if(b[s])return;b[s]={};b[s].scriptToken="XzE0ODc5MTkxNjI";
        b[s].callsQueue=[];b[s].api=function(){b[s].callsQueue.push(arguments);};r=o.createElement(n);
        c=o.getElementsByTagName(n)[0];r.async=1;r.src=g;r.id=s+n;c.parentNode.insertBefore(r,c);})
        (window,document,"script","https://cdn.oribi.io/XzE0ODc5MTkxNjI/oribi.js","ORIBI");`,
      }}
    />
  </>
)

export default OribiTrackingScript
