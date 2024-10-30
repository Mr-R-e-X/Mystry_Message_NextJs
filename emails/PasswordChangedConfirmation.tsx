import {
  Html,
  Head,
  Font,
  Preview,
  Section,
  Row,
  Heading,
  Text,
  Button,
} from "@react-email/components";

interface ResetPsswordProps {
  username: string;
  email: string;
}

export default function PasswordChangedConfirmation({
  username,
  email,
}: ResetPsswordProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Reset Password</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Section>
        <Row>
          <Heading className="text-[24px] font-semibold leading-[32px] text-indigo-400">
            Hello {username},
          </Heading>
        </Row>
        <Row>
          <Text className="text-[16px] leading-[24px]">
            Your password has been successfully changed. To log in, please use
            the following button.
          </Text>
        </Row>
        <Row>
          <Button
            href={`${process.env.DOMAIN}/sign-in}`}
            className="text-[16px] leading-[24px] bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          >
            Visit Mstry Message
          </Button>
        </Row>
      </Section>
    </Html>
  );
}
