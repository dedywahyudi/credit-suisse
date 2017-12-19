import { Pipe, PipeTransform } from '@angular/core';

// Pipe to remove the `http(s)://` from a passed url
@Pipe({
  name: 'url'
})
export class UrlPipe implements PipeTransform {
  transform(value: string): string {
    return (value || '').replace(/https?\:\/\//i, '');
  }
}
