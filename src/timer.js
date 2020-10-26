import React from "react";
import startImage from "./img/play.png";
import pauseImage from "./img/pause.png";
import stopImage from "./img/stop.png";
import ding from "./img/ding.mp3";



class Timer extends React.Component {

    constructor() {
        super();
        this.state = {
            timer: "",
            hour: "00",
            minute: "00",
            second: "00",
            milis: "00",
            timerMs: 0,
            timerRunning: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.pauseTimer = this.pauseTimer.bind(this);

    }
    setTimerDisplay(value) {
        let mili = value * 1000;
        let seconds = mili / 1000;
        let remainingMili = Math.floor(mili % 1000);
        let minutes = seconds / 60;
        let remainingSec = Math.floor(seconds % 60);
        let hours = minutes / 60;
        let remainingMin = Math.floor(minutes % 60);
        let remainingHours = Math.floor(hours % 24)

        if (remainingMili < 10) {
            remainingMili = "0" + remainingMili;
        }
        if (remainingSec < 10) {
            remainingSec = "0" + remainingSec;
        }
        if (remainingMin < 10) {
            remainingMin = "0" + remainingMin;
        }
        if (remainingHours < 10) {
            remainingHours = "0" + remainingHours;
        }
        return {
            h: remainingHours,
            m: remainingMin,
            s: remainingSec,
            ms: remainingMili

        }
    }
    handleChange(event) {
        const { value } = event.target;
        this.setState(() => {

            let formTime = this.setTimerDisplay(value);


            return {
                hour: formTime.h,
                minute: formTime.m,
                second: formTime.s,
                milis: formTime.ms,
                timer: value
            }


        });
    }
    startTimer() {

        this.setState({ timerRunning: true });

        const timerInt = setInterval(() => {
            if (this.state.timer === 0 || this.state.timerRunning === false) {
                clearInterval(timerInt);
                this.setState({ timerRunning: false })
                this.playDing();
            } else {
                this.setState(() => {

                    const descTimer = this.state.timer - 1;
                    const formTime = this.setTimerDisplay(descTimer);

                    return ({
                        timer: descTimer,
                        hour: formTime.h,
                        minute: formTime.m,
                        second: formTime.s,
                        milis: formTime.ms
                    })
                })
            }
        }, 1000);

    }
    stopTimer() {
        this.setState({
            timerRunning: false,
            timer: "",
            hour: "00",
            minute: "00",
            second: "00",
            milis: "00"
        })
    }
    pauseTimer() {
        this.setState({ timerRunning: false });
    }
    playDing() {
        var audio = new Audio(ding);
        audio.play();
    }
    render() {

        let timerDisplay = (
            <div>
                <p className="timerDisplay">
                    {this.state.hour}:{this.state.minute}:{this.state.second}:{this.state.milis}
                </p>
                <input
                    name="timer"
                    className="timerSet"
                    type="number"
                    value={this.state.timer}
                    placeholder="0"
                    onChange={this.handleChange}
                    max="86399"
                />
            </div>
        );

        if (this.state.timerRunning) {
            timerDisplay = (
                <p className="timerDisplayRunning">
                    {this.state.hour}:{this.state.minute}:{this.state.second}:{this.state.milis}
                </p>
            )
        }
        let start = (
            <img onClick={this.startTimer} src={startImage} alt="start" />
        )
        if (this.state.timerRunning) {
            start = (
                <img onClick={this.pauseTimer} src={pauseImage} alt="start" />
            )
        }

        return (
            <div>
                <div className="timerContainer">
                    {timerDisplay}
                    <div className="startDiv">
                        {start}
                    </div>
                    <div className="stopDiv">
                        <img onClick={this.stopTimer} src={stopImage} alt="stop" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Timer;