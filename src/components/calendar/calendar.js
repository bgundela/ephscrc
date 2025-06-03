import React, { Component, useLocation } from 'react';
import CalendarDays from './calendar-days';

export default class Calendar extends Component {
    constructor(props) {
        super(props);

        this.weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        this.months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
            'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

        this.state = {
            currentDay: new Date(),
            inputValue: ''
        }
    }

    changeCurrentDay = (day) => {
        this.setState({ currentDay: new Date(day.year, day.month, day.number), inputValue: new Date(day.year, day.month, day.number) });
        this.props.onDataChange(new Date(day.year, day.month, day.number));
    }

    nextDay = () => {
        this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() + 1)) });
    }

    previousDay = () => {
        this.setState({ currentDay: new Date(this.state.currentDay.setDate(this.state.currentDay.getDate() - 1)) });
    }

    render() {
        return (
            <div className="calendar">
                <div className="calendar-header">
                    <div className="title">
                        <h2>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
                    </div>
                    {/* <div className="tools">
                        <button onClick={this.previousDay}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" className='arrow red'>
                                <path fill-rule="evenodd" d="M18 10a.75.75 0 0 1-.75.75H4.66l2.1 1.95a.75.75 0 1 1-1.02 1.1l-3.5-3.25a.75.75 0 0 1 0-1.1l3.5-3.25a.75.75 0 1 1 1.02 1.1l-2.1 1.95h12.59A.75.75 0 0 1 18 10Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                        <p>{this.months[this.state.currentDay.getMonth()].substring(0, 3)} {this.state.currentDay.getDate()}</p>
                        <button onClick={this.nextDay}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5" className='arrow red'>
                                <path fill-rule="evenodd" d="M2 10a.75.75 0 0 1 .75-.75h12.59l-2.1-1.95a.75.75 0 1 1 1.02-1.1l3.5 3.25a.75.75 0 0 1 0 1.1l-3.5 3.25a.75.75 0 1 1-1.02-1.1l2.1-1.95H2.75A.75.75 0 0 1 2 10Z" clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div> */}
                </div>
                <div className="calendar-body">
                    <div className="table-header">
                        {
                            this.weekdays.map((weekday) => {
                                return <div className="weekday"><p>{weekday}</p></div>
                            })
                        }
                    </div>
                    <CalendarDays day={this.state.currentDay} changeCurrentDay={this.changeCurrentDay} eventsList={this.props.eventsList} />
                </div>
            </div>
        )
    }
}