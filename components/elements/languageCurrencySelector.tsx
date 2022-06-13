import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { components } from 'react-select'
import { ValueContainerProps } from 'react-select/dist/declarations/src/components/containers'
import Image from 'next/image'
import dynamic from 'next/dynamic'

import { Currency, CurrencyCode } from '@/generated/graphql'
import { IDropdownOption } from '@/components/elements/dropdownPicker'
import { useCurrency, useLanguage, ILanguage } from '@/hooks/index'

const Modal = dynamic(() => import('@/components/elements/modalContainer'), {
  ssr: false,
})

const DropdownPicker = dynamic(
  () => import('@/components/elements/dropdownPicker'),
)

const LanguageOptionContainer: React.FC<any> = (props) => (
  <components.Option {...props}>
    <div className="language-option-container">
      <span>{props.label}</span>
    </div>
  </components.Option>
)

const LanguageValueContainer: React.FC<ValueContainerProps<ILanguage>> = ({
  children,
  ...props
}) => (
  <div className="language-value-container">
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  </div>
)

const CurrencyOptionContainer = (props: any) => {
  const option = props.data

  return (
    <components.Option {...props}>
      <div className="currency-option-container">
        <div className={`flag-icon flag-icon-${option?.value}`} />
        <div
          style={{
            paddingLeft: 8,
            flex: 1,
          }}>{`${option.displayLabel}, ${option?.label}`}</div>
        <div>{option?.symbol}</div>
      </div>
    </components.Option>
  )
}

const CountryFlagValueContainer: React.FC<ValueContainerProps<Currency>> = ({
  children,
  ...props
}) => {
  const selected = props.getValue()[0]
  if (!selected) return null

  return (
    <div className="currency-value-container">
      {props.hasValue && !!selected.code && (
        <span className={`flag-icon flag-icon-${selected.code}`} />
      )}
      <components.ValueContainer {...props}>
        {children}
      </components.ValueContainer>
      <div className="currency-symbol">{selected.symbol}</div>
    </div>
  )
}

const LanguageCurrencySelector: React.FC<{ wrapperClass?: string }> = ({
  wrapperClass,
}) => {
  const { currentLanguage, languages, onChangeLanguage } = useLanguage()
  const {
    currentCurrency,
    currencies,
    loading: loadingCurrency,
    onChangeCurrency,
  } = useCurrency()
  const [open, setOpen] = useState<boolean>(false)
  const [lang, setLang] = useState<ILanguage | undefined>()
  const [cur, setCur] = useState<IDropdownOption | undefined>()

  const getCurrencyLabel = useCallback((code: CurrencyCode) => {
    let label = ''
    if (code === CurrencyCode.Us) {
      label = 'USA Dollar'
    } else if (code === CurrencyCode.Eu) {
      label = 'Euro'
    } else if (code === CurrencyCode.Gb) {
      label = 'Pound Sterling'
    }

    return label
  }, [])

  const currencyOptions = useMemo(
    () =>
      currencies.map((_currency) => ({
        ..._currency,
        displayLabel: _currency.label,
        label: getCurrencyLabel(_currency.code),
        value: _currency.code,
      })),
    [currencies, getCurrencyLabel],
  )

  useEffect(() => {
    if (!lang) {
      setLang(currentLanguage)
    }
  }, [currentLanguage, lang])

  useEffect(() => {
    setCur({
      ...currentCurrency,
      displayLabel: currentCurrency.label,
      label: getCurrencyLabel(currentCurrency.code),
      value: currentCurrency.code,
    })
  }, [currentCurrency, getCurrencyLabel])

  const onApply = useCallback(() => {
    onChangeLanguage(lang?.value)
    onChangeCurrency({
      code: cur?.code,
      label: cur?.displayLabel,
      symbol: cur?.symbol,
    })
    setOpen(false)
  }, [cur, lang?.value, onChangeCurrency, onChangeLanguage])

  const onCloseModal = useCallback(() => {
    setOpen(false)
    setCur({
      ...currentCurrency,
      displayLabel: currentCurrency.label,
      label: getCurrencyLabel(currentCurrency.code),
      value: currentCurrency.code,
    })
  }, [currentCurrency, getCurrencyLabel])

  if (!lang || !cur || loadingCurrency) return null

  return (
    <div className={wrapperClass}>
      <div
        className="language-currency-selector-container"
        onClick={() => setOpen(true)}>
        <Image
          src="/images/icons/globe.svg"
          width={16}
          height={16}
          alt="An SVG of an globe"
        />
        <span>{lang.label}</span>
        <div className="currency-divider" />
        <span>{`${currentCurrency.symbol} (${currentCurrency.label})`}</span>
        <Image
          src="/images/icons/chevron-right.svg"
          width={18}
          height={18}
          alt="An SVG of an chevron"
        />
      </div>
      <Modal open={open} closeModal={onCloseModal}>
        <div className="language-currency-modal">
          <span className="modal-title">Language & Currency setting</span>
          <div className="modal-body">
            <DropdownPicker
              className="languages"
              label="Select language"
              options={languages}
              value={lang}
              optionContainer={LanguageOptionContainer}
              valueContainer={LanguageValueContainer}
              onChange={(v: ILanguage) => setLang(v)}
            />
            <DropdownPicker
              className="currencies"
              label="Select currency"
              options={currencyOptions}
              value={cur}
              optionContainer={CurrencyOptionContainer}
              valueContainer={CountryFlagValueContainer}
              onChange={(v) => setCur(v)}
            />
          </div>
          <div className="modal-footer">
            <div className="submit-btn">
              <a
                className="main-btn medium outline apply-button"
                onClick={onApply}>
                Apply
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default LanguageCurrencySelector
