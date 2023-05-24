export default function formatQuote(quote: string): {
  saying: string;
  person: string;
} {
  if (quote.includes('-')) {
    const splitQuote = quote.split('-');
    const saying = splitQuote[0].trim();
    const person = splitQuote[1].trim();
    return { saying, person };
  }
  if (quote.includes('–')) {
    const splitQuote = quote.split('–');
    const saying = splitQuote[0].trim();
    const person = splitQuote[1].trim();
    return { saying, person };
  }
  return {
    saying:
      '- 와 – 는 다른 문자고 이 문장이 뜨는 이유는 문장 안에 둘 다 포함이 안되었기 때문이다.',
    person: '이호우',
  };
}
