import React from "react";
import Analog from "./Analog";

class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            timeRaw: "00:00",
            time: "",
            previous: "00:00"
        };
    }

    edit(event) {
        event.preventDefault();
        this.generate(event.target.value);
    }


    generate(time) {


        let tall = ["tolv", "ett", "to", "tre", "fire", "fem", "seks",
            "sju", "åtte", "ni", "ti", "elleve", "tolv", "tretten", "fjorten"];

        let args = time.split(":");
        let timeRaw = time;

        this.setState({ timeRaw: timeRaw });

        let hour = parseInt(args[0]);
        let minutes = parseInt(args[1]);

        let prev = parseInt(this.state.previous.split(":")[1]);

        if (prev === 59 && minutes === 0) {
            hour += 1;
            if (hour == 24) hour = 0;
            let newTime = `${hour.toString().length === 1 ? "0" : ""}${hour}:00`;
            this.setState({ timeRaw: newTime });
        } else if (prev === 0 && minutes === 59) {
            hour -= 1;
            if (hour == -1) hour = 23;
            let newTime = `${hour.toString().length === 1 ? "0" : ""}${hour}:59`;
            this.setState({ timeRaw: newTime });
        }

        hour %= 12;
        minutes %= 60;

        let quadrant = Math.floor(minutes / 15);
        let bool = quadrant % 2;

        let isOver = (bool === 0 || minutes === 15) ? "over" : "på";
        let isQuart = (minutes === 15 || minutes === 45);
        let isHalv = (1 <= quadrant && quadrant <= 2);
        hour = (quadrant > 0 && minutes > 15) ? hour + 1 : hour;

        let outMinutes;

        switch (quadrant) {

            case 1:
                outMinutes = 30 - minutes;
                break;
            case 2:
                outMinutes = minutes - 30;
                break;
            case 3:
                outMinutes = 60 - minutes;
                break;
            default:
                outMinutes = minutes;

        }

        outMinutes = tall[outMinutes];
        let outHours = tall[hour];

        let output;

        if (minutes === 0) { // hel time
            output = `${outHours}`;
        } else if (minutes === 30) { // halv time
            output = `halv ${outHours}`;
        } else if (isQuart) { // xx:15 eller xx:45
            output = `kvart ${isOver} ${outHours}`;
        } else if (isHalv) { //xx:16 - xx:44
            output = `${outMinutes} ${isOver} halv ${outHours}`;
        } else { //xx:01-xx:14 || xx:46-xx:59
            output = `${outMinutes} ${isOver} ${outHours}`;
        }

        this.setState({ time: output });
        this.setState({ previous: timeRaw });

    }

    reset(event) {

        event.preventDefault();
        let now = new Date();
        let hours = now.getHours().toString();
        let minutes = now.getMinutes().toString();

        let nowString = `${hours.length > 1 ? hours : `0${hours}`}:${minutes.length > 1 ? minutes : `0${minutes}`}`;
        this.generate(nowString);
    }

    render() {
        return <div>
            <form>
                <label htmlFor="time">Velg tid: </label>
                <input id="time" type={"time"} value={this.state.timeRaw} onChange={e => this.edit(e)}></input>
                <button onClick={e => this.reset(e)}>Sett til nå</button>
            </form>
            <h1>{this.state.time}</h1>
            <Analog time={this.state.timeRaw}></Analog>
        </div>;
    }
}

export default Clock;