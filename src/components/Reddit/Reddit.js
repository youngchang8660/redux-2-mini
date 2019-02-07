import React, { Component } from 'react';
import Card from './../shared/Card/Card';
import Loading from './../shared/Loading/Loading';

class Reddit extends Component {
  constructor(props) {
    super(props);
    this.state = { articles: [], loading: true }
  }
  render() {
    const articles = this.state.articles.map((article => <Card key={article.id} article={article} />))
    return (
      <div className='news-container'>
        <img src="./redditLogo.png" alt="" style={styles.logo} />
        {this.state.loading ? <Loading /> : <div>{articles}</div>}
      </div>
    )
  }
}

export default Reddit;


const styles = {
  logo: {
    width: '250px',
    margin: '50px 0px'
  }
}