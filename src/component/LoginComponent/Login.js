import React from "react";
import {
  Bgimage,
  Container,
  Content,
  CTA,
  CTALogoOne,
  CTALogoTwo,
  Description,
  SignUp,
} from "./LoginStyles";
import Header from "../HeaderComponent/Header";

function Login() {
  return (
    <div>
      <Header />
      <Container>
        <Content>
          <CTA>
            <CTALogoOne src="/images/cta-logo-one.svg" alt="" />
            <SignUp>GET ALL THERE</SignUp>
            <Description>
              Disney+ is an American subscription video on-demand over-the-top
              streaming media service owned and operated by Disney Streaming,
              the streaming division of Disney Entertainment, a major business
              segment of the Walt Disney Company.
            </Description>
            <CTALogoTwo src="/images/cta-logo-two.png" />
          </CTA>
          <Bgimage />
        </Content>
      </Container>
    </div>
  );
}

export default Login;
