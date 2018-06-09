import React from 'react';
import PropTypes from 'prop-types';
import Container from "../shared/Container";

const SquadStats = ({ stats }) => (
    <Container stats content>
    <div>{`Strength: ${stats.str}`}</div>
    <div>{`Intelligence: ${stats.int}`}</div>
    <div>{`Speed: ${stats.spd}`}</div>
  </Container>
  );

SquadStats.propTypes = {
  stats: PropTypes.shape({
    str: PropTypes.number,
    int: PropTypes.number,
    spd: PropTypes.number,
  }),
};

SquadStats.defaultProps = {
  stats: {},
  str: 0,
  int: 0,
  spd: 0,
};

export default SquadStats;
