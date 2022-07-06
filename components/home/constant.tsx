/* eslint-disable max-len */
import { IFAQ } from './types'

const commonFaqs: IFAQ[] = [
  {
    key: 'faq2',
    question: 'What are your delivery options? (Home & Digital Delivery)',
    answer: (
      <p>
        Home Delivery:
        <br />
        We offer 2 shipping options with our concierge service:
        <br />
        - Expedited 1-2 business days
        <br />
        - Standard 3-5 business days
        <br />
        <br />
        Digital / Online Delivery:
        <br />
        Photos arrive as a .jpeg for you to print on your own. You may also
        choose to have it sent to a retail store with passport picture printing
        available. (CVS, Walgreens, etc.)
      </p>
    ),
  },
  {
    key: 'faq3',
    question: 'What is your concierge service?',
    answer: (
      <p>
        - We will print and ship your documents
        <br />
        - On required glossy photo paper.
        <br />
        - 2 to 6 Photos Per Person
        <br />
        - Processing Instruction Guide
        <br />
      </p>
    ),
  },
  {
    key: 'faq4',
    question: 'How long does it take to process my order?',
    answer: (
      <p>
        Your “Digital Photos” in a PNG & JPEG files will be emailed to your
        within minutes. When choosing the “Printed Version” where we will print
        and ship your photos to you with through our concierge service - the
        processing the order usually takes place on the same day, if you place
        your order by 4 PM. If not, do not worry. We will process your order
        within 24 hours, during normal business hours and days (Monday -
        Friday).
        <br />
        <br />
        Standard shipping is 3-5 business days
        <br />
        Expedited shipping is 1-2 business days
        <br />
      </p>
    ),
  },
]

// eslint-disable-next-line no-unused-vars
/*
const faq1: IFAQ = {
  key: 'faq1',
  question: 'How much do you charge for the photos?',
  answer: (
    <p>
      2 photos cost $18.50
      <br />
      4 photos cost $24.50
      <br />
      6 photos cost $28.50
      <br />
      <br />
      The digital version of the photos comes in a JPEG format that your can
      download for your device to print at home or at a local drugstore.
    </p>
  ),
}
*/

const faq5: IFAQ = {
  key: 'faq5',
  question: 'How do I print photos at my local retailer (CVS, Walgreens, etc)?',
  answer: (
    <p>
      <b>Step 1:</b> Open the confirmation email on your PC or Mobile.
      <br />
      <b>Step 2:</b> When you use your mobile device, please make sure to press
      on the link (“Download Your Photos For Print”) and then click “Save” your
      photos to your “photo library”. If you use your PC, “Right Click” on the
      photo link (“Download Your Photos For Print”) placed under your “Order
      items” section and then choose “save link as & save it as a .jpeg” image.
      <br />
      <b>Step 3:</b> Before going to the store, you will likely need to upload
      your digital photo file to the store&apos;s website. Go online to the
      links below, if you chose one of these options.
      <br />
      <a
        href="https://www.cvs.com/photo/prints"
        target="_blank"
        rel="noreferrer">
        https://www.cvs.com/photo/prints
      </a>{' '}
      (or){' '}
      <a
        href="https://photo.walgreens.com/store/prints"
        target="_blank"
        rel="noreferrer">
        https://photo.walgreens.com/store/prints
      </a>
      <br />
      <b>Step4:</b> Choose the “Prints & Enlargements” option.
      <br />
      <b>Step5:</b> Upload your saved photos to the designated website.
      <br />
      <b>Step6:</b> Make sure to choose the 4”X6” glossy photo paper.
      <br />
      <b>Step7:</b> Pay online. The photos will be waiting for you at the store.
      <br />
      <b>Step8:</b> Pick up your photos and enjoy your future travels.
    </p>
  ),
}

