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
  email: string;
  username: string;
  hashedToken: string;
}

export default function ResetPasswordEmail({
  email,
  username,
  hashedToken,
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
            We received a request to reset your password. To complete this
            process, please click the button below.
          </Text>
        </Row>
        <Row>
          <Button
            href={`http://localhost:3000/reset-password?token=${hashedToken}`}
            className="text-[16px] leading-[24px] bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
          >
            Reset Password
          </Button>
        </Row>
        <Row>
          <Text className="text-[16px] leading-[24px] mt-4">
            If you didn&apos;t request a password reset, please ignore this
            email.
          </Text>
        </Row>
      </Section>
    </Html>
  );
}
