import React from 'react';
import PropTypes from 'prop-types';
import Container from '../Container/index';
import styles from './styles.css'


const SearchField = props => {
  const { filter, handleFilter } = props;
  const onSearchInput = event => handleFilter (event.target.value);

  return (
    <Container search shadow>
      <input className={styles.search} type="text" placeholder="Search by name" value={filter} onChange={onSearchInput}/>
    </Container>
  );
};

SearchField.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default SearchField;
