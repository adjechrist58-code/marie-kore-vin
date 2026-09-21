export function formatPrice(amount: number, currency: 'XOF' | 'EUR' = 'XOF'): string {
  if (currency === 'EUR') {
    const inEur = amount / 655.957;
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 2,
    }).format(inEur);
  }

  // Format as FCFA
  return `${new Intl.NumberFormat('fr-FR').format(Math.round(amount))} FCFA`;
}

export function calculateDiscount(price: number, originalPrice?: number): number | null {
  if (!originalPrice || originalPrice <= price) return null;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
