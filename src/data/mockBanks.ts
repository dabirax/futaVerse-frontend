import { PaystackBank } from '@/types/event'

/** Sample of Nigerian banks as returned by Paystack's /bank endpoint. */
export const mockBanks: PaystackBank[] = [
  { code: '044', name: 'Access Bank', slug: 'access-bank' },
  { code: '063', name: 'Access Bank (Diamond)', slug: 'access-bank-diamond' },
  { code: '035', name: 'Wema Bank', slug: 'wema-bank' },
  { code: '058', name: 'Guaranty Trust Bank', slug: 'gtbank' },
  { code: '057', name: 'Zenith Bank', slug: 'zenith-bank' },
  { code: '011', name: 'First Bank of Nigeria', slug: 'first-bank' },
  { code: '033', name: 'United Bank for Africa', slug: 'uba' },
  { code: '070', name: 'Fidelity Bank', slug: 'fidelity-bank' },
  { code: '232', name: 'Sterling Bank', slug: 'sterling-bank' },
  { code: '032', name: 'Union Bank', slug: 'union-bank' },
  { code: '221', name: 'Stanbic IBTC Bank', slug: 'stanbic-ibtc' },
  { code: '214', name: 'First City Monument Bank', slug: 'fcmb' },
  { code: '076', name: 'Polaris Bank', slug: 'polaris-bank' },
  { code: '215', name: 'Unity Bank', slug: 'unity-bank' },
  { code: '082', name: 'Keystone Bank', slug: 'keystone-bank' },
  { code: '50515', name: 'Moniepoint MFB', slug: 'moniepoint' },
  { code: '999992', name: 'Opay', slug: 'opay' },
  { code: '50211', name: 'Kuda Bank', slug: 'kuda' },
  { code: '120001', name: '9 Payment Service Bank', slug: '9psb' },
  { code: '100004', name: 'PalmPay', slug: 'palmpay' },
]
