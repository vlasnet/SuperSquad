import React from 'react';
import PropTypes from 'prop-types';
import Container from "../shared/Container";
import SearchField from "../shared/SearchField";
import Hero from "../Hero";

const HeroList = ({filter, handleFilter, visibleHeroes, addHeroToSquad, deleteHero, showHeroInfo}) => (

  <Container title={'Heroes'} column shadow>
    <SearchField filter={filter} handleFilter={handleFilter}/>
    {visibleHeroes.map(hero => (
      <Hero key={hero.id} hero={hero} addHeroToSquad={()=>addHeroToSquad(hero.id)} deleteHero={deleteHero}
            showHeroInfo={showHeroInfo}/>
    ))}
  </Container>
);

HeroList.propTypes = {
  filter: PropTypes.string.isRequired,
  handleFilter: PropTypes.func.isRequired,
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