const faq6: IFAQ = {
  key: 'faq6',
  question: 'How do I upload my digital photo to Gov/Official websites?',
  answer: (
    <p>
      <b>Step1:</b> Open the confirmation email on your PC or Mobile.
      <br />
      <b>Step2:</b> “Download Your Single Digital Photo” and then click “save”
      your photos to your “photo library”. If you use your PC, press “Right
      Click” on the photo link (“Download Your Single Digital Photo”) placed
      under your “Order items” section, then choose “save link as & save it as a
      .jpeg image file
      <br />
      <b>Step3:</b> You are all set - your can now upload your digital (single)
      photo to any official website that has the option to do so.
    </p>
  ),
}

const faq7: IFAQ = {
  key: 'faq7',
  question: 'How do I print my photo at home using my home printer?',
  answer: (
    <p>
      <b>Step1:</b> Be sure to have 4”X6” glossy photo paper.
      <br />
      <b>Step2:</b> Open the confirmation email on your PC or Mobile.
      <br />
      <b>Step3:</b> When your use your mobile device, please make sure to press
      on the link (“Download Your Photos For Print”) and then click “save” your
      photos to your “photos library”. If you use your PC, press “Right Click”
      on the photo link (“Download Your Photos For Print”) placed under your
      “Order items” section, then choose “save link as” & save it as a .jpeg.
      <br />
      <b>Step4:</b> Press “Ctrl+P” or right click “Print” and your print
      settings will appear. Make sure to pick 4X6” size paper, with a minimum
      600 dpi for quality. Also, make sure that your remove all border
      spaces/gaps, and print.
    </p>
  ),
}

const faq5_print: IFAQ = {
  key: 'faq5',
  question: 'How do I print my photo at home using my home printer?',
  answer: (
    <p>
      <b>Step 1:</b> Be sure to have 4”X6” glossy photo paper.
      <br />
      <b>Step 2:</b> Open the confirmation email on your PC or Mobile.
      <br />
      <b>Step 3:</b> When you use your mobile device, please make sure to press
      on the link (“Download Your Photos For Print”) and then click “save” your
      photos to your “photos library”. If you use your PC, press “Right Click”
      on the photo link (“Download Your Photos For Print”) placed under your
      “Order items” section, then choose “save link as” & save it as a .jpeg.
      <br />
      <b>Step4:</b> Press “Ctrl+P” or right click “Print” and your print
      settings will appear. Make sure to pick 4”X6” size paper, with a minimum
      600 dpi for quality. Also, make sure that your remove all border
      spaces/gaps, and print.
    </p>
  ),
}

const faq6_print: IFAQ = {
  key: 'faq6',
  question: 'How do I print photos at my local retailer (CVS, Walgreens, etc)?',
  answer: (
    <p>
      <b>Step1:</b> Open the confirmation email on your PC or Mobile.
      <br />
      <b>Step2:</b> When you use your mobile device, please make sure to press
      on the link (“Download Your Photos For Print”) and then click “Save” your
      photos to your “photo library”. If you use your PC, “Right Click” on the
      photo link (“Download Your Photos For Print”) placed under your “Order
      items” section and then choose “save link as & save it as a .jpeg”image.
      <br />
      <b>Step3:</b> Before going to the store, you will likely need to upload
      your digital photo file to the store&apos;s website. Go online to the
      links below, if your chose one of these options.
      <br />
      <a
        href="https://www.cvs.com/photo/prints"
        target="_blank"
        rel="noreferrer">
        https://www.cvs.com/photo/prints
      </a>{' '}
      (or){' '}
      <a
        href="https://photo.walgreens.com/store/prints"
        target="_blank"
        rel="noreferrer">
        https://photo.walgreens.com/store/prints
      </a>
      <br />
      <b>Step4:</b> Choose the “Prints & Enlargements” option.
      <br />
      <b>Step5:</b> Upload your saved photos to the designated website.
      <br />
      <b>Step6:</b> Make sure to choose the 4”X6” glossy photo paper.
      <br />
      <b>Step7:</b> Pay online. The photos will be waiting for your at the
      store.
      <br />
      <b>Step8:</b> Pick up your photos and enjoy your future travels.
    </p>
  ),
}

