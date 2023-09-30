import { Pipe, PipeTransform } from '@angular/core';

// chuyển đổi với API trả da định dạng: 2023-06-04T00:00:00.000+00:00
@Pipe({
  name: 'dateTransform'
})
export class DateTransformPipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    const day = date.getDate();
    const monthIndex = date.getMonth() + 1;
    const year = date.getFullYear();

    const monthNames = [
      'tháng 1', 'tháng 2', 'tháng 3',
      'tháng 4', 'tháng 5', 'tháng 6',
      'tháng 7', 'tháng 8', 'tháng 9',
      'tháng 10', 'tháng 11', 'tháng 12'
    ];

    return `ngày ${day} ${monthNames[monthIndex - 1]} năm ${year}`;
  }
}
