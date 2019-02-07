import React, { Component } from 'react';
import './SideBar.css'

export default class SideBar extends Component {
  render() {
    return (
      <div className='sidebar-container'>
        <img className='sidebar-img' src="./newspaper.png" alt="" />
        <h3>News Today</h3>
        <hr />
        <p><a href='/#/hacker-news'>Hacker News</a></p>
        <p><a href='/#/medium'>Medium</a></p>
        <p><a href='/#/reddit'>Reddit</a></p>
      </div>
    )
  }
}