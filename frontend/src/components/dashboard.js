import Chart from 'chart.js/auto';
import {OperationsService} from "../services/operations-service";
import {BalanceService} from "../services/balance-service";
import flatpickr from 'flatpickr';
import {Russian} from "flatpickr/dist/l10n/ru.js";

export class Dashboard {
  constructor(openNewRoute) {
    this.openNewRoute = openNewRoute;
    this.incomeChart = null;
    this.expensesChart = null;

    this.chartColors = ['#DC3545', '#20C997', '#0D6EFD', '#FFC107', '#FD7E14', '#6610F2', '#E83E8C'];

    this.init().then();
  }

  async init() {
    this.initDatePicker();
    this.initFilterButtons();

    const balance = await BalanceService.getBalance();
    const balanceElement = document.getElementById('balance-value');
    if (balance !== null && balanceElement) {
      balanceElement.innerText = `${balance}$`;
    }

    await this.getAndRenderData('today');
  }

  async getAndRenderData(period, dateFrom = null, dateTo = null) {
    const response = await OperationsService.getOperations(period, dateFrom, dateTo);

    if (response.error) {
      if (response.redirect) return this.openNewRoute(response.redirect);
      return alert(response.error);
    }

    this.processCharts(response.operations);
  }

  processCharts(operations) {
    const chartData = {
      income: {},
      expense: {}
    };

    operations.forEach(op => {
      const categoryName = op.category || 'Без категории';

      if (!chartData[op.type][categoryName]) {
        chartData[op.type][categoryName] = 0;
      }
      chartData[op.type][categoryName] += op.amount;
    });

    this.renderChart('incomeChart', chartData.income, -80, 'income-legend');
    this.renderChart('expensesChart', chartData.expense, -15, 'expenses-legend');
  }

  renderChart(canvasId, data, rotationAngle, legendId) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;

    // Уничтожаем старый график, если он есть
    if (canvasId === 'incomeChart' && this.incomeChart) this.incomeChart.destroy();
    if (canvasId === 'expensesChart' && this.expensesChart) this.expensesChart.destroy();

    const hasData = Object.keys(data).length > 0;

    this.renderCustomLegend(legendId, data, hasData);

    const chartConfig = {
      type: 'pie',
      data: {
        labels: hasData ? Object.keys(data) : ['Нет данных'],
        datasets: [{
          data: hasData ? Object.values(data) : [1],
          backgroundColor: hasData ? this.chartColors : ['#E2E3E5'],
          borderWidth: hasData ? 1 : 0
        }]
      },
      options: this.getChartOptions(rotationAngle)
    };

    const newChart = new Chart(canvas, chartConfig);

    if (canvasId === 'incomeChart') this.incomeChart = newChart;
    else this.expensesChart = newChart;
  }

  renderCustomLegend(legendId, chartData, hasData) {
    const legendContainer = document.getElementById(legendId);
    if (!legendContainer) return;

    legendContainer.innerHTML = '';

    if (!hasData) {
      legendContainer.innerHTML = '<span class="text-secondary small">Пусто</span>';
      return;
    }

    Object.keys(chartData).forEach((categoryName, index) => {
      const amount = chartData[categoryName];
      const color = this.chartColors[index % this.chartColors.length]; // Зацикливаем цвета, если категорий больше

      const legendItem = document.createElement('div');
      legendItem.className = 'legend-item d-flex align-items-center';

      legendItem.innerHTML = `
        <span class="legend-color-box" style="background-color: ${color};"></span>
        <span class="mx-2 small fw-bold">${categoryName}:</span>
        <span class="small text-secondary">${amount}$</span>
      `;

      legendContainer.appendChild(legendItem);
    });
  }

  initFilterButtons() {
    const buttons = document.querySelectorAll('.btn-outline-secondary, .btn-secondary');
    buttons.forEach(btn => {
      btn.onclick = async () => {
        if (btn.classList.contains('active')) return;

        buttons.forEach(b => {
          b.classList.remove('active', 'btn-secondary');
          b.classList.add('btn-outline-secondary');
        });

        btn.classList.add('active', 'btn-secondary');
        btn.classList.remove('btn-outline-secondary');

        const period = btn.getAttribute('data-period');
        if (period !== 'interval') {
          this.fpFrom.clear();
          this.fpTo.clear();
          document.getElementById('date-from').innerText = 'Дата';
          document.getElementById('date-to').innerText = 'Дата';

          await this.getAndRenderData(period);
        }
      };
    });
  }

  initDatePicker() {
    const dateFromElement = document.getElementById('date-from');
    const dateToElement = document.getElementById('date-to');

    const config = {
      locale: Russian,
      dateFormat: "d.m.Y",
      disableMobile: "true",
      onChange: async (selectedDates, dateStr, instance) => {
        instance.element.innerText = dateStr;

        await this.checkInterval();
      }
    };

    this.fpFrom = flatpickr(dateFromElement, config);
    this.fpTo = flatpickr(dateToElement, config);
  }

  async checkInterval() {
    if (this.fpFrom.selectedDates.length > 0 && this.fpTo.selectedDates.length > 0) {
      const buttons = document.querySelectorAll('.period-btn');
      const intervalBtn = Array.from(buttons).find(b => b.getAttribute('data-period') === 'interval');

      if (intervalBtn) {
        buttons.forEach(b => {
          b.classList.remove('active', 'btn-secondary');
          b.classList.add('btn-outline-secondary');
        });
        intervalBtn.classList.add('active', 'btn-secondary');
        intervalBtn.classList.remove('btn-outline-secondary');
      }

      const from = this.fpFrom.formatDate(this.fpFrom.selectedDates[0], "Y-m-d");
      const to = this.fpTo.formatDate(this.fpTo.selectedDates[0], "Y-m-d");
      await this.getAndRenderData('interval', from, to);
    }
  }

  destroy() {
    if (this.fpFrom) this.fpFrom.destroy();
    if (this.fpTo) this.fpTo.destroy();

    if (this.incomeChart) this.incomeChart.destroy();
    if (this.expensesChart) this.expensesChart.destroy();
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