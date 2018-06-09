import React from 'react';
import PropTypes from 'prop-types';
import Container from "../shared/Container";
import Button from '../shared/Button'
import HeroForm from '../HeroForm'
import edit from '../../assets/edit.svg';

const CreateHero = ({isFormVisible, onClick, onSave}) => (
  <Container title={'Create Hero'} column shadow>
    {!isFormVisible && <Button text={'Add Hero'} icon={edit} onClick={onClick}/>}
    {isFormVisible && <HeroForm onSave={onSave}/>}
  </Container>
);

CreateHero.propTypes = {
  isFormVisible: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

export default CreateHero;
