import clsx from 'clsx';

interface Props {
  amount: number;
  className: string;
  currencyCode?: string;
}

const Price = ({
                 amount,
                 currencyCode = 'COP',
                 className
               }: Props) => (
  <p suppressHydrationWarning={true} className={className}>
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
