import React from "react";
import { Deck } from "../../../helpers/interfaces";
import { motion } from "framer-motion";
import { MdDelete } from "react-icons/md";
import { redirect } from "next/navigation";
const DeckContainer: React.FC<{
  deck: Deck;
  onDeleteDeck: (deckName: string) => void;
  rank: number;
}> = ({ deck, onDeleteDeck, rank }) => {
  let sentencesCount = 0;
  for (let i = 0; i < deck.cards.length; i++) {
    const sentences = deck.cards[i].sentences
      .split("|")
      .filter((sentence) => sentence.length !== 0);
    sentencesCount += sentences.length;
  }
  return (
    <motion.div
      variants={{
        show: { opacity: 1, y: 0, filter: "blur(0)" },
        hidden: { opacity: 0, y: 20, filter: "blur(10px)" },
      }}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ delay: 0.1 * rank }}
      className="w-full h-[90px] rounded-[10px] text-white flex items-center justify-between p-[25px] cursor-pointer box-shadowing duration-[350ms]"
      style={{ backgroundColor: deck.color }}
      onClick={() => redirect(`/practice/start?deckName=${deck.name}`)}
    >
      <h1 className="font-bold text-[25px]">{deck.name}</h1>
      <div className="flex items-center gap-[10px]">
        <p>Vocabs</p>
        <p>{deck.cards.length}</p>
      </div>
      <div className="flex items-center gap-[10px]">
        <p>sentences</p>
        <p>{sentencesCount}</p>
      </div>
      <div className="flex items-center gap-[10px]">
        <p>language</p>
        <p>{deck.lang}</p>
      </div>
      <MdDelete
        color="white"
        size={25}
        onClick={() => onDeleteDeck(deck.name)}
        className="hover:scale-[1.1] duration-[350ms]"
      />
    </motion.div>
  );
};
export default DeckContainer;
