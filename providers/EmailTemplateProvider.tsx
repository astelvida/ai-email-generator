"use client";

import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { LayoutConfig, ElementConfig } from "@/lib/types/config.types";
import { useParams } from "next/navigation";

type EmailTemplate = LayoutConfig | ElementConfig;

export interface EmailTemplateContextType {
  emailTemplate: EmailTemplate[];
  setEmailTemplate: Dispatch<SetStateAction<EmailTemplate[]>>;
}

export const EmailTemplateContext = createContext<EmailTemplateContextType | null>(null);

export const EmailTemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate[]>([]);
  const params = useParams();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedEmailTemplate = localStorage.getItem(`emailTemplate-${params.id}`);
      if (storedEmailTemplate) {
        setEmailTemplate(JSON.parse(storedEmailTemplate));
      }
    }
  }, [params.id]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(`emailTemplate-${params.id}`, JSON.stringify(emailTemplate));
    }
  }, [emailTemplate, params.id]);

  return (
    <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
      {children}
    </EmailTemplateContext.Provider>
  );
};

export const useEmailTemplate = () => {
  const context = useContext(EmailTemplateContext);
  if (!context) {
    throw new Error("useEmailTemplate must be used within a EmailTemplateProvider");
  }
  return context;
};
