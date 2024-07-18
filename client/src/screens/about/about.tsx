import styled, { keyframes } from "styled-components";

export const AboutScreen = () => {
  return (
    <AboutContainer>
      <h1>About Reclaim</h1>
      <AnimatedText>
        <p>
          TLS is a widely used security protocol that allows a user and server
          to privately and securely communicate. However, the data that users
          receive through this protocol is not typically signed by the server,
          and so the user cannot prove where the data came from to any
          third-party. In recent years there have been various proposals for
          solving this problem without the need for any server-side modification
          or permission. In this whitepaper we describe the Reclaim protocol,
          which allows for computationally efficient, secure and private
          generation of proofs of provenance (PoP) completely on client side
          that users can then share to any third-party. Furthermore, users can
          generate zero-knowledge proofs of features of their data to avoid
          sharing sensitive information. We also describe a decentralized
          extension of the protocol that eliminates the need to use any trusted
          parties, by implementing an economic mechanism to incentivize honest
          behavior. Transport Layer Security (TLS) version 1.3 is a standard
          security protocol that is used for secure communication in a wide
          range of networking applica- tions, most notably in HTTPS [9]. When a
          user and a website begin the protocol, they engage in a handshake that
          results in them generating a shared symmetric key, which then allows
          them to send encrypted data. In many online applications, websites
          send data to be displayed on the user’s browser that contains
          information about the user’s identity, such as their cre- dentials,
          property, and online account ownership. For example, the data sent by
          a banking website would include the user’s account balance. Suppose
          the user wants to use this data to prove some information about
          themselves to a third- party. There are two issues that make this
          difficult that the Reclaim protocol aims to resolve. The first is that
          it is not currently standard for websites to digitally sign the data
          that they send, so a user may not be able to prove that their data was
          actually sent by the website. In other words, the user is unable to
          prove the provenance of the data, and we call such a proof a proof of
          provenance (PoP). Secondly, the user may only want to share a subset
          of the information in their data, or some coarser information derived
          from their data. For example, suppose a user wants to demonstrate that
          they are at least 18 years old but not reveal their exact age. We call
          this restricted sharing of information a selective reveal. In recent
          years there have been several proposed solutions to generated PoPs.
          These solutions involve in different ways an intermediary who
          interacts with the user and website during the TLS session, in a
          protocol that preserves the data privacy but allows the intermediary
          to verify the provenance of the data. The protocols use different
          names for these intermediaries, we will be using calling them all
          attestors for simplicity. The DECO protocol [15] (short for
          ’decentral- ized oracle’) has the party that the user is trying to
          prove the provenance of their data to act as the attestor. Town Crier
          [14] uses a trusted execution environment (TEE) such as Intel SGX [3]
          to act as the attestor, which allows users to prove the provenance
          their data to any third-party. Unfortunately there are known security
          concerns with the TEEs that are currently available [11, 12], however
          these may be resolved as the technology further develops. Another
          proposal is TLSNotary [1], which uses a trusted ’notary’ as the
          attestor.
        </p>
      </AnimatedText>
    </AboutContainer>
  );
};

const textFlow = keyframes`
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
`;

export const AboutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;

  h1 {
    font-size: 2rem;
    margin: 2rem 0;
  }
`;

export const AnimatedText = styled.div`
  overflow: hidden;
  height: 100vh;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.5);

  p {
    font-size: 1.5rem;
    line-height: 1.5;
    font-weight: 100;
    animation: ${textFlow} 10s linear infinite;
  }
`;
