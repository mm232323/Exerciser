import VocabForm from "@/components/forms/vocab";
import React from "react";
import { getUser } from "../../../../actions/main";
import { getServerSession } from "next-auth";

const CreateVocabPage: React.FC = async () => {
  const session = await getServerSession();
  const user = await getUser(session?.user?.email as string);
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <VocabForm decks={user.decks} />
    </div>
  );
};
export default CreateVocabPage;
