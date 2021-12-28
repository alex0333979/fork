import React, { useMemo } from 'react';
import Select, { components } from 'react-select';
import countryList from 'react-select-country-list';
import { ValueContainerProps } from 'react-select/dist/declarations/src/components/containers';
import { countries } from '@/lib/utils/countries';

export interface iCountry {
  label: string;
  value: string;
}

export function CountryFlag(props: { code: string; size?: string }) {
  return (
    <span
      className={'flag-icon flag-icon-' + props.code}
      style={{ fontSize: props.size || '25px' }}
    />
  );
}

export const CountryFlagSelectOption = (props: any) => (
  <components.Option {...props}>
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <CountryFlag size={props.flagSize} code={props.value.toLowerCase()} />
      <span style={{ marginLeft: '8px' }}>{props.label}</span>
    </div>
  </components.Option>
);

export const CountryFlagValueContainer: React.FC<ValueContainerProps<iCountry>> = ({
  children,
  ...props
}) => {
  const code = (props.hasValue && props.getValue()[0].value) || false;

  return (
    <div style={{ display: 'flex', flexGrow: 1, alignItems: 'center', paddingLeft: '8px' }}>
      {(code && <CountryFlag code={code.toLowerCase()} />) || null}
      <components.ValueContainer {...props}>{children}</components.ValueContainer>
    </div>
  );
};

const styles = {
  valueContainer: (base: any) => {
    const height = '55px';
    return { ...base, height };
  },
  menuPortal: (provided: any) => ({
    ...provided,
    zIndex: 9999
  })
};

export interface CountrySelectorProps {
  country: iCountry;
  onSelectCountry: (value: iCountry) => void;
}

const CountrySelector: React.FC<CountrySelectorProps> = ({ country, onSelectCountry }) => {
  const options = useMemo<iCountry[]>(() => {
    const all = countryList().getData();
    return all.filter((c) => countries.find((ic) => ic.country === c.label));
  }, []);

  const changeHandler = (value: any) => {
    onSelectCountry(value);
  };

  return (
    <Select
      styles={styles}
      options={options}
      value={country}
      onChange={changeHandler}
      menuPortalTarget={document.body}
      components={{
        Option: CountryFlagSelectOption,
        ValueContainer: CountryFlagValueContainer
      }}
    />
  );
};

export default CountrySelector;
