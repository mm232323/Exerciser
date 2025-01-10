import VocabForm from "@/components/forms/vocab";
import React from "react";
import { getUser } from "../../../../actions/main";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const CreateVocabPage: React.FC = async () => {
  const session = await getServerSession();
  if (!session) redirect("/login");
  const user = await getUser(session?.user?.email as string);
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <VocabForm decks={user.decks} />
    </div>
  );
};
export default CreateVocabPage;
