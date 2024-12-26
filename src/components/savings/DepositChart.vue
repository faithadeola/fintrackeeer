<template>
  <div class="bg-white rounded-xl p-6 shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-semibold text-gray-800">Deposit statistics</h2>
      <div class="flex items-center gap-2 text-sm">
        <span class="text-gray-500">Target:</span>
        <span class="font-medium">{{ formatNaira(100) }}</span>
        <span class="text-gray-500">On avg per month:</span>
        <span class="font-medium">{{ formatNaira(150) }}</span>
      </div>
    </div>
    
    <div class="h-[200px]">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script setup>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { formatNaira } from '../../utils/currency'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Deposits',
      data: [250, 150, 200, 180, 0, 0, 0, 0, 0, 0, 0, 0],
      backgroundColor: '#42b983',
      borderRadius: 4
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
        label: (context) => formatNaira(context.raw)
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