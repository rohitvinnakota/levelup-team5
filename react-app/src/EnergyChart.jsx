import React, { Component, PropTypes } from 'react'
import { Line } from 'react-chartjs-2';
import './EnergyChart.css'


class EnergyChart extends Component {
    constructor() {
        super();
        this.state = {
            songs: ["Prologue", "Harry's Wondrous World", "The Arrival of Baby Harry", "Visit to the Zoo and Letters from Hogwarts", "Diagon Alley and The Gringotts Vault", "Platform Nine-and-Three-Quarters and The Journey to Hogwarts", "Entry into the Great Hall and The Banquet", "Mr. Longbottom Flies", "Hogwarts Forever! and The Moving Stairs", "The Norwegian Ridgeback and A Change of Season", "The Quidditch Match", "Christmas at Hogwarts", "The Invisibility Cloak and The Library Scene", "Fluffy's Harp", "In the Devil's Snare and The Flying Keys", "The Chess Game", "The Face of Voldemort", "Leaving Hogwarts", "Hedwig's Theme"],
            energy: [0.0188, 0.264, 0.042, 0.0332, 0.0442, 0.0492, 0.0469, 0.0972, 0.00905, 0.0162, 0.299, 0.0512, 0.0256, 0.00382, 0.133, 0.187, 0.084, 0.0473, 0.162], "danceability": [0.177, 0.227, 0.0761, 0.16, 0.285, 0.257, 0.173, 0.159, 0.153, 0.306, 0.269, 0.18, 0.18, 0.303, 0.0843, 0.356, 0.0942, 0.183, 0.156],
            danceability: [0.177, 0.227, 0.0761, 0.16, 0.285, 0.257, 0.173, 0.159, 0.153, 0.306, 0.269, 0.18, 0.18, 0.303, 0.0843, 0.356, 0.0942, 0.183, 0.156],
            query: ''
        }
    }


    handleGoClick = () => {
        fetch("http://127.0.0.1:8000/api/movies?movie="+ this.search.value)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    songs: result.songs,
                    energy: result.energy,
                    danceability: result.danceability
                });
            } 
        )
    }

    handleInputChange = () => {
        this.setState({
            query: this.search.value
        }
        )
    }


    generateEnergyData() {
        const data = {
            labels: this.state.songs,
            datasets: [
                {
                    label: 'Energy of songs',
                    backgroundColor: '#8SE582',
                    borderColor: ' #223237',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132red0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    pointHitRadius: 10,
                    data: this.state.energy
                }
            ]
        };
        return data
    }

    generateDanceData() {
        const data = {
            labels: this.state.songs,
            datasets: [
                {
                    label: 'Danceability of songs',
                    backgroundColor: '#FF3B3F',
                    borderColor: ' #223237',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132red0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    pointHitRadius: 10,
                    data: this.state.danceability
                }
            ]
        };
        return data
    }

    render() {
        return (
            <div>
                <div>
                        <input
                            placeholder="Search for a soundtrack"
                            ref={input => this.search = input}
                            onChange={this.handleInputChange}
                        />
                        <button onClick={this.handleGoClick}>
                        Search
                        </button>

                </div>

                <div className="charts">
                    <Line
                        data={this.generateEnergyData()}
                        options={{
                            layout: {
                                padding: {
                                    left: 100,
                                    right: 100,
                                    top: 15,
                                    bottom: 0
                                }
                            },
                            scales: {
                                xAxes: [{
                                    display: false,
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }]
                            }
                        }
                        }
                    />

                    <Line
                        data={this.generateDanceData()}
                        options={{
                            layout: {
                                padding: {
                                    left: 100,
                                    right: 100,
                                    top: 15,
                                    bottom: 0
                                }
                            },
                            scales: {
                                xAxes: [{
                                    display: false,
                                    gridLines: {
                                        display: false
                                    }
                                }],
                                yAxes: [{
                                    gridLines: {
                                        display: false
                                    }
                                }]
                            }
                        }
                        }
                    />

                </div>
            </div>
        )
    }
}

export default EnergyChart

