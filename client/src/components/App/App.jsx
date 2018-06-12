import React, {Component} from 'react';
import Container from '../shared/Container'
import CreateHero from '../CreateHero'
import HeroList from "../HeroList";
import SquadEditor from "../SquadEditor";
import SquadList from "../SquadList";
import * as api from '../../api';

export default class App extends Component {
  state = {
    filter: '',
    heroesList: [],
    heroIdsInSquad: [],
    savedSquads: [],
    isFormVisible: false,
    isLoading: false,
  };

  componentWillMount() {
    this.fetchAllData();
  }

  fetchAllData = () => {
    this.setState({isLoading: true});

    api.fetchSquadsList().then(({data, error}) => {
      if (error) {
        console.log(error);
        this.setState({isLoading: false});
        return;
      }
      this.setState({savedSquads: data});
    });

    api.fetchHeroesList().then(({data, error}) => {
      if (error) {
        console.log(error);
        this.setState({isLoading: false});
        return;
      }
      this.setState({heroesList: data, isLoading: false});
    });
  };

  addHero = hero => {
    this.setState({isLoading: true});

    api.addHero(hero).then(({data, error}) => {
      if (error) {
        console.log(error);
        this.setState({isLoading: false});
        return;
      }
      this.setState(state => ({
        heroesList: [...state.heroesList, data],
        isLoading: false,
      }));
      this.hideForm();
    });
  };

  addSquad = (squad) => {
    this.setState({isLoading: true});

    const {heroes, stats} = squad;

    if(heroes.length === 0 ||
       stats.str + stats.int + stats.spd === 0) return;

    api.addSquad(squad).then(({data, error}) => {
      if (error) {
        console.log(error);
        this.setState({isLoading: false});
        return;
      }
      this.setState(state => ({
        savedSquads: [...state.savedSquads, data],
        isLoading: false,
      }));
      this.resetSquad();
    });
  };

  deleteHero = id => {
    this.setState({isLoading: true});
    api.deleteHero(id).then(({error}) => {
      if (error) {
        console.log(error);
        this.setState({isLoading: false});
        return;
      }
      this.setState(state => ({
        heroesList: state.heroesList.filter(hero => hero.id !== id),
        isLoading: false,
      }));
    });
  };

  deleteSquad = id => {
    this.setState({isLoading: true});
    api.deleteSquad(id).then(({error}) => {
      if (error) {
        console.log(error);
        this.setState({isLoading: false});
        return;
      }
      this.setState(state => ({
        savedSquads: state.savedSquads.filter(squad => squad.id !== id),
        isLoading: false,
      }));
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
    const freeHeroes = heroesList.filter(hero => !heroIdsInSquad.includes(hero.id));
    const visibleHeroes = freeHeroes.filter(hero => hero.name.includes(filter));
    const heroesAddedToSquad = heroesList.filter(hero => heroIdsInSquad.includes(hero.id));

    return (
      <Container app>
        <Container title={'Super Squad'} />
        <Container content>

          <CreateHero
            isFormVisible={isFormVisible}
            onClick={this.showForm}
            onSave={this.addHero}
          />

          <HeroList
            filter={filter}
            handleFilter={this.handleFilter}
            visibleHeroes={visibleHeroes}
            addHeroToSquad={this.addHeroToSquad}
            deleteHero={this.deleteHero}
            showHeroInfo={this.showHeroInfo}
          />

          <SquadEditor
            heroesInSquad={heroesAddedToSquad}
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
