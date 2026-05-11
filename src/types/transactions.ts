type TransactionsApiResponse = {
  id: string | number;
  name: string;
  amount: number;
  date: string;
  category:
    | "all"
    | "Income"
    | "Shopping"
    | "Food"
    | "Utilities"
    | "Health"
    | "Transportation"
    | "Entertainment"
    | "Education";
  account: string;
};

export type TransactionResponse = {
  allTransactions: TransactionsApiResponse[];
};