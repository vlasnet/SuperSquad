import React from 'react';
import PropTypes from 'prop-types';
import Container from "../shared/Container";
import Button from "../shared/Button";
import SquadStats from "../SquadStats";
import Hero from "../Hero";
import save from '../../assets/save.svg';
import reset from '../../assets/reset.svg';

const getSquadStats = (squad) => {
  const stats = {
    str: 0,
    int: 0,
    spd: 0
  };
  squad.map(hero => {
    stats.str += hero.strength;
    stats.int += hero.intelligence;
    stats.spd += hero.speed;
    return stats;
    });
  return stats;
};

const SquadEditor = ({heroesInSquad, addSquad, resetSquad, showHeroInfo, removeHeroFromSquad}) => {

  const stats = getSquadStats(heroesInSquad);

  const squad = {
    heroes: [...heroesInSquad],
    stats: {...stats}
  };

  return (<Container title={'Squad Editor'} column shadow>
      <Container>
        <Button text={'Save Squad'} icon={save} onClick={() => addSquad(squad)}/>
        <Button text={'Reset Editor'} icon={reset} onClick={resetSquad}/>
      </Container>
      <SquadStats stats={stats}/>
      {heroesInSquad.map(hero => (
        <Hero key={hero.id} hero={hero}
              removeHeroFromSquad={removeHeroFromSquad}
              showHeroInfo={showHeroInfo}
        />
      ))}
    </Container>
  )
};

SquadEditor.propTypes = {
  heroesInSquad: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      strength: PropTypes.number.isRequired,
      intelligence: PropTypes.number.isRequired,
      speed: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  addSquad: PropTypes.func.isRequired,
  resetSquad: PropTypes.func.isRequired,
  showHeroInfo:PropTypes.func.isRequired,
  removeHeroFromSquad:PropTypes.func.isRequired,
};

export default SquadEditor;
