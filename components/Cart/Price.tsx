import clsx from 'clsx';

interface Props {
  amount: number;
  currencyCode?: string;
}

const Price = ({
                 amount,
                 currencyCode = 'COP',
               }: Props) => (
  <p suppressHydrationWarning={true}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'symbol',
      minimumFractionDigits: 0,
      useGrouping: true
    }).format(amount)}`}
  </p>
);

export default Price;
