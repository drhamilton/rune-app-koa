import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

class App extends React.Component {
    render() {
        return (
            <div>
                <Container />
            </div>
        );
    }
}

const Container = React.createClass({
    getInitialState() {
        return {
            id: '',
            username: ''
        };
    },
    componentWillMount() {

    },
    getSummonerId(username) {
        request
            .get(`/api/${username}`)
            .end((err, res) => {
                this.setState({
                    id: res.body.id
                });
            })
    },
    handleSubmit(e) {
        e.preventDefault();

        this.getSummonerId(this.state.username);
    },
    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        });
    },
    render() {
        return (
            <div>
                <h1>Your summoner id is: {this.state.id}</h1>
                <form onSubmit={this.handleSubmit}>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.handleUsernameChange}
                    />
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        );
    }
});

ReactDOM.render( <App/>, document.getElementById('target'));
