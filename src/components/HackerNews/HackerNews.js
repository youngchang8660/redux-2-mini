import React, { Component } from 'react';
import Card from './../shared/Card/Card';
import Loading from './../shared/Loading/Loading';

class HackerNews extends Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], loading: true }
  }

  render() {
    const articles = this.state.articles.map((article => <Card key={article.id} article={article} />))
    return (
      <div className='news-container'>
        <img style={styles.logo} src="./hackerNews.jpeg" alt="" />
        {this.state.loading ? <Loading /> : <div>{articles}</div>}
      </div>
    )
  }
}

export default HackerNews;


const styles = {
  logo: {
    width: '250px',
    margin: '50px 0px'
  }
}