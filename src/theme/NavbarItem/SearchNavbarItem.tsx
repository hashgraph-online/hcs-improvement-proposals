import React from 'react';
import type {Props} from '@theme/NavbarItem/SearchNavbarItem';
import SearchBar from '../SearchBar';

export default function SearchNavbarItem({mobile, className}: Props) {
  if (mobile) {
    return null;
  }

  return (
    <div className={className}>
      <SearchBar />
    </div>
  );
}
