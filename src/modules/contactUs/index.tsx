/* eslint-disable no-template-curly-in-string */
/* eslint-disable max-len */
import React, { useCallback, useState } from 'react'
import classNames from 'classnames'
import { useForm, Controller } from 'react-hook-form'
import { Bars } from 'react-loading-icons'
import Input from 'react-phone-number-input/input'
import { isValidPhoneNumber } from 'react-phone-number-input'
import { PrismicRichText } from '@prismicio/react'
import { PrismicNextImage } from '@prismicio/next'

import { showError, showSuccess } from '@/utils'
import { useSendEmailToAdminMutation } from '@/apollo'
import { ContactUsPageProps } from '@/pages/contact-us'

import { IContactUsForm } from './types'
import ContactItem from './contactItem'

import 'react-phone-number-input/style.css'

const ContactUs: React.FC<ContactUsPageProps> = ({ page }) => {
  const [loading, setLoading] = useState<boolean>(false)
  const [sendEmailToAdmin] = useSendEmailToAdminMutation()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IContactUsForm>()

  const onSubmit = useCallback(
    async (d: IContactUsForm) => {
      setLoading(true)
      const { data } = await sendEmailToAdmin({
        variables: {
          data: {
            name: `${d.firstName} ${d.lastName}`,
            email: d.email,
            phone: d.phone,
            question: d.message,
          },
        },
      })
      if (data?.SendEmailToAdmin.status ?? false) {
        showSuccess('Your email is sent to admin successfully.')
      } else {
        showError('Send email to admin is failed')
      }
      setLoading(false)
    },
    [sendEmailToAdmin],
  )

  return (
    <>
      <div className="contacts-page">
        <div className="container">
          <div className="title">
            <div className="contacts-bg">
              <PrismicNextImage field={page?.data.title_background} />
            </div>
            <PrismicRichText field={page?.data.title} />
          </div>
        </div>
      </div>

      <div className="contacts-data">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="title">
                <PrismicRichText field={page?.data.sub_title} />
                <PrismicRichText field={page?.data.sub_text} />
              </div>
            </div>
            <div className="col-12 col-lg-4">
              <div className="text">
                <ul>
                  {page?.data.contacts_list.map((item: any, index: number) => (
                    <ContactItem key={index} contact={item} />
                  ))}
                </ul>
                <div className="d-flex align-center btn">
                  <PrismicRichText field={page?.data.direction_link} />
                  <span className="icon-longarrow" />
                </div>
              </div>
            </div>
            <div className="col-12 col-lg-8">
              <form onSubmit={handleSubmit(onSubmit)}>
                <label className="form-field col-12 col-lg-6">
                  <span>First Name</span>
                  <input
                    type="text"
                    placeholder="First Name"
                    className={classNames({
                      'error-border': errors.firstName,
                    })}
                    {...register('firstName', { required: true })}
                  />
                </label>
                <label className="form-field col-12 col-lg-6">
                  <span>Last Name*</span>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={classNames({
                      'error-border': errors.lastName,
                    })}
                    {...register('lastName', { required: true })}
                  />
                </label>
                <label className="form-field col-12 col-lg-6">
                  <span>Email </span>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className={classNames({
                      'error-border': errors.email,
                    })}
                    {...register('email', {
                      required: true,
                      pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                    })}
                  />
                </label>
                <label className="form-field col-12 col-lg-6">
                  <span>Phone Number*</span>
                  <Controller
                    name="phone"
                    control={control}
                    rules={{
                      validate: (value) => isValidPhoneNumber(value ?? ''),
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        country="US"
                        international
                        withCountryCallingCode
                        value={value}
                        onChange={onChange}
                        className={classNames({
                          'error-border': errors.phone,
                        })}
                      />
                      // <PhoneInput
                      //   country="US"
                      //   international
                      //   value={value}
                      //   onChange={onChange}
                      //   defaultCountry="TH"
                      //   id="phone-input"
                      //   placeholder="Phone Number"
                      //   className={classNames({
                      //     'error-border': errors.phone
                      //   })}
                      // />
                    )}
                  />
                </label>
                <label className="form-field col-12">
                  <span>Leave A Message</span>
                  <textarea
                    placeholder="Message"
                    className={classNames({
                      'error-border': errors.message,
                    })}
                    {...register('message', { required: true })}
                  />
                </label>
                <div className="form-submit submit-btn col-12">
                  <button type="submit" className="main-btn">
                    {loading ? (
                      <Bars height={25} fill="#FFFFFF" stroke="transparent" />
                    ) : (
                      <>Send</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="contacts-map">
        <div className="container">
          <div className="map-wrap">
            <div style={{ width: '100%' }}>
              <iframe
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                marginHeight={0}
                marginWidth={0}
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;
                hl=en&amp;q=185%20Great%20Neck%20Road,%20NY%2011021+(185%20Great%20Neck%20Road,
                %20NY%2011021)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs
