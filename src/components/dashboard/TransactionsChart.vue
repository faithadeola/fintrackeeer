<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Your Transactions this year</h2>
      <div class="flex gap-2">
        <button class="text-sm text-gray-500 hover:text-primary">Expenses</button>
        <button class="text-sm text-primary">Income</button>
      </div>
    </div>
    
    <div class="h-[300px] sm:h-[400px]">
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Income',
      data: [3000, 2800, 3200, 3100, 3400, 3300, 3500, 3450, 3600, 3550, 3700, 3800],
      borderColor: '#42b983',
      backgroundColor: '#42b98320',
      tension: 0.4,
      fill: true
    }
  ]
}

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      mode: 'index',
      intersect: false,
      backgroundColor: 'white',
      titleColor: '#1f2937',
      bodyColor: '#1f2937',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      padding: 12,
      displayColors: false,
      callbacks: {
        label: (context) => `$${context.raw.toLocaleString()}`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      grid: {
        color: '#f3f4f6'
      },
      ticks: {
        callback: (value) => `$${value.toLocaleString()}`
      }
    },
    x: {
      grid: {
        display: false
      },
      ticks: {
        maxRotation: 0
      }
    }
  }
}
</script>