import * as React from "react";

export default class Analog extends React.Component {
    clockInterval;
    constructor(props) {
        super(props);
        this.handleDate = this.handleDate.bind(this);
        this.state = {
            hours: 0,
            minutes: 0,
        };
    }

    componentDidMount() {
        this.clockInterval = setInterval(this.handleDate, 50);
    }

    componentWillUnmount() {
        clearInterval(this.clockInterval);
    }




    render() {
        const { hours, minutes } = this.state;

        const minutesStyle = {
            transform: `rotate(${minutes * 6}deg)`
        };
        const hoursStyle = {
            transform: `rotate(${hours * 30 + minutes * 0.5}deg)`
        };

        let ticks = [];
        for (let index = 0; index < 60; index++) {

            let tickStyle = {
                "position": "absolute",
                "top": "50%",
                "left": "50%",
                "transform": `translateX(-50%) translateY(-50%) rotate(${index * 6}deg) translateY(-430%) rotate(${-index * 6}deg)`,
            };

            let rotate = {
                "transform": `rotate(${index * 6}deg) translateY(-730%)`
            };

            ticks.push(<div className="tick" style={tickStyle}>{
                index === 0 ? 12 : index % 5 === 0 ? index / 5 : <div className="small" style={rotate}>|</div>
            }</div>);
        }

        return (
            <div className={"clock"}>
                <div className={"analog-clock"}>
                    <div className="ticks">{ticks}</div>
                    <div className={"dial hours"} style={hoursStyle} />
                    <div className={"dial minutes"} style={minutesStyle} />
                </div>
            </div>
        );
    }

    handleDate() {
        const { time } = this.props;
        const args = time.split(":");

        let hours = args[0];
        let minutes = args[1];
        this.setState({ hours, minutes });
    }


}