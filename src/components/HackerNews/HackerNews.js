import React, { Component } from 'react';
import Card from './../shared/Card/Card';
import Loading from './../shared/Loading/Loading';
import { connect } from 'react-redux';
import { getHackerArticles } from './../../ducks/hackerNewsReducer';

class HackerNews extends Component {
  componentDidMount() {
    this.props.getHackerArticles();
  }
  render() {
    const articles = this.props.articles.map((article => <Card key={article.id} article={article} />))
    return (
      <div className='news-container'>
        <img style={styles.logo} src="./hackerNews.jpeg" alt="" />
        {this.props.loading ? <Loading /> : <div>{articles}</div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    loading: state.hackerNewsReducer.loading,
    articles: state.hackerNewsReducer.articles
  }
}

export default connect(mapStateToProps, { getHackerArticles })(HackerNews);


const styles = {
  logo: {
    width: '250px',
    margin: '50px 0px'
  }
}