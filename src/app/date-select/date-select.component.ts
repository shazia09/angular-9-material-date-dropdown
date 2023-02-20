import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  Output
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "date-select",
  templateUrl: "./date-select.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateSelectComponent),
      multi: true
    }
  ]
})
export class DateSelectComponent implements ControlValueAccessor {
  date: Date = new Date();

  get Date() {
    return this.date;
  }
  @Input()
  set Date(value: Date) {
    if (value === this.date) return;
   
    this.date = value;
    this.onChange(this.date);
    this.DateChange.emit(this.date);
    this.setDate();
  }

  @Output()
  public DateChange: EventEmitter<Date> = new EventEmitter<Date>();

  allDates: number[] = [];
  dates: number[] = [];
  months: number[] = [];
  years: number[] = [];
  thirtyDaysMonths: number[] = [4, 6, 9, 11];

  selectedDate: number;
  selectedMonth: number;
  selectedYear: number;

  constructor(private cdRef: ChangeDetectorRef) {
    for (let i = 1; i <= 31; i++) {
      this.allDates.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      this.months.push(i);
    }
    for (let i = 1990; i <= 2100; i++) {
      this.years.push(i);
    }
    this.dates = this.allDates;
  }

  onChange: any = () => {};
  onTouch: any = () => {};
  val = null;

  set controlValue(val) {
    if (!val) {
      val = new Date();
    }
    this.val = val;
    this.Date = val;
    this.onChange(val);
    this.onTouch(val);
  }

  writeValue(value: any) {
    this.controlValue = value;
    this.Date = value;
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  setDate() {
    if (this.date) {
      this.selectedDate = this.date.getDate();
      this.selectedMonth = this.date.getMonth() + 1;
      this.selectedYear = this.date.getFullYear();
    }
    this.setDates();
  }

  isLeapYear() {
    return (
      this.selectedYear % 400 === 0 ||
      (this.selectedYear % 100 !== 0 && this.selectedYear % 4 === 0)
    );
  }

  dateChanged(value) {
    this.Date = new Date(this.selectedYear, this.selectedMonth - 1, value);
  }

  setDates() {
    let maxDate = 31;
    if (this.selectedMonth === 2) {
      maxDate = this.isLeapYear() ? 29 : 28;
    } else if (this.thirtyDaysMonths.includes(this.selectedMonth)) {
      maxDate = 30;
    }
    this.dates = this.allDates.filter(f => f <= maxDate);
  }

  monthChanged(value) {
    let maxDate = 31;
    if (value === 2) {
      maxDate = this.isLeapYear() ? 29 : 28;
    } else if (this.thirtyDaysMonths.includes(value)) {
      maxDate = 30;
    }

    this.dates = this.allDates.filter(f => f <= maxDate);

    if (this.selectedDate > maxDate) {
      this.selectedDate = 1;
      this.cdRef.detectChanges();
    }

    this.Date = new Date(this.selectedYear, value - 1, this.selectedDate);
  }

  yearChanged(value) {
    this.Date = new Date(value, this.selectedMonth - 1, this.selectedDate);
  }
}
