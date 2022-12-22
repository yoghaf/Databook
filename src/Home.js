import { useState, useEffect } from "react";
import { Center, SimpleGrid, Select } from "@chakra-ui/react";
import Card from "./Cards";
function Home() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);

  const url = "https://db.ygoprodeck.com/api/v7/cardinfo.php?banlist=tcg&level=4";
  //fetch data
  const fetchCard = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    setCards(data.data);
  };
  useEffect(() => {
    setLoading(true);
    try {
      fetchCard(url);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }, [url]);

  function sortData(type) {
    const types = type.target.value;
    console.log(types);
    if (types === "Name") {
      const newdata = cards.sort((a, b) => a.name.localeCompare(b.name));
      const sortedData = [...newdata];
      setCards(sortedData);
    } else if (types === "Attack") {
      const newdata = cards.sort((a, b) => {
        return a.atk - b.atk;
      });
      const sortedData = [...newdata];
      setCards(sortedData);
    } else if (types === "Defence") {
      const newdata = cards.sort((a, b) => {
        return a.def - b.def;
      });
      const sortedData = [...newdata];
      setCards(sortedData);
    }
  }
  if (loading) return <h1>Loading...</h1>;

  return (
    <>
      {cards && (
        <div>
          <Center>
            <Select mt={"2"} w={"50%"} name="sort" onChange={(e) => sortData(e)}>
              <option value="Name">name</option>
              <option value="Attack">attack</option>
              <option value="Defence">defence</option>
            </Select>
          </Center>
          <Center>
            <SimpleGrid mt={"10"} w={"70%"} columns={[1, 2, 4]} gap="10">
              <Card card={cards} />
            </SimpleGrid>
          </Center>
        </div>
      )}
    </>
  );
}

export default Home;
