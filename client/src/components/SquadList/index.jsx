import React from 'react';
import PropTypes from 'prop-types';
import Container from "../shared/Container";
import Button from "../shared/Button";
import SquadStats from "../SquadStats";
import SquadStructure from "../SquadStructure";
import basket from '../../assets/basket.svg';

const SquadList = ({savedSquads, deleteSquad}) => (

  <Container title={'Saved Squads'} column shadow>
    {savedSquads.map(squad => (
      <Container key={squad.id} squad shadow>
        <Container title={'Heroes:'} info>
          <SquadStructure heroes={squad.heroes} />
        </Container>
        <Container title={'Stats:'} info>
          <SquadStats stats={squad.stats} />
        </Container>
        <Button small absolute icon={basket} onClick={() => deleteSquad(squad.id)}/>
      </Container>
    ))}
  </Container>
);

SquadList.propTypes = {
  savedSquads: PropTypes.arrayOf(
    PropTypes.shape({
      heroes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          strength: PropTypes.number.isRequired,
          intelligence: PropTypes.number.isRequired,
          speed: PropTypes.number.isRequired,
        }).isRequired,
      ).isRequired,
    }).isRequired,
    PropTypes.shape({
      stats: PropTypes.shape({
        str: PropTypes.number.isRequired,
        int: PropTypes.number.isRequired,
        spd: PropTypes.number.isRequired,
      }).isRequired,
    }).isRequired,
  ).isRequired,
  deleteSquad: PropTypes.func.isRequired,
};

export default SquadList;
