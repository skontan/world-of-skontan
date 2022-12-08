import { trpc } from "@wos/client/src/utils/trpc";
import {
  Heading,
  Highlight,
  Skeleton,
  Box,
  Text,
  Link,
  Flex,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default function WordOfDay() {
  const { data: word, isLoading } = trpc.words.wordOfDay.useQuery();

  if (!word) {
    return <Skeleton />;
  }

  return (
    <Flex align="center" justify="center" height="100vh" direction="column">
      <Heading mb="3">
        <Highlight
          query={word.wordOfDay ?? ""}
          styles={{
            px: "1",
            py: "1",
            bg: "teal.100",
            transitionDuration: "200ms",
            _hover: {
              bg: "orange.200",
              transitionDuration: "200ms",
            },
          }}
        >{`Dagens ord: ${word.wordOfDay}`}</Highlight>
      </Heading>

      <Text as="i" align="center" mb="2">
        {word.definition}
      </Text>

      <Link href={word.href} color="orange.400">
        Se definition
        <ExternalLinkIcon mx="2px" />
      </Link>
    </Flex>
  );
}
