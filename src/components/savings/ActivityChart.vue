<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Savings all accounts activity</h2>
    </div>
    
    <div class="h-[200px]">
      <Line :data="chartData" :options="chartOptions" />
    </div>

    <div class="flex justify-between items-center mt-4 text-sm">
      <div class="flex items-center gap-2">
        <span class="text-gray-500">Deposit Minimum</span>
        <span class="font-medium">{{ formatNaira(450) }}</span>
        <span class="text-gray-500">per month</span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-gray-500">Average Deposit</span>
        <span class="font-medium">{{ formatNaira(390) }}</span>
        <span class="text-gray-500">per month</span>
      </div>
    </div>
  </div>
</template>

<script setup>
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
import { formatNaira } from '../../utils/currency'

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
  labels: ['Jan', 'Feb', 'Mar', 'Apr'],
  datasets: [
    {
      label: 'Savings',
      data: [300, 450, 380, 500],
      borderColor: '#42b983',
      backgroundColor: '#42b98320',
      tension: 0.4,
      fill: true
    },
    {
      label: 'Minimum',
      data: [450, 450, 450, 450],
      borderColor: '#fbbf24',
      borderDash: [5, 5],
      tension: 0
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
        label: (context) => `${context.dataset.label}: ${formatNaira(context.raw)}`
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
        callback: (value) => formatNaira(value)
      }
    },
    x: {
      grid: {
        display: false
      }
    }
  }
}
</script>