const faq7_print: IFAQ = {
  key: 'faq7',
  question: 'How do I upload my digital photo to Gov/Official websites?',
  answer: (
    <p>
      <b>Step1:</b> Open the confirmation email on your PC or Mobile.
      <br />
      <b>Step2:</b> Download Your Single Digital Photo” and then click “save”
      your photos to your “photo library”. If your use your PC, press “Right
      Click” on the photo link (“Download Your Single Digital Photo”) placed
      under your “Order items” section, then choose “save link as & save it as a
      .jpeg image file
      <br />
      <b>Step3:</b> our are all set - your can now upload your digital (single)
      photo to any official website that has the option to do so.
    </p>
  ),
}

const faqUk1: IFAQ = {
  key: 'faq1',
  question: 'What is your passport photo print and ship service?',
  answer: (
    <p>
      - We will print and ship to you
      <br />
      - On required glossy photo paper
      <br />
      - 2 to 6 Photos Per Person
      <br />- Processing Instruction Guide
    </p>
  ),
}

const faqUk2: IFAQ = {
  key: 'faq2',
  question:
    'What are your passport photo delivery options? (Home & Digital Delivery)',
  answer: (
    <p>
      <b>Home Delivery:</b>
      <br />
      - Standard Shipping (Royal Mail): 2-3 working days, including Saturdays
      <br />- Priority Service Shipping (Royal Mail): The next working day –
      including Saturdays
      <br />
      <br />
      <b>Digital / Online Delivery:</b>
      <br />
      Photos arrive as a .jpeg for you to print or present with you digital
      application. You may also choose to have it sent to a local retail store
      (Tesco, ASDA, Sainsbury’s, Boots, etc.) where passport photo printing is
      available.
    </p>
  ),
}

const faqUk2_online: IFAQ = {
  key: 'faq2',
  question: 'What are your delivery options? (Home & Digital Delivery)',
  answer: (
    <p>
      <b>Home Delivery:</b>
      <br />
      We offer 2 shipping options with our Print & Ship service:
      <br />
      - Expedited 1-2 business days
      <br />- Standard 3-5 business days
      <br />
      <br />
      <b>Digital / Online Delivery:</b>
      <br />
      Photos arrive as a .jpeg for your to print on your own. your may also
      choose to have it sent to a retail store with passport picture printing
      available. (CVS, Walgreens, etc.)
    </p>
  ),
}

const faqUk2_own: IFAQ = faqUk2_online
const faqUk2_phone: IFAQ = faqUk2_online
const faqUk2_print: IFAQ = faqUk2_online
const faqUk2_app: IFAQ = faqUk2_online

