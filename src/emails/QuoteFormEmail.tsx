import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Tailwind,
} from "@react-email/components";
import * as React from "react";

interface QuoteFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  projectType: string;
  timing: string;
  message?: string;
}

export const QuoteFormEmail = ({
  firstName,
  lastName,
  email,
  phone,
  projectType,
  timing,
  message,
}: QuoteFormEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>
        Új árajánlatkérés: {lastName} {firstName}
      </Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>Terra Forte Bau</strong> - Árajánlatkérés
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Szia József / Attila!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Új potenciális ügyfél kért árajánlatot a weboldalon keresztül.
            </Text>

            <Section className="bg-[#f2fbf5] p-4 rounded-md my-4">
              <Text className="text-black text-[14px] m-0 font-bold uppercase tracking-wider mb-2 text-green-800">
                Kapcsolattartó
              </Text>
              <Text className="text-black text-[14px] m-0">
                <strong>Név:</strong> {lastName} {firstName}
              </Text>
              <Text className="text-black text-[14px] m-0 mt-1">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-black text-[14px] m-0 mt-1">
                <strong>Telefon:</strong> {phone}
              </Text>
            </Section>

            <Section className="bg-gray-50 p-4 rounded-md my-4 border border-gray-100">
              <Text className="text-black text-[14px] m-0 font-bold uppercase tracking-wider mb-2 text-indigo-800">
                Projekt Információk
              </Text>
              <Text className="text-black text-[14px] m-0">
                <strong>Típus:</strong> {projectType}
              </Text>
              <Text className="text-black text-[14px] m-0 mt-1">
                <strong>Időzítés:</strong> {timing}
              </Text>
            </Section>

            {message && (
              <>
                <Hr className="border border-solid border-[#eaeaea] my-[20px] mx-0 w-full" />
                <Text className="text-[#666666] text-[12px] mb-2 font-bold uppercase">
                  Megjegyzés:
                </Text>
                <Text className="text-black text-[14px] leading-[24px]">
                  {message}
                </Text>
              </>
            )}
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default QuoteFormEmail;
