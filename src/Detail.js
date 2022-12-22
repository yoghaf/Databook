import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Box, Button, Image, Center, Heading, Text, Stack, SimpleGrid, Flex } from "@chakra-ui/react";

function Detail() {
  const { id } = useParams();
  const [cards, setCards] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const backHome = () => {
    navigate("/");
  };
  //fetct
  const fetchCard = async (id) => {
    const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${id}`);
    const data = await response.json();
    setCards(data.data);
  };
  useEffect(() => {
    setLoading(true);
    try {
      fetchCard(id);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, []);
  console.log(cards);
  if (cards.length < 1) return <h1>Loading...</h1>;
  return (
    <>
      {cards && (
        <Box>
          <Button mt={"5"} ml={"5"} onClick={backHome}>
            Back
          </Button>
          {cards &&
            cards.map((card) => {
              return (
                <Box key={card.id} mx="20" mt={"10"}>
                  <Flex gap={"2"}>
                    {card.card_images.map((img) => {
                      return <Image w={"200px"} src={img.image_url} alt={card.id} />;
                    })}
                    <Box>
                      <Heading as={"h2"}>{card.name}</Heading>
                      <Text as={"b"}>Level: {card.level}</Text>
                      <br />
                      <Text as="b">{card.attribute}</Text>
                      <br />
                      <Text as={"b"}>
                        ATK/{card.atk} DEF/{card.def}
                      </Text>
                      <br />
                      <Text>
                        {"[ "}
                        {card.type} / {card.race}
                        {" ]"}
                      </Text>
                      <Text>Description: {card.desc}</Text>
                    </Box>
                  </Flex>
                  <SimpleGrid columns={[1, 2, 4]} spacing="px" mt={"10"}>
                    {card.card_sets.map((set) => {
                      return (
                        <Box maxW="sm" borderWidth="2px" borderRadius="lg" overflow="hidden">
                          <Text>Name: {set.set_name}</Text>
                          <Text>Code: {set.set_code}</Text>
                          <Text>Rarity: {set.set_rarity}</Text>
                          <Text>Price: {set.set_price}</Text>
                        </Box>
                      );
                    })}
                  </SimpleGrid>
                </Box>
              );
            })}
        </Box>
      )}
    </>
  );
}

export default Detail;
