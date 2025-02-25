"use client";

import { createContext, useContext, useEffect, useState } from "react";

type EmailTemplate = unknown;

export interface EmailTemplateContextType {
  emailTemplate: EmailTemplate[];
  setEmailTemplate: (emailTemplate: EmailTemplate[]) => void;
}

export const EmailTemplateContext = createContext<EmailTemplateContextType | null>(null);

export const EmailTemplateProvider = ({ children }: { children: React.ReactNode }) => {
  const [emailTemplate, setEmailTemplate] = useState<EmailTemplate[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const template = localStorage.getItem("emailTemplate");
      if (template) {
        setEmailTemplate(JSON.parse(template));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("emailTemplate", JSON.stringify(emailTemplate));
    }
  }, [emailTemplate]);

  return (
    <EmailTemplateContext.Provider value={{ emailTemplate, setEmailTemplate }}>
      {children}
    </EmailTemplateContext.Provider>
  );
};

export const useEmailTemplate = () => {
  const context = useContext(EmailTemplateContext);
  if (!context) {
    throw new Error("useTemplate must be used within a TemplateProvider");
  }
  return context;
};
