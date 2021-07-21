import './App.css';
import './Score.css'
import React from 'react'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            count: 0,
            results: []
        }
        this.winnerLines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        this.disabled = false;
    }

    Reset = () => {
        this.setState({results: []});
        this.setState({squares: Array(9).fill(null)});
        this.setState({count: 0});
        this.setState({winner: ''});
    }
    isWinner = () => {
        let clicled = (this.state.count % 2 === 0) ? 'X' : 'O';
        for (let i = 0; i < this.winnerLines.length; i++) {
            let line = this.winnerLines[i];
            if (this.state.squares[line[0]] === clicled
                && this.state.squares[line[1]] === clicled
                && this.state.squares[line[2]] === clicled) {
                this.disabled = true;
                console.log(this.state.results);
                this.state.results.push(clicled);
                this.setState({
                    winner: "Winner is " + clicled
                });
                setTimeout(() => {
                    if (this.state.results.length === 12) {
                        this.setState(
                            {
                                results: []
                            }
                        );
                    }
                    this.disabled = false;
                    this.setState({squares: Array(9).fill(null)});
                    this.setState({count: 0});
                    this.setState({winner: ''});
                }, 5000)
            } else if ((this.state.squares[line[0]] !== clicled
                || this.state.squares[line[1]] !== clicled
                || this.state.squares[line[2]] !== clicled) && this.state.count === 8) {
                this.disabled = true;
                console.log(this.state.results);
                this.state.results.push('T');
                this.setState({
                    winner: "TIE"
                });
                setTimeout(() => {
                    if (this.state.results.length === 12) {
                        this.setState({
                            results: []
                        });
                    }
                    this.disabled = false;
                    this.setState({squares: Array(9).fill(null)});
                    this.setState({count: 0});
                    this.setState({winner: ''});
                }, 5000)
                break;
            }
        }
    }

    clickHandler = (event) => {
        if (this.disabled === false) {
            let data = event.target.getAttribute('data')
            let currentSquares = this.state.squares;
            if (currentSquares[data] === null) {
                currentSquares[data] = (this.state.count % 2 === 0) ? 'X' : 'O';
                this.setState(
                    {count: this.state.count + 1});
                this.setState(
                    {squares: currentSquares});
            }
            this.isWinner();
        }
    }

    render() {
        return (
            <div className='game'>
                <h2 className="winner"> {this.state.winner}</h2>
                <div className="game-and-score">
                    <div className="tic-tac-toe">
                        <div className="grid" onClick={this.clickHandler} data='0'>{this.state.squares[0]}</div>
                        <div className="grid" onClick={this.clickHandler} data='1'>{this.state.squares[1]}</div>
                        <div className="grid" onClick={this.clickHandler} data='2'>{this.state.squares[2]}</div>
                        <div className="grid" onClick={this.clickHandler} data='3'>{this.state.squares[3]}</div>
                        <div className="grid" onClick={this.clickHandler} data='4'>{this.state.squares[4]}</div>
                        <div className="grid" onClick={this.clickHandler} data='5'>{this.state.squares[5]}</div>
                        <div className="grid" onClick={this.clickHandler} data='6'>{this.state.squares[6]}</div>
                        <div className="grid" onClick={this.clickHandler} data='7'>{this.state.squares[7]}</div>
                        <div className="grid" onClick={this.clickHandler} data='8'>{this.state.squares[8]}</div>
                    </div>
                    <div className='Score'>
                        <div className='results'>
                            {this.state.results.map(item => {
                                    return <div className='result'>{item}</div>
                                }
                            )}
                        </div>

                        <div className='btn-reset' onClick={this.Reset}>Reset</div>
                    </div>

                </div>
            </div>
        );
    }
}

export default App;
