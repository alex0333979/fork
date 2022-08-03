import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import classNames from 'classnames'
import { Bars } from 'react-loading-icons'
import { useSendEmailToAdminMutation } from '@/apollo'
import { showError, showSuccess } from '@/utils'

const FaqForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [sendEmailToAdmin] = useSendEmailToAdminMutation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = useCallback(
    async (input: { email: string; name: string; question: string }) => {
      setLoading(true)
      const { data } = await sendEmailToAdmin({ variables: { data: input } })
      if (data?.SendEmailToAdmin.status ?? false) {
        showSuccess('Your question is sent to admin successfully.')
      } else {
        showError('Send email to admin is failed')
      }
      setLoading(false)
    },
    [sendEmailToAdmin],
  )

  return (
    <div className="faq-form">
      <div className="container">
        <div className="data-wrap">
          <div className="form-wrap">
            <div className="sub-title">
              <h2>{'Have a question?'}</h2>
              <p>{'Biometrically approved photos'}</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-fields">
                <label className="half-size">
                  <span className="label">{'Your name'}</span>
                  <span className="field">
                    <input
                      type="text"
                      placeholder="Your name"
                      className={classNames({
                        'error-border': errors.name,
                      })}
                      {...register('name', { required: true })}
                    />
                  </span>
                  <span className="warning">{'Warning message'}</span>
                </label>
                <label className="half-size">
                  <span className="label">{'Your E-mail'}</span>
                  <span className="field">
                    <input
                      type="email"
                      placeholder="Your E-mail"
                      className={classNames({
                        'error-border': errors.email,
                      })}
                      {...register('email', {
                        required: true,
                        pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      })}
                    />
                  </span>
                </label>
                <label className="full-size">
                  <span className="label">Your question</span>
                  <span className="field">
                    <textarea
                      placeholder="Your question"
                      className={classNames({
                        'error-border': errors.question,
                      })}
                      {...register('question', { required: true })}
                    />
                  </span>
                </label>
              </div>

              <div className="submit-btn">
                <button type="submit" className="main-btn big">
                  {loading ? (
                    <Bars height={25} fill={'#FFFFFF'} stroke={'transparent'} />
                  ) : (
                    <>{'Send'}</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FaqForm