const faqUk3: IFAQ = {
  key: 'faq3',
  question:
    'How do I print my passport photos at a local printer (Tesco, ASDA, Etc.)?',
  answer: (
    <p>
      <b>Printing at Tesco for only £0.70:</b>
      <br />
      <b>Step 1: </b>Open the confirmation email on your PC/Mobile.
      <br />
      <b>Step 2: </b>When you use your mobile device, please make sure to press
      on the link (“Download Your Photos For Print”) and then click “save” your
      photos to your “photos library”. If you use your PC, press “Right Click”
      on the photo link (“Download Your Photos For Print”) placed under your
      “Order items” section (above) {'->'} and then choose “save link as” {'->'}{' '}
      save it as a “.jpg” image file.
      <br />
      <b>Step 3: </b>Before going to the store, you will need to upload your
      digital photo file to the store&apos;s website. Go online to this link:{' '}
      <a
        href="https://www.tescophoto.com/photo-printing.html"
        target="_blank"
        rel="noreferrer">
        https://www.tescophoto.com/photo-printing.html
      </a>
      <br />
      <b>Step 4: </b>Choose the “Order Now” option.
      <br />
      <b>Step 5: </b>Make sure to choose the “6” X 4” Print” paper size option.
      Click on “Choose Your Photos”
      <br />
      <b>Step 6: </b>Uploading your saved photos: Choose the “Upload from files”
      option and upload your saved photo {'->'} Click “Continue”
      <br />
      <b>Step 7: </b>Proceed to Checkout and Pay online. The photos will be
      waiting for you at the store.
      <br />
      <b>Step 8: </b>Pick up your photos and enjoy your future travels.
      <br />
      <br />
      <b>Printing at ASDA for only £0.11:</b>
      <br />
      <b>Step 1: </b>Open the confirmation email on your PC/Mobile.
      <br />
      <b>Step 2: </b>When you use your mobile device, please make sure to press
      on the link (“Download Your Photos For Print”) and then click “save” your
      photos to your “photos library”. If you use your PC, press “Right Click”
      on the photo link (“Download Your Photos For Print”) placed under your
      “Order items” section (above) {'->'} and then choose “save link as” {'->'}{' '}
      save it as a “.jpg” image file.
      <br />
      <b>Step 3: </b>Before going to the store, you will need to upload your
      digital photo file to the store&apos;s website. Go online to this link:{' '}
      <a href="https://www.asda-photo.co.uk/" target="_blank" rel="noreferrer">
        https://www.asda-photo.co.uk/
      </a>
      <br />
      <b>Step 4: </b>Choose the “Order Prints” option on the top right section
      of the page.
      <br />
      <b>Step 5: </b>Click on “Upload Photos” {'->'} Make sure to choose the “6”
      X 4” Print” paper size option {'->'} Click “Add” {'->'} Click on “Add to
      Basket”
      <br />
      <b>Step 6: </b>Proceed to Checkout and Pay online. The photos will be
      waiting for you at the store.
      <br />
      <b>Step 7: </b>Pick up your photos and enjoy your future travels.
      <br />
    </p>
  ),
}

const faqUk4: IFAQ = {
  key: 'faq4',
  question: 'How do I print my photo at home using my home printer?',
  answer: (
    <p>
      First, please be sure to have 10 x 15 cm glossy photo paper at home.
      <br />
      <br />
      <b>Step 1: </b>Open the confirmation email on your PC.
      <br />
      <b>Step 2: </b>When you use your mobile device, please make sure to press
      on the link (“Download Your Photos For Print”) and then click “save” your
      photos to your “photos library”. If you use your PC, press “Right Click”
      on the photo link (“Download Your Photos For Print”) placed under your
      “Order items” section (above) {'->'} and then choose “save link as” {'->'}{' '}
      save it as a “.jpg” image file.
      <br />
      <b>Step 3: </b>Press “Ctrl+P” or right click “Print” and your print
      settings will appear. Make sure to pick 4”X6” size paper, with a minimum
      600 dpi for quality. Also, make sure that you remove all border
      spaces/gaps, and print!
    </p>
  ),
}

const faqUk5: IFAQ = {
  key: 'faq5',
  question:
    'How do I upload my digital photo to renew my passport (Passport Renewal Only)?',
  answer: (
    <p>
      <b>Step 1: </b>Open the confirmation email on your PC.
      <br />
      <b>Step 2: </b>When you use your mobile device, please make sure to press
      on the link (“Download Your Single Digital Photo”) and then click “save”
      your photos to your “photos library”. If you use your PC, press “Right
      Click” on the photo link (“Download Your Single Digital Photo”) placed
      under your “Order items” section (above) {'->'} and then choose “save link
      as” {'->'} save it as a “.jpg” image file.
      <br />
      <b>Step 3: </b>You may now upload your digital (single) photo at the{' '}
      <a
        href="https://www.passport.service.gov.uk/filter/overseas"
        target="_blank"
        rel="noreferrer">
        Passport Service Gov Link
      </a>{' '}
      for renewal or print it for your paper application.
      <br />
      <br />* Please note: This option is not available for new passport
      applications.
    </p>
  ),
}

