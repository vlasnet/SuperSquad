import React from 'react';
import PropTypes from 'prop-types';
import Container from '../shared/Container';
import Button from '../shared/Button';
import Icon from '../shared/Icon';
import {ICONS} from '../shared/Icon/icons';
import styles from './styles.css'

const Hero = ({hero, addHeroToSquad, deleteHero, showHeroInfo, removeHeroFromSquad}) => (
  <Container hero shadow>
    <p className={styles.name}>{hero.name}</p>
    <span className={styles.buttons_container}>
        {addHeroToSquad && <Button small onClick={addHeroToSquad}>
          <Icon icon={ICONS.ADD_USER} color="#555"/>
        </Button>}
      {deleteHero && <Button small onClick={() => deleteHero(hero.id)}>
        <Icon icon={ICONS.BASKET} view={297} color="#555"/>
      </Button>}
      {removeHeroFromSquad && <Button small onClick={() => removeHeroFromSquad(hero.id)}>
        <Icon icon={ICONS.BASKET_FULL} view={297} color="#555"/>
      </Button>}
      {showHeroInfo && <Button small onClick={() => showHeroInfo(hero)}>
        <Icon icon={ICONS.INFO} color="#555"/>
      </Button>}
      </span>
  </Container>
);

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
