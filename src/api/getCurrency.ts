import { Currency } from "../types/Currency";

const BASE_URL = "https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5";

async function request<T>(): Promise<T> {
  const response = await fetch(
    `https://api.allorigins.win/raw?url=${encodeURIComponent(BASE_URL)}`
  );

  if (!response.ok) {
    throw new Error();
  }

  return response.json();
}

export const getCurrency = () => request<Currency[]>();
