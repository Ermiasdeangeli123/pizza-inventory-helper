export function useCurrency() {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'CHF'
    }).format(price);
  };

  return {
    currency: 'CHF',
    loading: false,
    formatPrice
  };
}