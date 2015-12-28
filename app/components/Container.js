import React from 'react';
import request from 'superagent';
import RunePageList from './RunePageList.js';

class Container extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      id: '',
      username: '',
      runes: []
    }
    
    this.getSummonerId = this.getSummonerId.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
  }
    componentWillMount() {
    }
    getSummonerId(username) {
        return request
            .get(`/api/${username}`)
            .end((err, res) => {
              if (err) return err;
                let id = Object.keys(res.body);
                this.setState({
                    id: id,
                    runes: res.body[id].pages
                });
            })
    }
    handleSubmit(e) {
        e.preventDefault();

        this.getSummonerId(this.state.username);
    }
    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    }
    render() {
        return (
            <div>
                <h1>Your summoner id is: {this.state.id}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.usesrname}
                        onChange={this.handleUsernameChange}
                    />
                    <input type="submit" value="Submit"></input>
                </form>
                <RunePageList runes={this.state.runes}/>
            </div>
        );
    }
}

export default Container;
