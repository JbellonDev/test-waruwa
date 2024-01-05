import clsx from 'clsx';

interface Props {
  amount: number;
  className?: string;
  currencyCode?: string;
  currencyCodeClassName?: string;
}

const Price = ({
                 amount,
                 className,
                 currencyCode = 'COP',
                 currencyCodeClassName
               }: Props) => (
  <p suppressHydrationWarning={true} className={className}>
    {`${new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currencyCode,
      currencyDisplay: 'narrowSymbol'
    }).format(amount)}`}
    <span className={clsx('ml-1 inline', currencyCodeClassName)}>{`${currencyCode}`}</span>
  </p>
);

export default Price;
