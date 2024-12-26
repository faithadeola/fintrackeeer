export const formatNaira = (amount) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

export const parseNairaAmount = (amount) => {
  return parseInt(amount.replace(/[^0-9-]/g, ''))
}