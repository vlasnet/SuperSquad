import React from 'react';
import PropTypes from 'prop-types';
import Container from "../shared/Container";
import Hero from "../Hero";
import styles from './styles.css';

const HeroList = ({visibleHeroes, addHeroToSquad, deleteHero, showHeroInfo}) => (

  <Container stats>
    <ul className={styles.list}>
      {visibleHeroes.map(hero => (
        <li key={hero.id} className={styles.listItem}>
          <Hero hero={hero} addHeroToSquad={() => addHeroToSquad(hero.id)} deleteHero={deleteHero}
                showHeroInfo={showHeroInfo}/>
        </li>
      ))}
    </ul>
  </Container>
);

HeroList.propTypes = {
  addHeroToSquad: PropTypes.func.isRequired,
  deleteHero: PropTypes.func.isRequired,
  showHeroInfo: PropTypes.func.isRequired,
  visibleHeroes: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      strength: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
};

export default HeroList;
