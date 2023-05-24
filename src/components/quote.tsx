import { fetchQuote } from '@/api/requests';
import formatQuote from '@/lib/formatQuote';

const Quote = async () => {
  const quotePromise: Promise<string> = fetchQuote();
  const quote = await quotePromise;
  const { saying, person } = formatQuote(quote);
  return (
    <div className="text-center">
      <div className="font-bold">{`"${saying}"`}</div>
      <div className="mt-3 text-xs">{`- ${person} -`}</div>
    </div>
  );
};

export default Quote;
