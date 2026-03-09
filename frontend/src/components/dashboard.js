import Chart from 'chart.js/auto';
import Flatpickr from 'flatpickr';
import {Russian} from "flatpickr/dist/l10n/ru.js";

export class Dashboard {
  constructor() {
    this.charts = [];
    this.initCharts();
    this.initDatePicker();
  }

  initDatePicker() {
    const dateFromInput = document.getElementById('date-from');
    const dateToInput = document.getElementById('date-to');

    if (dateFromInput && dateToInput) {
      const config = {
        locale: Russian,
        dateFormat: "d.m.Y",
        disableMobile: "true",
      };

      this.fpFrom = Flatpickr(dateFromInput, {
        ...config,
        onChange: (selectedDates) => {
          this.fpTo.set('minDate', selectedDates[0]);
        }
      });

      this.fpTo = Flatpickr(dateToInput, {
        ...config,
        onChange: (selectedDates) => {
          this.fpFrom.set('maxDate', selectedDates[0]);
        }
      });

      const intervalBtn = document.getElementById('interval-btn');
      if (intervalBtn) {
        intervalBtn.addEventListener('click', () => this.fpFrom.open());
      }
    }
  }

  initCharts() {
    const incomeChart = document.getElementById('incomeChart');
    if (incomeChart) {
      const chart = new Chart(incomeChart, {
        type: 'pie',
        data: {
          datasets: [{
            data: [25, 15, 10, 15, 35],
            backgroundColor: ['#DC3545', '#20C997', '#0D6EFD', '#FFC107', '#FD7E14'],
            borderWidth: 1
          }]
        },
        options: this.getChartOptions(-80)
      });
      this.charts.push(chart);
    }

    const expensesChart = document.getElementById('expensesChart');
    if (expensesChart) {
      const chart = new Chart(expensesChart, {
        type: 'pie',
        data: {
          datasets: [{
            data: [30, 12, 23, 5, 30],
            backgroundColor: ['#20C997', '#FD7E14', '#0D6EFD', '#DC3545', '#FFC107'],
            borderWidth: 1
          }]
        },
        options: this.getChartOptions(-15)
      });
      this.charts.push(chart);
    }
  }

  destroy() {
    if (this.fpFrom) this.fpFrom.destroy();
    if (this.fpTo) this.fpTo.destroy();

    if (this.charts && this.charts.length > 0) {
      this.charts.forEach(chart => chart.destroy());
      this.charts = [];
    }
  }

  getChartOptions(rotationAngle) {
    return {
      responsive: true,
      maintainAspectRatio: false,
      rotation: rotationAngle,
      plugins: {
        legend: {
          display: false,
        }
      }
    };
  }
}