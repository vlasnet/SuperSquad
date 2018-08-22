import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Container from '../shared/Container';
import Button from '../shared/Button'
import Icon from '../shared/Icon';
import { ICONS } from '../shared/Icon/icons';
import styles from './styles.css';

const INITIAL_STATE = {
  name: '',
  strength: 'Strength',
  intelligence: 'Intelligence',
  speed: 'Speed',
};

const makeOptions = (num, name) => {
  const elements = [
    <option
      key={name}
      value={name}
      disabled
    >
      {name}
    </option>];

  for (let i = 1; i <= num; i += 1) {
    elements.push(
      <option key={name+i} value={i}>
        {i}
      </option>
    );
  }
  return elements;
};

class CreateHeroForm extends Component {
  state = {...INITIAL_STATE};

  onInputChange = ({ target }) => {
    const { name, value } = target;

    this.setState({ [name]: value });
  };

  onSubmit = event => {
    event.preventDefault();
    const {name, strength, intelligence, speed} = this.state;
    if (
      name === '' ||
      strength === 'Strength' ||
      intelligence === 'Intelligence' ||
      speed === 'Speed'
    ) {
      return;
    }
    const hero = {
      name,
      strength: Number(strength),
      intelligence: Number(intelligence),
      speed: Number(speed),
    };

    this.props.onSave(hero);
    this.setState({...INITIAL_STATE});
  };

  render() {
    const {name, strength, intelligence, speed} = this.state;

    return (
      <Container form shadow>
        <input
          className={styles.select}
          type="text"
          name="name"
          value={name}
          placeholder="Hero name"
          onChange={this.onInputChange}
        />
        <select
          className={styles.select}
          name="strength"
          value={strength}
          onChange={this.onInputChange}
        >
          {makeOptions(10, `${strength}`)}
        </select>
        <select
          className={styles.select}
          name="intelligence"
          value={intelligence}
          onChange={this.onInputChange}
        >
          {makeOptions(10, `${intelligence}`)}
        </select>
        <select
          className={styles.select}
          name="speed"
          value={speed}
          onChange={this.onInputChange}
        >
          {makeOptions(10, `${speed}`)}
        </select>

        <Button
          text='Create Hero'
          onClick={this.onSubmit}
        >
          <Icon icon={ICONS.EDIT} size={20} color="#fff"/>
        </Button>

      </Container>
    );
  }
}

CreateHeroForm.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default CreateHeroForm;
