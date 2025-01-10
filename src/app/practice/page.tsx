"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Deck, userInputType } from "../../../helpers/interfaces";
import { MdSearch } from "react-icons/md";
import DeckContainer from "@/components/practice/DeckContainer";
import { deleteDeck, getUser } from "../../../actions/main";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
const PracticePage: React.FC = () => {
  const { data: session } = useSession();
  if (!session) redirect("/login");
  const [user, setUser] = useState<userInputType | null>(null);
  const [decks, setDecks] = useState<Deck[]>([]);
  const [decksQuery, setDeckQuery] = useState<string>("");
  useEffect(() => {
    async function fetchUser() {
      if (session) setUser(await getUser(session?.user?.email as string));
    }
    fetchUser();
  }, [session]);
  useEffect(() => {
    if (user) setDecks(user.decks as Deck[]);
  }, [user]);
  const handleDelete = (deckName: string) => {
    deleteDeck(deckName, user?.email as string);
    setDecks((prevDecks) => prevDecks.filter((deck) => deck.name !== deckName));
  };
  return (
    <main>
      {user && (
        <>
          <div className="w-[79.8611111111%] h-[84px] relative left-1/2 translate-x-[-50%] mt-[30px]">
            <input
              type="text"
              placeholder="Search for a deck"
              className="rounded-[10px] border-[1px] border-[#49243E] pl-[16px] placeholder:text-[#49243e86] placeholder:font-light w-full h-full bg-transparent font-normal text-[20px] focus:outline-none duration-300"
              onChange={(e) => setDeckQuery(e.target.value)}
            />
            <MdSearch
              size={33}
              color="rgba(73, 36, 62, 0.57)"
              className="absolute right-[16px] top-1/2 translate-y-[-50%]"
            />
          </div>
          <center>
            <motion.div
              className="w-[79.8611111111%] relative mt-[30px] grid grid-cols-1 gap-y-[22px]"
              layout
            >
              {decks
                .filter((deck) =>
                  deck.name.toLowerCase().includes(decksQuery.toLowerCase())
                )
                .map((deck: Deck, idx) => (
                  <DeckContainer
                    key={deck.name}
                    deck={deck}
                    rank={idx}
                    onDeleteDeck={handleDelete}
                  />
                ))}
            </motion.div>
          </center>
        </>
      )}
    </main>
  );
};
export default PracticePage;
