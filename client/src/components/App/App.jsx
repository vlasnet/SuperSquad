/* eslint-disable no-param-reassign */
import React, {Component} from 'react';
import Container from '../shared/Container'
import HeroForm from '../HeroForm'
import HeroList from "../HeroList";
import SquadEditor from "../SquadEditor";
import SquadList from "../SquadList";
import SearchField from "../shared/SearchField";
import * as api from '../../api';
import Button from '../shared/Button'
import Icon from '../shared/Icon';
import {ICONS} from '../shared/Icon/icons';

export default class App extends Component {
  state = {
    filter: '',
    heroesList: [],
    heroIdsInSquad: [],
    savedSquads: [],
    isFormVisible: false,
    isLoading: false,
    error: null,
  };

  componentDidMount() {
    this.fetchAllData();
  }

  getSquad = () =>
    this.state.heroesList.filter(hero => this.state.heroIdsInSquad.includes(hero.id));

  getSquadStats = (squad) =>
    squad.reduce(
      (total, hero) => {
        total.str += hero.strength;
        total.int += hero.intelligence;
        total.spd += hero.speed;
        return total;
      },
      {str: 0, int: 0, spd: 0},
    );

  fetchAllData = () => {
    this.setState({isLoading: true});

    api.fetchSquadsList().then(({data}) => {
      this.setState(() => ({
        savedSquads: data,
        isLoading: false,
      }));
    }).catch(({error}) => {
      console.log('Error on fetchSquadsList! Error reason: ', error);
      this.setState({
        isLoading: false,
        error
      });
    });

    api.fetchHeroesList().then(({data}) => {
      this.setState(() => ({
        heroesList: data,
        isLoading: false,
      }));
    }).catch(({error}) => {
      console.log('Error on fetchHeroesList! Error reason: ', error);
      this.setState({
        isLoading: false,
        error
      });
    });
  };

  addHero = hero => {
    this.setState({isLoading: true});

    api.addHero(hero).then(({data}) => {
      this.setState(state => ({
        heroesList: [...state.heroesList, data],
        isLoading: false,
      }));
      this.hideForm();
    }).catch(({error}) => {
      console.log('Error on addHero! Error reason: ', error);
      this.setState({
        isLoading: false,
        error
      });
      this.hideForm();
    });
  };

  addSquad = () => {
    this.setState({isLoading: true});

    const heroesInSquad = this.getSquad();
    const stats = this.getSquadStats(heroesInSquad);

    const squad = {
      heroes: [...heroesInSquad],
      stats: {...stats}
    };

    if (squad.heroes.length === 0 ||
      stats.str + stats.int + stats.spd === 0) return;

    api.addSquad(squad).then(({data}) => {
      this.setState(state => ({
        savedSquads: [...state.savedSquads, data],
        isLoading: false,
      }));
      this.resetSquad();
    }).catch(({error}) => {
      console.log('Error on addSquad! Error reason: ', error);
      this.setState({
        isLoading: false,
        error
      });
      this.resetSquad();
    });
  };

  deleteHero = id => {
    this.setState({isLoading: true});
    api.deleteHero(id).then(() => {
      this.setState(state => ({
        heroesList: state.heroesList.filter(hero => hero.id !== id),
        isLoading: false,
      }));
    }).catch(({error}) => {
      console.log('Error on deleteHero! Error reason: ', error);
      this.setState({
        isLoading: false,
        error
      });
    });
  };

  deleteSquad = id => {
    this.setState({isLoading: true});
    api.deleteSquad(id).then(() => {
      this.setState(state => ({
        savedSquads: state.savedSquads.filter(squad => squad.id !== id),
        isLoading: false,
      }));
    }).catch(({error}) => {
      console.log('Error on deleteSquad! Error reason: ', error);
      this.setState({
        isLoading: false,
        error
      });
    });
  };

  handleFilter = (value) => {
    this.setState({
      filter: value,
    })
  };

  addHeroToSquad = id => {
    this.setState({
      heroIdsInSquad: [...this.state.heroIdsInSquad, id]
    });
  };

  showHeroInfo = hero => {
    const {name, strength, intelligence, speed} = hero;
    console.log(`
    [Hero Info]
    name: ${name},
    str: ${strength},
    int: ${intelligence},
    spd: ${speed}
    `)
  };

  removeHeroFromSquad = id => {
    this.setState({
      heroIdsInSquad: this.state.heroIdsInSquad.filter(item => item !== id)
    });
  };

  resetSquad = () => {
    this.setState({
      heroIdsInSquad: []
    })
  };

  showForm = () => {
    this.setState({isFormVisible: true});
  };

  hideForm = () => {
    this.setState({isFormVisible: false});
  };

  render() {
    const {isFormVisible, filter, heroesList, heroIdsInSquad} = this.state;
    const visibleHeroes = heroesList.filter(hero => !heroIdsInSquad.includes(hero.id) && hero.name.includes(filter));
    const heroesAddedToSquad = this.getSquad();

    return (
      <Container app>
        <Container title='Super Squad'/>
        <Container content>
          <Container title='Create Hero' column shadow>
            {!isFormVisible && <Button text='Add Hero' onClick={this.showForm}>
              <Icon icon={ICONS.EDIT} color="#fff"/>
            </Button>}
            {isFormVisible && <HeroForm onSave={this.addHero}/>}
          </Container>

          <Container title='Heroes' column shadow>
            <SearchField filter={filter} handleFilter={this.handleFilter}/>
            <HeroList
              visibleHeroes={visibleHeroes}
              addHeroToSquad={this.addHeroToSquad}
              deleteHero={this.deleteHero}
              showHeroInfo={this.showHeroInfo}
            />
          </Container>

          <SquadEditor
            heroesInSquad={heroesAddedToSquad}
            stats={this.getSquadStats(heroesAddedToSquad)}
            addSquad={this.addSquad}
            resetSquad={this.resetSquad}
            removeHeroFromSquad={this.removeHeroFromSquad}
            showHeroInfo={this.showHeroInfo}
          />

          <SquadList
            savedSquads={this.state.savedSquads}
            deleteSquad={this.deleteSquad}
          />
        </Container>
      </Container>
    );
  }
}
