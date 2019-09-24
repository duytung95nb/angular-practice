import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ivy-project';
  private worker = new Worker('./app.worker', { type: 'module' });
  constructor() {
    // when calculation done
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.worker.onmessage = ({ data }) => {
        alert(data);
      };
    } else {
      // Web Workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
    }
  }

  clickButton()  {
    this.worker.postMessage('hello');
  }

  ngOnDestroy() {
    this.worker.terminate();
  }
}
