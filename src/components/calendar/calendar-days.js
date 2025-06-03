import { useEffect } from "react";

function CalendarDays(props) {
    const firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    const weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];
    var eventDates = [];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

    const eventsList = props.eventsList

    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
            firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }

        let calendarDay = {
            currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
            date: (new Date(firstDayOfMonth)),
            month: firstDayOfMonth.getMonth(),
            number: firstDayOfMonth.getDate(),
            selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
            year: firstDayOfMonth.getFullYear(),
            dotted: (eventDates.includes(new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), firstDayOfMonth.getDate())))
        }

        currentDays.push(calendarDay);
    }

    eventsList.map(event => {
        eventDates.push(new Date(parseInt(event.year), months.indexOf(event.month), parseInt(event.day)))
    })

    useEffect(() => {
        eventsList.map(event => {
            eventDates.push(new Date(parseInt(event.year), months.indexOf(event.month), parseInt(event.day)))
        })

    }, [])


    // (eventDates.includes((new Date(day.year, day.month, day.number))))

    function checkDate(year, month, number) {
        var check = "false"
        eventDates.map(eventDate => {
            if ((eventDate.getDate() === number) && (eventDate.getMonth() === month) && (eventDate.getFullYear() === year)) {
                check = "true"
            }
        })

        return check
    }

    return (
        <div className="table-content">
            {
                currentDays.map((day) => {
                    return (
                        <div id={((day.number === new Date().getDate() && day.month === new Date().getMonth()) ? "today" : "")} className={"calendar-day" + (day.currentMonth ? " current" : "") + (day.selected ? " selected" : "")}
                            onClick={() => props.changeCurrentDay(day)}>
                            <div>
                                <p id={(checkDate(day.year, day.month, day.number) === "true") ? "underline" : ""}>{day.number}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CalendarDays;