import React from 'react';
import * as Vibrant from 'node-vibrant/dist/vibrant';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "https://images.unsplash.com/photo-1526567974892-5951f5fee22b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=812&q=80",
      swatches: {}
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.updateSwatch(this.state.imageUrl);
  }

  handleChange(event) {
    var imageUrl = event.target.value;

    this.updateSwatch(imageUrl);
  }

  updateSwatch(imageUrl) {
    Vibrant
      .from(imageUrl)
      .maxColorCount(10)
      .getPalette()
      .then(swatches => this.setState({swatches: swatches, imageUrl: imageUrl}));
  }

  render() {
    var result;
    if (this.state.swatches) {
      result = Object.entries(this.state.swatches)
        .filter(([colorType, swatch]) => swatch.getPopulation() > 0)
        .map(([colorType, swatch]) => {
          return <div style={{ background: swatch.getHex(), color: this.contrastColor(swatch.getRgb()) }} key={ colorType }>
            { colorType }:
            { swatch.getHex() } |
            { swatch.getPopulation() }
          </div>
        });
    } else {
      result = <div> no swatches </div>
    }

    return (
      <>
        <input type="text" value={this.state.imageUrl} onChange={this.handleChange} />
        <br/>

        <img src={ this.state.imageUrl } alt="demoImage" height="500"/>
        <div>{result}</div>
      </>
    );
  }

  contrastColor(rgb) {
    var sum = Math.round(((parseInt(rgb[0]) * 299) + (parseInt(rgb[1]) * 587) + (parseInt(rgb[2]) * 114)) / 1000);
    return sum > 128 ? "#3d3d3d" : "#ffffff";
  }
}

export default App;
