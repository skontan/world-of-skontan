import { trpc } from "@wos/client/src/utils/trpc";

export default function WordOfDay() {
  const { data: word, isLoading } = trpc.words.wordOfDay.useQuery();

  if (isLoading) {
    return null;
  }

  return (
    <div>
      <p>Dagens ord: {word?.wordOfDay}</p>
      {word?.href ? <a href={word.href}>Se definition</a> : null}
    </div>
  );
}