const faqUk6: IFAQ = {
  key: 'faq6',
  question: 'How to take your digital passport photo?',
  answer: (
    <p>
      <b>Use a plain light-coloured background</b>
      <br />
      - No texture or patterns
      <br />
      - No objects behind you
      <br />
      <br />
      <b>Even lighting and no shadows</b>
      <br />
      - Balanced light - no shadows on your face or behind you
      <br />
      - It’s best to use natural sunlight, for example facing a window
      <br />
      <br />
      <b>Stand in the right position</b>
      <br />
      - Stand 0.5 metres (1.5 feet) away from your background (this reduces
      shadow)
      <br />
      - The person taking the photo should stand 1.5 metres (5 feet) from you
      <br />
      - Include your head, shoulders and upper body in the photo
      <br />
      - Don’t crop your photo - it will be done for you
      <br />
      <br />
      <b>Plain expression and face in full view</b>
      <br />
      - Face front on to the camera
      <br />
      - Don’t smile or frown - eyes open and mouth closed
      <br />
      - Your photo should be a good likeness and taken in the last month
      <br />
      <br />
      <b>No headwear</b>
      <br />
      - Unless it’s for religious or medical reasons
      <br />
      <br />
      <b>Eyes fully visible</b>
      <br />
      - Hair away from your face and eyes
      <br />
      - Take your glasses off (if you can)
      <br />
      <br />
      <b>If you need to keep glasses on</b>
      <br />
      - Your eyes must be visible without any glare or reflections
      <br />- No sunglasses or tinted glasses
    </p>
  ),
}

const faqUk7_online: IFAQ = {
  key: 'faq7',
  question: 'How long does it take to process my order?',
  answer: (
    <p>
      Your “Digital Photos” in a PNG & JPEG files will be emailed to your within
      minutes. When choosing the “Printed Version” where we will print and ship
      your photos to you with through our concierge service - the processing the
      order usually takes place on the same day, if you place your order by 4
      PM. If not, do not worry. We will process your order within 24 hours,
      during normal business hours and days (Monday - Friday).
      <br />
      <br />
      Standard shipping is 3-5 business days
      <br />
      Expedited shipping is 1-2 business days
      <br />
    </p>
  ),
}

const faqUk7_own: IFAQ = faqUk7_online
const faqUk7_phone: IFAQ = faqUk7_online
const faqUk7_print: IFAQ = faqUk7_online
const faqUk7_app: IFAQ = faqUk7_online

export const HomepageContent: Record<
  string,
  { title: string; description: any; seo?: string[] }
