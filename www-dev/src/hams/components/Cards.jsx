import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

export default class Cards extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      persons: []
    };
  }

  componentDidMount() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        console.log(data);
        this.setState({persons: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  }

  render() {
    return (
      <div className="card-deck p-3">
        {this.state.persons.map((row, index) => (
        <div className="card m-2">
            <div className="card-block" key={index}>
              <h4 className="card-title text-center">{index}</h4>
              <p className="card-text text-center">{row.name}</p>
              <p className="text-muted text-center">{row.status}</p>
            </div>
        </div>
        ))}
      </div>
    );
  }
}

const App = () => (
    <Cards url='http://www.mocky.io/v2/58789d370f0000a71f0d49ed' />
);

// Render your table
ReactDOM.render(
  <App />,
  document.getElementById('container')
);