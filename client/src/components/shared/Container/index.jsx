import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.css';

const Container = ({title, children, app, content, column, form, search, hero, stats, squad, info, shadow}) => {
  const cls = [
    styles.container,
    app ? styles.app : '',
    content ? styles.content : '',
    column ? styles.column : '',
    form ? styles.form : '',
    search ? styles.search : '',
    hero ? styles.hero : '',
    stats ? styles.stats : '',
    squad ? styles.squad : '',
    info ? styles.info : '',
    shadow ? styles.shadow : ''
  ].join(' ');

  return (
    <div className={cls}>
      {title && <h3 className={styles.header}>{title}</h3>}
      {children}
    </div>
  )
};

Container.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
  app: PropTypes.bool,
  content: PropTypes.bool,
  column: PropTypes.bool,
  form: PropTypes.bool,
  search: PropTypes.bool,
  hero: PropTypes.bool,
  stats: PropTypes.bool,
  squad: PropTypes.bool,
  info: PropTypes.bool,
  shadow: PropTypes.bool,
};

Container.defaultProps = {
  title: '',
  children: null,
  app: false,
  content: false,
  column: false,
  form: false,
  search: false,
  hero: false,
  stats: false,
  squad: false,
  info: false,
  shadow: false,
};

export default Container;