> = {
  default: {
    title: 'Take Your Passport and Visa Photos Online',
    description: 'Get your perfect biometric photo (compliance guaranteed)',
  },
  'order-passport-photos-online': {
    title: 'Order Your Passport Photos Online With Our Simple Digital Tool',
    description:
      'Use your cell phone and order your passport photos online. We’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.',
  },
  'order-passport-photos-online-gb': {
    title: 'Order Your Passport Photos Online With Our Simple Digital Tool',
    description:
      "Use your cell phone and order your passport photos online. We've made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.",
  },
  'take-your-own-passport-photo': {
    title: 'Yes! You Can Take Your Own Passport Photo.',
    description:
      'Take your own passport photo with your cell phone. We’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.',
  },
  'take-your-own-passport-photo-gb': {
    title: 'Yes! You Can Take Your Own Passport Photo With Your Phone',
    description:
      "Take your own passport photo with your cell phone. We've made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.",
  },
  'take-your-passport-photo-with-your-phone': {
    title: 'Go Ahead, Take Your Passport Photo With Your Phone',
    description:
      'Take your passport photo with your cell phone, we’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.',
  },
  'take-your-passport-photo-with-your-phone-gb': {
    title: 'Go Ahead, Take Your Passport Photo With Your Phone',
    description:
      "Take your passport photo with your cell phone, We've made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.",
  },
  'take-passport-photos-at-home': {
    title: 'Take Your Passport Photo at Home, With Our Simple to Tool',
    description:
      'From home or virtually anywhere, take your passport photo with your cell phone or desktop. We’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.',
  },
  'take-passport-photos-at-home-gb': {
    title: 'Go Ahead, Take Your Passport Photo With Your Phone',
    description: (
      <>
        <div className="uk-landing-page-desc">
          <div />
          Take your Passport Photo with your cellphone
        </div>
        <div className="uk-landing-page-desc">
          <div />
          Our software verifies government compliance
        </div>
        <div className="uk-landing-page-desc">
          <div />
          Ready for your digital or paper application
        </div>
        <div className="uk-landing-page-desc">
          <div />
          We will print and ship them to you or print them at home
        </div>
      </>
    ),
  },
  'print-passport-photos-at-home': {
    title: 'Print Your Passport Photo at Home, With Our Simple Tool',
    description:
      'Use your cell phone and print your passport photo at home. We’ve made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.',
  },
  'print-passport-photos-at-home-gb': {
    title: 'Print Your Passport Photo at Home, With Our Simple Tool',
    description:
      "Use your cell phone and print your passport photo at home. We've made it easy. Our software makes sure it’s verified and you’ll receive it ready for your application.",
  },
  'passport-photo-app': {
    title: "You Don't Need an App For A Photo That'll Last You 10 Years",
    description:
      "Our web based passport photo verification tool is all you'll need to get the shot you want.  From home or virtually anywhere, take your photo with your cell phone.",
  },
  'passport-photo-app-gb': {
    title: "You Don't Need an App For A Photo That'll Last You 10 Years",
    description:
      "Our web based passport photo verification tool is all you'll need to get the shot you want.  From home or virtually anywhere, take your photo with your cell phone. ",
  },
}

export const Faqs: Record<string, IFAQ[]> = {
  default: [...commonFaqs, faq5, faq6, faq7],
  'order-passport-photos-online': [...commonFaqs, faq5, faq6, faq7],
  'order-passport-photos-online-gb': [
    faqUk1,
    faqUk2_online,
    faqUk3,
    faqUk4,
    faqUk5,
    faq6,
    faqUk7_online,
  ],
  'take-your-own-passport-photo': [...commonFaqs, faq5, faq6, faq7],
  'take-your-own-passport-photo-gb': [
    faqUk1,
    faqUk2_own,
    faqUk3,
    faqUk4,
    faqUk5,
    faq6,
    faqUk7_own,
  ],
  'take-your-passport-photo-with-your-phone': [...commonFaqs, faq5, faq6, faq7],
  'take-your-passport-photo-with-your-phone-gb': [
    faqUk1,
    faqUk2_phone,
    faqUk3,
    faqUk4,
    faqUk5,
    faq6,
    faqUk7_phone,
  ],
  'take-passport-photos-at-home': [...commonFaqs, faq5, faq6, faq7],
  'take-passport-photos-at-home-gb': [
    faqUk1,
    faqUk2,
    faqUk3,
    faqUk4,
    faqUk5,
    faqUk6,
  ],
  'print-passport-photos-at-home': [
    ...commonFaqs,
    faq5_print,
    faq6_print,
    faq7_print,
  ],
  'print-passport-photos-at-home-gb': [
    faqUk1,
    faqUk2_print,
    faqUk3,
    faqUk4,
    faqUk5,
    faq6,
    faqUk7_print,
  ],
  'passport-photo-app': [...commonFaqs, faq5_print, faq6_print, faq7_print],
  'passport-photo-app-gb': [
    faqUk1,
    faqUk2_app,
    faqUk3,
    faqUk4,
    faqUk5,
    faq6,
    faqUk7_app,
  ],
}
