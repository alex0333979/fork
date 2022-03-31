import React, { useCallback, useEffect, useState } from 'react';
import { components } from 'react-select';
import { ValueContainerProps } from 'react-select/dist/declarations/src/components/containers';
import Image from 'next/image';
import dynamic from 'next/dynamic';

import { useAuth } from '@/lib/auth';
import { languages, currencies, ILanguage, ICurrency } from '@/constants/languageCurrencies';

const Modal = dynamic(() => import('@/components/elements/modalContainer'), {
  ssr: false
});

const DropdownPicker = dynamic(() => import('@/components/elements/dropdownPicker'));

const LanguageOptionContainer: React.FC<any> = (props) => (
  <components.Option {...props}>
    <div className="language-option-container">
      <span>{props.label}</span>
    </div>
  </components.Option>
);

const LanguageValueContainer: React.FC<ValueContainerProps<ILanguage>> = ({
  children,
  ...props
}) => (
  <div className="language-value-container">
    <components.ValueContainer {...props}>{children}</components.ValueContainer>
  </div>
);

const CurrencyOptionContainer = (props: any) => {
  const option = props.data;

  return (
    <components.Option {...props}>
      <div className="currency-option-container">
        <div className={`flag-icon flag-icon-${option?.value}`} />
        <div style={{ paddingLeft: 8, flex: 1 }}>{`${option.currency}, ${option?.label}`}</div>
        <div>{option?.symbol}</div>
      </div>
    </components.Option>
  );
};

const CountryFlagValueContainer: React.FC<ValueContainerProps<ICurrency>> = ({
  children,
  ...props
}) => {
  const selected = props.getValue()[0];
  return (
    <div className="currency-value-container">
      {props.hasValue && !!selected.value && (
        <span className={`flag-icon flag-icon-${selected.value}`} />
      )}
      <components.ValueContainer {...props}>{children}</components.ValueContainer>
      <div className="currency-symbol">{selected.symbol}</div>
    </div>
  );
};

const LanguageCurrencySelector: React.FC<{ wrapperClass?: string }> = ({ wrapperClass }) => {
  const { language, currency, onSetPreference } = useAuth();
  const [open, setOpen] = useState<boolean>(false);
  const [lang, setLang] = useState<ILanguage | undefined>();
  const [cur, setCur] = useState<ICurrency | undefined>();

  useEffect(() => {
    if (!lang) {
      const _lang = languages.find((l) => l.value === language.value);
      setLang(_lang);
    }

    if (!cur) {
      const _cur = currencies.find((c) => c.value === currency.value);
      setCur(_cur);
    }
  }, [cur, currency, lang, language]);

  const onApply = useCallback(() => {
    onSetPreference(lang?.value, cur?.value);
    setOpen(false);
  }, [cur?.value, lang?.value, onSetPreference]);

  if (!lang || !cur) return null;

  return (
    <div className={wrapperClass}>
      <div className="language-currency-selector-container" onClick={() => setOpen(true)}>
        <Image src="/images/icons/globe.svg" width={16} height={16} alt="An SVG of an globe" />
        <span>{lang.label}</span>
        <div className="currency-divider" />
        <span>{`${cur.symbol} (${cur.currency})`}</span>
        <Image
          src="/images/icons/chevron-right.svg"
          width={18}
          height={18}
          alt="An SVG of an chevron"
        />
      </div>
      <Modal open={open} closeModal={() => setOpen(false)}>
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
              options={currencies}
              value={cur}
              optionContainer={CurrencyOptionContainer}
              valueContainer={CountryFlagValueContainer}
              onChange={(v: ICurrency) => setCur(v)}
            />
          </div>
          <div className="modal-footer">
            <div className="submit-btn">
              <a className="main-btn medium outline apply-button" onClick={onApply}>
                Apply
              </a>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LanguageCurrencySelector;
