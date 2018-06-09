import React from 'react';
import PropTypes from 'prop-types';
import Container from '../shared/Container';
import Button from '../shared/Button';
import add from '../../assets/add_gray.png';
import basket from '../../assets/basket.svg';
import info from '../../assets/info.svg';
import remove from '../../assets/basket_full.svg';
import styles from './styles.css'

const Hero = (props) => {
  const {hero, addHeroToSquad, deleteHero, showHeroInfo, removeHeroFromSquad} = props;
  return (
    <Container hero shadow>
      <p className={styles.name}>{hero.name}</p>
      <span className={styles.buttons_container}>
        {addHeroToSquad && <Button small icon={add} onClick={addHeroToSquad} />}
        {deleteHero && <Button small icon={basket} onClick={() => deleteHero(hero.id)} />}
        {removeHeroFromSquad && <Button small icon={remove} onClick={() => removeHeroFromSquad(hero.id)} />}
        {showHeroInfo && <Button small icon={info} onClick={() => showHeroInfo(hero)} />}
      </span>
    </Container>
  );
};

Hero.propTypes = {
  hero: PropTypes.shape({
    name: PropTypes.string.isRequired,
    strength: PropTypes.number.isRequired,
    intelligence: PropTypes.number.isRequired,
    speed: PropTypes.number.isRequired,
  }).isRequired,
  addHeroToSquad: PropTypes.func,
  deleteHero: PropTypes.func,
  showHeroInfo: PropTypes.func,
  removeHeroFromSquad: PropTypes.func,
};

Hero.defaultProps = {
  addHeroToSquad: null,
  deleteHero: null,
  showHeroInfo: null,
  removeHeroFromSquad: null,
};

export default Hero;
