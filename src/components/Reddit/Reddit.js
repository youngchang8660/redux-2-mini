import React, { Component } from 'react';
import Card from './../shared/Card/Card';
import Loading from './../shared/Loading/Loading';
import {requestArticles} from '../../ducks/redditReducer'
import {connect} from 'react-redux'

class Reddit extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    this.props.requestArticles()
  }
  
  render() {
    const articles = this.props.articles.map((article => <Card key={article.id} article={article} />))
    return (
      <div className='news-container'>
        <img src="./redditLogo.png" alt="" style={styles.logo} />
        {this.props.loading ? <Loading /> : <div>{articles}</div>}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return state.reddit
}

export default connect(mapStateToProps, {requestArticles})(Reddit);


const styles = {
  logo: {
    width: '250px',
    margin: '50px 0px'
  }
}