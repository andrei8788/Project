import {Component, OnInit} from '@angular/core';
import {fadeStateTrigger} from '../../../shared/animations/fade.animation';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css'],
  animations: [fadeStateTrigger]
})
export class CalculatorComponent implements OnInit {
  values: string | number = '0';
  isOperations = false;
  isDeleteButtonOperation = false;

  cacheValueOperation = '';
  cacheValue1: string | number = '';
  cacheValue2: string | number = '';

  ngOnInit() {
  }

  onNumberButtonClicked(e) {
    if (this.isOperations) {
      this.values = '0';
      this.isOperations = false;
    }
    this.values = this.values === '0' ? '' : this.values;
    const value = e.target.innerText;
    this.values = this.values + value;
    this.cacheValue2 = (this.cacheValue1 && this.cacheValueOperation) !== '' ? this.cacheValue2 + value : '';
  }


  onOperationButtonClicked(e) {
    if (this.cacheValue2) {
      this.operations();
      this.isOperations = true;
      this.cacheValue2 = '';
    }
    const value = e.target.innerText;
    if (this.values !== '0' &&
      this.values !== '') {
      const arrayValuesDisplay = this.onArrayValueDisplay(this.values); // assign in array
      const lastSign = arrayValuesDisplay[arrayValuesDisplay.length - 1];
      if (this.cacheValueOperation !== '') {
        arrayValuesDisplay[arrayValuesDisplay.length - 1] = value;

        if (!this.isOperations) {
          this.values = arrayValuesDisplay.join(''); // assign in string
        }

        this.cacheValueOperation = value;
        return;
      }

      if (lastSign !== value) {
        if (this.cacheValue1 === '') {
          this.cacheValue1 = this.values;
        } else if (this.cacheValue1 && !this.isDeleteButtonOperation) {
          this.cacheValue1 = '';
        } else if (this.cacheValue1 && this.isDeleteButtonOperation) {
          this.cacheValue1 = this.values;
        }
      }

      this.values = this.values + value;
      this.cacheValueOperation = value;
    }
  }

  private onArrayValueDisplay(value) {
    const arrayValuesDisplay = value.toString().split('');
    return arrayValuesDisplay;
  }

  operations() {
    if (this.cacheValueOperation === '+') {
      this.values = +this.cacheValue1 + (+this.cacheValue2);
      this.cacheValue1 = this.values;
    }
    if (this.cacheValueOperation === '-') {
      this.values = +this.cacheValue1 - (+this.cacheValue2);
      this.cacheValue1 = this.values;
    }
    if (this.cacheValueOperation === 'x') {
      this.values = +this.cacheValue1 * (+this.cacheValue2);
      this.cacheValue1 = this.values;
    }
    if (this.cacheValueOperation === '÷') {
      this.values = +this.cacheValue1 / (+this.cacheValue2);
      this.cacheValue1 = this.values;
    }
  }

  onSpecialOperationButtonClicked(e) {
    const arrayValuesDisplay = this.onArrayValueDisplay(this.values);
    const lastSign = arrayValuesDisplay[arrayValuesDisplay.length - 1];
    const indexSpecialSign = this.values.toString().indexOf('.');
    const indexOperation = this.values.toString().indexOf(this.cacheValueOperation);

    const valueSpecialOperation = e.target.innerText;

    if (valueSpecialOperation === '√') {
      this.values = Math.sqrt(+this.values);
      this.cacheValue1 = this.values;
    }

    if (valueSpecialOperation === '←') {
      this.isDeleteButtonOperation = true;
      this.values = this.values.toString().slice(0, -1);
      if (this.values !== '') {
        this.cacheValue1 = this.values;
      } else {
        this.values = '0';
        this.cacheValue1 = '';
        this.cacheValue2 = '';
        this.cacheValueOperation = '';
        this.isOperations = false;
      }
    }

    if (valueSpecialOperation === '.') {
      if ((lastSign !== '.' && indexSpecialSign < 0 && this.values !== '') ||
        (lastSign !== '.' && indexSpecialSign > 0 &&
          indexOperation > 0 && lastSign !== this.cacheValueOperation)) {

        this.values = this.values + '.';
        if (indexOperation > 0 || this.cacheValue1 !== '') {
          this.cacheValue2 = this.cacheValue2 + '.';
        }

      }
    }
    if (valueSpecialOperation === '±') {
      const values = this.values.toString();

      if (values.indexOf('-') < 0) {
        this.values = '-' + values;
        if (this.isOperations) {
          this.cacheValue1 = this.values;
        }
      } else {
        this.values = values.slice(1, values.length);
        if (this.isOperations) {
          this.cacheValue1 = this.values;
        }
      }
    }

    if (valueSpecialOperation === 'C') {
      this.values = '0';
      this.cacheValue1 = '';
      this.cacheValue2 = '';
      this.cacheValueOperation = '';
      this.isOperations = false;
    }

    if (valueSpecialOperation === '=') {
      if (this.cacheValue1 !== '' && this.cacheValue2 !== '') {
        this.operations();
        this.cacheValue2 = '';
        this.isOperations = true;
      }
    }

  }
}
