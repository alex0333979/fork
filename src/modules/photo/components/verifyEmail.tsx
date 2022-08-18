import React, { useCallback, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { Bars } from 'react-loading-icons'
import { useCookies } from 'react-cookie'

import { useSendOtpMutation, useVerifyOtpMutation } from '@/apollo'
import { useAuth } from '@/hooks'
import { showError, showSuccess } from '@/utils'
import ModalContainer from '@/components/elements/modalContainer'
import { COOKIES_TOKEN_NAME, COOKIES_EDIT_ORDER_TOKEN_NAME } from '@/constants'
import { TOKEN_EXPIRE_IN } from '@/constants'

interface Props {
  accessToken: string
  onVerified: (imgUrl?: string) => void
}

const VerifyEmail: React.FC<Props> = ({ accessToken, onVerified }) => {
  const { isAuthenticated, setMe } = useAuth()
  const [cookies, setCookie] = useCookies([
    COOKIES_TOKEN_NAME,
    COOKIES_EDIT_ORDER_TOKEN_NAME,
  ])
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [emailVerified, setEmailVerified] = useState<boolean>(false)
  const [email, setEmail] = useState<string | undefined>()
  const [otp, setOtp] = useState<string>('')
  const [error, setError] = useState<string>('')

  const [sendOTP] = useSendOtpMutation()
  const [verifyOTP] = useVerifyOtpMutation()

  const editToken = useMemo(
    () => cookies[COOKIES_EDIT_ORDER_TOKEN_NAME],
    [cookies],
  )

  useEffect(() => {
    if (email === undefined) return
    setError((e) => (email ? '' : e))
  }, [email])

  useEffect(() => {
    if (isAuthenticated && editToken) {
      setOpen(false)
      setEmail(undefined)
      setOtp('')
      setLoading(false)
      setEmailVerified(false)
      setError('')
    } else {
      setOpen(true)
    }
  }, [editToken, isAuthenticated])

  const validate = useCallback((_email: string | undefined) => {
    let _error = ''

    if (!_email) _error = 'Please input email address'

    if (_email) {
      const re = /\S+@\S+\.\S+/
      const emailTest = re.test(_email)
      if (!emailTest) _error = 'Invalid email address'
    }

    setError(_error)
    return !_error
  }, [])

  const onSignIn = useCallback(async () => {
    if (validate(email)) {
      setLoading(true)
      const { data: sendOtpRes } = await sendOTP({
        variables: {
          accessToken,
          email: email || '',
        },
      })

      if (sendOtpRes?.SendOTP?.status) {
        showSuccess(sendOtpRes?.SendOTP?.message || '')
        setEmailVerified(true)
      } else {
        showError(sendOtpRes?.SendOTP?.message || '')
      }
      setLoading(false)
    }
  }, [accessToken, email, sendOTP, validate])

  const onVerifyOtp = useCallback(async () => {
    if (otp.length === 6) {
      setLoading(true)
      const { data: verifyOtpRes } = await verifyOTP({
        variables: {
          accessToken,
          otp,
        },
      })

      if (verifyOtpRes?.VerifyOTP?.status) {
        const data = verifyOtpRes?.VerifyOTP?.data

        setMe(data?.user || null)
        setCookie(COOKIES_TOKEN_NAME, verifyOtpRes?.VerifyOTP.data?.authToken, {
          path: '/',
          maxAge: TOKEN_EXPIRE_IN,
        })
        setCookie(
          COOKIES_EDIT_ORDER_TOKEN_NAME,
          verifyOtpRes?.VerifyOTP.data?.editToken,
          {
            path: '/',
            maxAge: 58800,
          },
        )
        onVerified(data?.imageUrl || '')
      } else {
        showError(verifyOtpRes?.VerifyOTP.message || '')
      }
      setLoading(false)
    }
  }, [accessToken, onVerified, otp, setCookie, setMe, verifyOTP])

  const onContinue = useCallback(async () => {
    if (emailVerified) {
      onVerifyOtp()
    } else {
      onSignIn()
    }
  }, [emailVerified, onSignIn, onVerifyOtp])

  const onResend = useCallback(() => {
    setEmailVerified(false)
    setOtp('')
  }, [])

  const canSubmit = useMemo(() => {
    if (error) return false
    if (emailVerified && otp.length < 6) return false

    return true
  }, [emailVerified, error, otp.length])

  return (
    <ModalContainer open={open}>
      <form className="modal-form email-verify-modal">
        <div className="custom-title">Sign in to Passport Photos</div>
        <div className="custom-subtitle">
          {emailVerified
            ? '6-digits security code'
            : 'Continue with your billing email address'}
        </div>
        <div className="form-fields">
          {emailVerified ? (
            <label className="full-size">
              <span className="label">Security code *</span>
              <span className="field">
                <input
                  name="otp"
                  value={otp}
                  placeholder="Security code"
                  onChange={(e) => setOtp(e.target.value)}
                />
              </span>
            </label>
          ) : (
            <label className="full-size">
              <span className="field">
                <input
                  type="email"
                  className={classNames({
                    'error-border': Boolean(error),
                  })}
                  name="email"
                  value={email || ''}
                  placeholder="your@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </span>
              {error ? <span className="attention">{error}</span> : <></>}
            </label>
          )}
          {emailVerified && (
            <div className="resend-otp">
              <span>{`Didn't receive a Security code?`}</span>
              <a className="resend-link" onClick={onResend}>
                Send again
              </a>
            </div>
          )}
          <label className="full-size">
            <button
              type="button"
              className="main-btn small full-size continue-button"
              disabled={!canSubmit}
              onClick={onContinue}>
              {loading ? (
                <Bars height={25} fill="#FFFFFF" stroke="transparent" />
              ) : (
                'Continue'
              )}
            </button>
          </label>
        </div>
      </form>
    </ModalContainer>
  )
}

export default VerifyEmail
