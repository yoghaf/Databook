import { Image, Heading, Center, Box } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Card({ card }) {
  return (
    <>
      {card.map((card) => {
        return (
          <Link to={`/card/${card.id}`}>
            <Box className="yugioh-card" key={card.id}>
              {card.card_images.map((img) => {
                return <Image src={img.image_url} alt={img.id} />;
              })}

              <Center>
                <Heading mt={"2"} size={"xs"} as="h2">
                  {card.name}
                </Heading>
              </Center>
            </Box>
          </Link>
        );
      })}
    </>
  );
}

export default Card;
