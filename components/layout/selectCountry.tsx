import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Country, useCountriesQuery } from '@/generated/graphql';
import classNames from 'classnames';
import axios from 'axios';

interface SelectCountryProps {
  selectedCountry: (country: Country) => void;
}

const SelectCountry: React.FC<SelectCountryProps> = ({ selectedCountry }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [country, setCountry] = useState<Country | undefined>(undefined);
  const { data } = useCountriesQuery();
  const countries = useMemo(() => data?.Countries?.data, [data?.Countries?.data]);
  const [filtered, setFiltered] = useState<Country[]>(countries ?? []);

  const onSelectCountry = useCallback(
    (country: Country) => {
      setCountry(country);
      setOpen(false);
      selectedCountry(country);
    },
    [selectedCountry]
  );

  const getGeoInfo = useCallback(() => {
    axios
      .get('https://ipapi.co/json/')
      .then((response) => {
        const data = response.data;
        for (const c of countries ?? []) {
          if (c.country?.toLowerCase() === data.country_name.toLowerCase()) {
            setCountry(c);
            break;
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [countries]);

  useEffect(() => {
    getGeoInfo();
  }, [getGeoInfo]);

  useEffect(() => {
    if (open) {
      setSearch(undefined);
    }
  }, [open]);

  useEffect(() => {
    setFiltered(
      countries?.filter((item) =>
        item.country?.toLowerCase().includes(search?.toLowerCase() ?? '')
      ) ?? []
    );
  }, [search, countries]);

  return (
    <div
      className="location"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}>
      <div className="current">
        <p>{country?.country ?? 'United States'}</p>
      </div>
      <div className={classNames('drop-item', { open })}>
        <ul className="search">
          <li>
            <input value={search ?? ''} onChange={(e) => setSearch(e.target.value)} />
          </li>
        </ul>
        <ul className="drop-item-list">
          {filtered?.map((item, index) => (
            <li key={index}>
              <a onClick={() => onSelectCountry(item)}>{item.country}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectCountry;
