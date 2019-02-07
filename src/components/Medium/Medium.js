import React, { Component } from 'react';
import Card from './../shared/Card/Card';
import Loading from './../shared/Loading/Loading';
import { connect } from 'react-redux';
import { getMediumArticles } from './../../ducks/mediumReducer';

class Medium extends Component {
  componentDidMount() {
    this.props.getMediumArticles();
  }
  render() {
    const articles = this.props.articles.map((article => <Card key={article.id} article={article} />))
    return (
      <div className='news-container'>
        <img src="./mediumLogo.png" style={styles.logo} alt="" />
        {this.props.loading ? <Loading /> : <div>{articles}</div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.mediumReducer.loading,
    articles: state.mediumReducer.articles
  }
}

export default connect(mapStateToProps, { getMediumArticles })(Medium);

const styles = {
  logo: { width: '250px' }
}