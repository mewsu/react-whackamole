import React from "react";
import ReactDOM from "react-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.moles = [
      "mole1",
      "mole2",
      "mole3",
      "mole4",
      "mole5",
      "mole6",
      "mole7",
      "mole8",
      "mole9"
    ];
    this.loop = 10;
    this.state = {
      cells: Array(9)
        .fill()
        .map((e, i) => ({ i })),
      lit: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      bingo: [],
      score: 0,
      started: false,
      ended: false
    };
  }

  componentDidMount() {}

  start() {
    // console.log("i start");
    this.setState({ lit: [], started: true, ended: false });
    for (let j = 1; j < this.loop; j++) {
      setTimeout(() => {
        let idx = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        const newLits = [];
        while (newLits.length < 3) {
          const i = Math.floor(Math.random() * idx.length);
          newLits.push(idx[i]);
          idx.splice(i, 1);
        }

        this.setState({ lit: newLits });

        setTimeout(() => {
          this.setState({ lit: [], bingo: [] });
        }, 1000);
        if (j == this.loop - 1) this.setState({ started: false, ended: true });
      }, 2000 * j);
    }
  }

  onClickCell(cellIdx) {
    // this.setState({bingo: [...this.state.bingo, cellIdx]})
    if (this.state.started && this.state.lit.includes(cellIdx)) {
      // console.log("bingo");
      this.setState({
        bingo: [...this.state.bingo, cellIdx],
        score: this.state.score + 1
      });
    }
  }

  getRandomMole() {
    return this.moles[Math.floor(Math.random() * this.moles.length)];
  }

  render() {
    // console.log(this.state.cells);
    return (
      <div id="main">
        <div id="title">WHACK THE MOLES</div>
        <div id="score">{this.state.score}</div>
        {this.state.ended ? (
          <div id="end">
            <div id="shadowBox">
              <h3 className="rainbow rainbow_text_animated">
                YOU ARE THE WHACK MASTER
              </h3>
            </div>
          </div>
        ) : (
          <div id="grid">
            {this.state.cells.map((e, i) => (
              <button
                className={`grid-cell mole${i + 1} ${
                  this.state.bingo.includes(e.i) ? "dizzy" : ""
                } ${this.state.lit.includes(e.i) ? `` : "hide-background"}`}
                key={i}
                onClick={() => this.onClickCell(i)}
              ></button>
            ))}
          </div>
        )}

        <button id="start" onClick={this.start.bind(this)}>
          START
        </button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
