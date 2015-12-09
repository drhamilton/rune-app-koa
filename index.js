import React from 'react';
import ReactDOM from 'react-dom';
const _ = require('lodash');
const $ref = falcor.Model.ref;

const model = new falcor.Model({
    cache: {
        ingredientsById: {
            1: {
                name: 'flour',
                description: 'white'
            },
            2: {
                name: 'chocolate',
                description: 'good'
            }
        },
        recipies: [
            {
                name: "cookies",
                instructions: "bakem",
                ingredients: [
                    $ref("ingredientsById[1]"),
                    $ref("ingredientsById[2]")
                ]
            },
            {
                name: "brownies",
                instructions: "dsfdsfa",
                ingredients: [
                    $ref("ingredientsById[1]")
                ]
            }
        ]
    }
});

// model.get('recipes[0..1].ingredients[0..9]["name", "description"]')
//     .then(data => {
//         console.log(data);
//     });

class App extends React.Component {
    render() {
        return (
            <div>
                <RecipeList />
            </div>
        );
    }
}

const RecipeList = React.createClass({
    getInitialState() {
        return {
            recipies: []
        };
    },
    componentWillMount() {
        model.get(
            [
                "recipies",
                { from: 0, to: 9 },
                Recipe.queries.recipe()
            ],
            [
                "recipies",
                { from: 0, to: 9 },
                "ingredients",
                { from: 0, to: 9 },
                Ingredients.queries.ingredients()
            ]
        ).then(data => {
            this.setState({
                recipies: _.values(data.json.recipies)
            });
            console.log(this.state.recipies);
        });
    },
    render() {
        return (
            <div>
                {this.state.recipies.map( recipe => {
                    return (
                        <Recipe {...recipe} />
                    )
                })}
            </div>
        );
    }
});

const Recipe = React.createClass ({
    statics: {
        queries: {
            recipe() {
                return _.union(
                    Name.queries.recipe(),
                    Instructions.queries.recipe()
                );
            },
            ingredients() {
                return Ingredients.queries.recipe();
            }
        }
    },
    render() {
        return (
            <div>
                <Name name={this.props.name} />
                <Instructions instructions={this.props.instructions} />
                <Ingredients ingredients={this.props.ingredients} />
            </div>
        );
    }
});

const Name = React.createClass({
    statics: {
        queries: {
            recipe() {
                return ['name']
            }
        }
    },
    render() {
        return (
            <h1>{this.props.name}</h1>
        )
    }
});

const Instructions = React.createClass({
    statics: {
        queries: {
            recipe() {
                return ['instructions']
            }
        }
    },
    render() {
        return (
            <h1>{this.props.instructions}</h1>
        )
    }
});

const Ingredients = React.createClass({
    statics: {
        queries: {
            ingredients() {
                return ['name', 'description'];
            }
        }
    },
    render() {
        return (
            <h1>{JSON.stringify(this.props.ingredients)}</h1>
        )
    }
});

ReactDOM.render( <App/>, document.getElementById('target'));
