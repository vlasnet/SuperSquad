import React from 'react';
import PropTypes from 'prop-types';
import Container from "../shared/Container";
import styles from './styles.css';

const SquadStructure = ({heroes}) => (
  <Container content>
    <ul>
      {heroes.map(hero => (
        <li key={hero.id} className={styles.item}>{hero.name}</li>
      ))}
    </ul>
  </Container>
);

SquadStructure.propTypes = {
  heroes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      strength: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired
};

export default SquadStructure;
