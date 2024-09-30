import {
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components'

interface Props {
  otp: string
  username: string
}

const VerificationEmail: React.FC<Props> = ({ username, otp }) => {
  return (
    <Html lang='en' dir='ltr'>
      <Head>
        <title>Verification Code</title>
      </Head>
      <Preview>Here&apos; s your Verification code : {otp}</Preview>
      <Section>
        <Row>
          <Heading as='h2'>Hello {username}</Heading>
        </Row>
        <Row>
          <Text>
            Thank you for Registering. Please use the following verification
            code to complete your registration
          </Text>
        </Row>
        <Row>
          <Text>{otp}</Text>
        </Row>
        <Row>
          If you did not request for verification code , please ignore this
          email
        </Row>
      </Section>
    </Html>
  )
}

export default VerificationEmail
