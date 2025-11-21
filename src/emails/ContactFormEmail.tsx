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

interface ContactFormEmailProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactFormEmail = ({
  firstName,
  lastName,
  email,
  phone,
  message,
}: ContactFormEmailProps) => {
  const previewText = `Új üzenet érkezett: ${firstName} ${lastName}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              <strong>Terra Forte Bau</strong> - Új megkeresés
            </Heading>

            <Text className="text-black text-[14px] leading-[24px]">
              Szia József / Attila!
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              Új érdeklődő töltötte ki a weboldal kapcsolati űrlapját. Itt
              vannak a részletek:
            </Text>

            <Section className="bg-[#f2fbf5] p-4 rounded-md my-4">
              <Text className="text-black text-[14px] m-0">
                <strong>Név:</strong> {lastName} {firstName}
              </Text>
              <Text className="text-black text-[14px] m-0 mt-2">
                <strong>Email:</strong> {email}
              </Text>
              <Text className="text-black text-[14px] m-0 mt-2">
                <strong>Telefon:</strong> {phone}
              </Text>
            </Section>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px] mb-2 font-bold uppercase tracking-wider">
              Üzenet:
            </Text>
            <Text className="text-black text-[14px] leading-[24px] bg-gray-50 p-3 rounded border border-gray-100">
              {message}
            </Text>

            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            <Text className="text-[#666666] text-[12px] leading-[24px]">
              Ez egy automatikus üzenet a terrafortebau.hu weboldalról.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ContactFormEmail;
