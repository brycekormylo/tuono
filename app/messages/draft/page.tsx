"use client";

import { PatientInfo, usePatientList } from "@/contexts/patient-list";
import SearchButton from "@/app/_components/table/search-button";
import { useState } from "react";
import { useInput } from "@/hooks/use-input";
import ActionButtons from "@/app/_components/editor/action-buttons";
import { useAuth } from "@/contexts/auth";
import { id } from "@instantdb/react";
import {
  useConversations,
  Conversation,
  Message,
} from "@/contexts/conversations";

export default function Draft() {
  const { recipient, setRecipient, setNewMessage } = useConversations();
  const patientSource = usePatientList();
  const { value, onChange } = useInput("");

  const handleReturn = () => {
    // toggleVisible();
  };

  const handleSubmit = () => {
    setNewMessage(value);
  };

  return (
    <div className="w-full h-full min-h-[36rem] stack">
      <div className="flex gap-4 justify-self-start items-center self-start m-8">
        <SearchButton
          source={patientSource}
          itemAction={(element) => setRecipient(element as PatientInfo)}
        />
        {recipient && (
          <p className="text-xl">
            {recipient.lastName}, {recipient.firstName}
          </p>
        )}
      </div>
      <input
        type="text"
        name="title"
        value={value}
        className="justify-self-end self-end mx-8 mb-24 w-96 h-32 rounded-lg rounded-input peer"
        onChange={onChange}
      />
      <div className="justify-self-end self-end m-8 h-16">
        <ActionButtons
          handleReturn={handleReturn}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
