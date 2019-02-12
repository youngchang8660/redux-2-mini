import React from 'react';
import './Loading.css';

export default function Loading() {
  let colorScheme;
  switch (window.location.hash) {
    case '#/hacker-news':
      colorScheme = {
        one: { boxShadow: '2px 2px 5px #F36522' },
        two: { boxShadow: '2px 2px 5px #d16432' },
        three: { boxShadow: '2px 2px 5px #F36522' }
      };
      break;
    case '#/medium':
      colorScheme = {
        one: { boxShadow: '2px 2px 5px #00AB6C' },
        two: { boxShadow: '2px 2px 5px #15C767' },
        three: { boxShadow: '2px 2px 5px #38FF90' }
      };
      break;
    case '#/reddit':
      colorScheme = {
        one: { boxShadow: '2px 2px 5px #FE4500' },
        two: { boxShadow: '2px 2px 5px #f99570' },
        three: { boxShadow: '2px 2px 5px #FE4500' }
      };
      break;
    default:
      colorScheme = { one: {}, two: {}, three: {} }
      break;
  }
  const { one, two, three } = colorScheme
  return (
    <div className="container">
      <div className="it item1" style={one}></div>
      <div className="it item2" style={two}></div>
      <div className="it item3" style={three}></div>
    </div>
  )
}