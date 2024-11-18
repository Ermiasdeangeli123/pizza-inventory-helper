import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useSession } from '@supabase/auth-helpers-react';

export function useCurrency() {
  const session = useSession();
  const [currency, setCurrency] = useState('EUR');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrency = async () => {
      try {
        if (!session?.user?.id) return;

        const { data, error } = await supabase
          .from('profiles')
          .select('currency')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;
        if (data?.currency) {
          setCurrency(data.currency);
        }
      } catch (error) {
        console.error('Error fetching currency:', error);
      } finally {
        setLoading(false);
      }
    };

    getCurrency();
  }, [session]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: currency
    }).format(price);
  };

  return {
    currency,
    loading,
    formatPrice
  };
}