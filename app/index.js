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
            username: '',
            runes: []
        };
    },
    componentWillMount() {

    },
    getSummonerId(username) {
        request
            .get(`/api/${username}`)
            .end((err, res) => {
                let id = Object.keys(res.body);
                this.setState({
                    id: id,
                    runes: res.body[id].pages
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
                        value={this.state.usesrname}
                        onChange={this.handleUsernameChange}
                    />
                    <input type="submit" value="Submit"></input>
                </form>
                <RunePageList runes={this.state.runes}/>
            </div>
        );
    }
});

class RunePageList extends React.Component {
    render() {
        let runes = this.props.runes;

        console.log()

        return (
            <ul>
                {runes.map((el) => {
                    return <li>{el.name}</li>
                })}
            </ul>
        )
    }
}

ReactDOM.render( <App/>, document.getElementById('target'));
