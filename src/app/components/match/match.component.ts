import { Component, OnInit } from '@angular/core';
import { MatchsvService } from 'src/app/Services/matchsv.service';

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent implements OnInit {
  matches: any[] = [];
  calendar: any[] = [];
  selectedMatch: any;
  constructor(private matchsv: MatchsvService) { }

  ngOnInit(): void {
    this.getMatches();
    this.createCalendar();
  }

  getMatches() {
    this.matchsv.getMatches().subscribe((data) => {
      this.matches = data.content;
    });
  }

  createCalendar() {
    const today = new Date();
    const month = today.getMonth();
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const matchForDate = this.matches.find(match => this.isSameDate(new Date(match.time), date));

      this.calendar.push({
        date: date,
        hasMatch: matchForDate !== undefined,
        match: matchForDate || null
      });
    }
  }

  isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear()
      && date1.getMonth() === date2.getMonth()
      && date1.getDate() === date2.getDate();
  }

  onDateSelected(match: any) {
    this.selectedMatch = match;
  }
}
