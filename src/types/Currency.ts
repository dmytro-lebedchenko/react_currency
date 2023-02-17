export interface Currency {
  ccy: string,
  base_ccy: string,
  buy: string,
  sale: string
}

export type CurrencyType = 'buy' | 'sale';