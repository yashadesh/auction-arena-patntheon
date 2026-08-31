export function formatINR(amount: number): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(Math.round(amount));
  
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(absAmount);

  return isNegative ? `-${formatted}` : formatted;
}

export function formatShortINR(amount: number): string {
  const isNegative = amount < 0;
  const abs = Math.abs(amount);
  
  if (abs >= 10000000) {
    return `${isNegative ? '-' : ''}₹${(abs / 10000000).toFixed(2)} Cr`;
  }
  if (abs >= 100000) {
    return `${isNegative ? '-' : ''}₹${(abs / 100000).toFixed(2)} L`;
  }
  if (abs >= 1000) {
    return `${isNegative ? '-' : ''}₹${(abs / 1000).toFixed(1)}k`;
  }
  return formatINR(amount);
}

export function formatPercent(percent: number): string {
  const prefix = percent > 0 ? '+' : '';
  return `${prefix}${percent.toFixed(1)}%`;
}
