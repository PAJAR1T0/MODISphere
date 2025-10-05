import type { Earth } from ".";

export class TimeLine {
    parentDom : HTMLElement
    earthClass : Earth
    timeLineDiv! : HTMLDivElement
    datePElement! : HTMLParagraphElement
    date : Date
    day! : number
    month! : number
    year! : number
    timeLineDay! : number
    timeLineMonth! : number
    timeLineYear! : number
    daysPerMonths! : number[]
    backDayButton! : HTMLButtonElement
    nextDayButton! : HTMLButtonElement

    constructor(parentDom : HTMLElement, earthClass : Earth) {
        this.parentDom = parentDom
        this.earthClass = earthClass
        this.date = new Date()
        this.setTimeLine();
        this.updateTimeLine();
    }

    getDaysPerMonths(year : number) {
        this.daysPerMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (year % 4 === 0) this.daysPerMonths[1] = 29
    }

    setTimeLine() {
        this.timeLineDiv = document.createElement('div');
        this.timeLineDiv.id = 'timeLineDiv';
        this.setBackDayButton();
        this.setPElement();
        this.setNextDayButton();
        this.parentDom.appendChild(this.timeLineDiv);
    }

    setBackDayButton() {
        this.backDayButton = document.createElement('button');
        this.backDayButton.innerText = '<';
        this.backDayButton.addEventListener(('click'), () => {
            this.updateTimeLine(-1);
        })
        this.timeLineDiv.appendChild(this.backDayButton);
    }

    setPElement() {
        this.datePElement = document.createElement('p'); 
        this.timeLineDiv.appendChild(this.datePElement);
    }

    setNextDayButton() {
        this.nextDayButton = document.createElement('button');
        this.nextDayButton.innerText = '>';
        this.nextDayButton.addEventListener(('click'), () => {
            this.updateTimeLine(1);
        })
        this.timeLineDiv.appendChild(this.nextDayButton);
    }

    updateTimeLine(dayValue ?: number) {
        if (!this.day || this.day !== this.date.getDate()) {
            this.day = this.date.getDate();
            this.month = this.date.getMonth();
            this.year = this.date.getFullYear();
        }

        if (!dayValue) {
            this.timeLineDay = this.day;
            this.timeLineMonth = this.month;
            this.timeLineYear = this.year;
            this.getDaysPerMonths(this.year)
            this.earthClass.setURL(this.timeLineDay, this.timeLineMonth + 1, this.timeLineYear);
            this.updatePValue()
            this.nextDayButton.disabled = true;
            return;
        } 

        let calculatedDay = this.timeLineDay + dayValue;

        if (!this.checkDayLimit(calculatedDay)) {
            // Si el dia es mayor que los dias del mes 
            if (calculatedDay > this.daysPerMonths[this.timeLineMonth]) {
                // Si no estamos en diciembre 
                if (this.timeLineMonth !== 11) {
                    this.timeLineMonth += 1;
                    calculatedDay = 1;
                } else {
                    // Si estamos en diciembre
                    this.timeLineMonth = 0;
                    calculatedDay = 1
                    this.timeLineYear += 1
                    this.getDaysPerMonths(this.timeLineYear)
                }
            }
            // Si el dia es menor que 1
            if (calculatedDay < 1) {
                // Si no estamos en enero
                if (this.timeLineMonth !== 0) {
                    this.timeLineMonth -= 1;
                } else {
                    // Si estamos en enero
                    this.timeLineMonth = 11
                    this.timeLineYear -= 1;
                    this.getDaysPerMonths(this.timeLineYear);
                }
                // Ajustar el dia de la linea del tiempo
                calculatedDay = this.daysPerMonths[this.timeLineMonth]
            }
            this.timeLineDay = calculatedDay;
        }
        this.checkDayLimit(this.timeLineDay + 1);
        this.updatePValue();
        this.earthClass.setURL(this.timeLineDay, this.timeLineMonth + 1, this.timeLineYear);
    }

    updatePValue() {
        const day = (this.timeLineDay.toString().length === 1) ? `0${this.timeLineDay}` : this.timeLineDay;
        const month = this.timeLineMonth + 1;
        (month.toString().length === 1) ? `0${this.timeLineMonth}` : this.timeLineMonth;
        this.datePElement.innerText = `${day} / ${month} / ${this.timeLineYear}`
    }

    checkDayLimit(nextDay : number) {
        if (nextDay > this.day && 
            this.timeLineMonth == this.month && 
            this.timeLineYear == this.year) {
                this.nextDayButton.disabled = true
                return true;
            };
        this.nextDayButton.disabled = false
        return false;
    }
}