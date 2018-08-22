import React from 'react';
import PropTypes from 'prop-types';
import Container from "../shared/Container";
import Button from "../shared/Button";
import SquadStats from "../SquadStats";
import Hero from "../Hero";
import Icon from '../shared/Icon';
import {ICONS} from '../shared/Icon/icons';
import styles from './styles.css';

const SquadEditor = ({heroesInSquad, stats, addSquad, resetSquad, showHeroInfo, removeHeroFromSquad}) => (
  <Container title='Squad Editor' column shadow>
    <Container>
      <Button text='Save Squad' onClick={() => addSquad()}>
        <Icon icon={ICONS.SAVE} color="#fff"/>
      </Button>
      <Button text='Reset Editor' onClick={resetSquad}>
        <Icon icon={ICONS.RESET} view={427} color="#fff"/>
      </Button>
    </Container>
    <SquadStats stats={stats}/>
    <ul className={styles.list}>
      {heroesInSquad.map(hero => (
        <li key={hero.id} className={styles.listItem}>
          <Hero hero={hero}
                removeHeroFromSquad={removeHeroFromSquad}
                showHeroInfo={showHeroInfo}
          />
        </li>
      ))}
    </ul>
  </Container>
);

SquadEditor.propTypes = {
  heroesInSquad: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      strength: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  stats: PropTypes.shape({
    str: PropTypes.number.isRequired,
    int: PropTypes.number.isRequired,
    spd: PropTypes.number.isRequired,
  }).isRequired,
  addSquad: PropTypes.func.isRequired,
  resetSquad: PropTypes.func.isRequired,
  showHeroInfo: PropTypes.func.isRequired,
  removeHeroFromSquad: PropTypes.func.isRequired,
};

export default SquadEditor;
