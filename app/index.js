import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import runeData from '../rune-info';

class App extends React.Component {
    render() {
        console.log(runeData);
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

        return (
            <ul>
                {runes.map((el) => {
                    return <RunePage rune={el} />
                })}
            </ul>
        )
    }
}

class RunePage extends React.Component {
    render() {
        let rune = this.props.rune;
        return (
            <li>
                <div>
                    <h1>{rune.name}</h1>
                    <ul>
                        {rune.slots.map((el) => {
                            return (
                                <li>{runeData[el.runeId].description}</li>
                            )
                        })}
                    </ul>
                </div>
            </li>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('target'));
