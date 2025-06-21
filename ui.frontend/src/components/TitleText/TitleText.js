import { MapTo } from '@adobe/aem-react-editable-components';
import React, { Component } from 'react';
import "./TitleText.css";


const TitleTextEditConfig = {
          emptyLabel: 'Title Text',
          isEmpty: function (props) {
                    return !props || !props.title || props.title.trim().length < 1;
          }
};

class TitleText extends Component {
          get textContent() {
                    return (
                              <div className='title-text'>
                                        <h1>{this.props.title}</h1>
                                        <p>{this.props.description}</p>
                              </div>
                    );
          }

          render() {
                    return this.props.title ? this.textContent : "test";
          }
}

export default MapTo('netflixgpt/components/title-text')(
          TitleText,
          TitleTextEditConfig
);
