import { useEffect, useState } from "react";
import { Reclaim } from "@reclaimprotocol/js-sdk";
import { QRCode } from "react-qrcode-logo";
import "react-json-view-lite/dist/index.css";
import { signInWithGoogle } from "./utils";
import { useAudio } from "./hooks/useAudio";
import ThemeSound from "./assets/cod-theme.mp3";
import { AppContainer, Button, SignInPromptContainer } from "./app.styles";
import { UPDATE_USER, USER_REGISTER } from "./utils/constants";
import { useNavigate } from "react-router-dom";
import { useHoverSound } from "./hooks/useHoverSound";
import HoverSound from "./assets/hover.mp3";
import ModalSound from "./assets/modal.mp3";

function App() {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [proof, setProof] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [showSignInPrompt, setShowSignInPrompt] = useState<boolean>(false);

  const [QRClicked, setQRClicked] = useState(false);

  const { isPlaying, togglePlayPause } = useAudio(ThemeSound);
  const playHoverSound = useHoverSound(HoverSound);
  const playModalSound = useHoverSound(ModalSound);
  const navigate = useNavigate();

  const getVerificationReq = async () => {
    if (!user) {
      setShowSignInPrompt(true);
      return;
    }
    setQRClicked(true);
    playModalSound();
    const APP_ID = "0xb8C9d07ABe9698A2075e88a205B0dd3BC0AfF9C5";
    const reclaimClient = new Reclaim.ProofRequest(APP_ID);
    const providerIds = [
      "1bba104c-f7e3-4b58-8b42-f8c0346cdeab", // Steam ID
    ];
    await reclaimClient.buildProofRequest(providerIds[0]);
    const APP_SECRET =
      "0x5841f1f00e25052d4577744046758ad8260b35d0c1b915a7b897f5904a884682"; // your app secret key.
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    );
    const { requestUrl } = await reclaimClient.createVerificationRequest();

    setQrCode(requestUrl);
    await reclaimClient.startSession({
      onSuccessCallback: async (proof) => {
        // Your business logic here

        if (proof) {
          setQRClicked(false);
          //console.log("proof", proof);
          //@ts-ignore

          const parametersString = proof[0].claimData.parameters;
          console.log("steamId", parametersString);
          const parameters = JSON.parse(parametersString);

          const claimData = parameters.paramValues.CLAIM_DATA;
          setProof(JSON.parse(claimData));

          const updateSteamId = await fetch(`${UPDATE_USER}/${user?.email}`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
              steamId: proof,
            }),
          });

          const data = await updateSteamId.json();
          console.log("updateSteamId", data);
        }
      },
      onFailureCallback: (error) => {
        console.error("Verification failed", error);
        // Your business logic here to handle the error
        alert("Verification failed");
      },
    });
  };

  const signinHandler = async () => {
    const user = await signInWithGoogle();
    console.log(user);

    if (user) {
      setShowSignInPrompt(false);
      setUser(user);
      //TODO: update later
      const saveToDb = await fetch(USER_REGISTER, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          uid: user?.uid,
          email: user?.email,
          displayName: user?.displayName,
        }),
      });
      const data = await saveToDb.json();

      console.log("saveToDb", data);
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${UPDATE_USER}/${user?.email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const jsonResponse = await response.json();
      //console.log("jsonResponse", jsonResponse);

      // Parse the steamId field
      const steamIdArray = JSON.parse(jsonResponse.steamId);
      // console.log("steamIdArray", steamIdArray);

      // Access the claimData.parameters and parse it
      const parametersString = steamIdArray[0].claimData.parameters;
      const parameters = JSON.parse(parametersString);
      //console.log("parameters", parameters);

      // Extract CLAIM_DATA
      const claimData = parameters.paramValues.CLAIM_DATA;
      // console.log("claimData", claimData);

      // Set the state with claimData
      setProof(claimData);
    } catch (error) {
      console.error("Error getting user", error);
    }
  };

  console.log("proof", proof);

  useEffect(() => {
    console.log("App mounted");
    getUser();
  }, [user]);

  return (
    <AppContainer>
      {showSignInPrompt && (
        <SignInPromptContainer className="sign-in-prompt">
          <h1>Please sign in first</h1>
          <Button onClick={signinHandler}>Sign In</Button>
        </SignInPromptContainer>
      )}
      <header style={{ display: showSignInPrompt ? "none" : "" }}>
        <div>
          <p>Hello, {user?.displayName ?? <span>Please Sign In</span>}</p>
        </div>
        <div>
          <Button onClick={togglePlayPause}>
            {isPlaying ? "Pause Sound" : "Play Sound"}
          </Button>
        </div>
      </header>
      <div className="menu" style={{ display: showSignInPrompt ? "none" : "" }}>
        <ul style={{ display: QRClicked || showSignInPrompt ? "none" : "" }}>
          <li onMouseEnter={playHoverSound}>
            {" "}
            {proof ? (
              <p>
                {" "}
                Your Steam ID is :{" "}
                <span style={{ color: "#fe820f" }}>{proof}</span>{" "}
              </p>
            ) : (
              <p onClick={getVerificationReq}>Verify Your Steam ID</p>
            )}
          </li>
          <li onMouseEnter={playHoverSound}>
            <p onClick={() => navigate("/about")}>About Reclaim</p>
          </li>
          <li onMouseEnter={playHoverSound}>
            <p
              onClick={() =>
                window.open(
                  "https://showdown.win/campaigns/lucky-raffle",
                  "_next"
                )
              }
            >
              About ShowDown
            </p>
          </li>
          <li onMouseEnter={playHoverSound}>
            <p
              onClick={() =>
                window.open("https://docs.reclaimprotocol.org", "_next")
              }
            >
              Documentation
            </p>
          </li>
        </ul>

        {QRClicked && qrCode && (
          <div className="qr-container">
            <QRCode
              value={qrCode}
              size={256}
              fgColor="#2E2E2E"
              bgColor="#F5F5F5"
              logoImage="https://seeklogo.com/images/C/call-of-duty-black-ops-logo-0F44D8FF9C-seeklogo.com.png"
              logoWidth={64}
              logoHeight={64}
              eyeRadius={[
                { outer: [10, 10, 0, 10], inner: [0, 0, 0, 0] },
                { outer: [10, 10, 10, 0], inner: [0, 0, 0, 0] },
                { outer: [10, 0, 10, 10], inner: [0, 0, 0, 0] },
              ]}
              qrStyle="dots"
              style={{ borderRadius: "10px" }}
            />

            <p>Loading...</p>
          </div>
        )}
      </div>

      <footer>
        <h1>
          <span>Powered By Reclaim Protocol.</span>{" "}
          {proof ? (
            <span>
              | Your Steam Account is Verifed. please wait for the
              announcements!!
            </span>
          ) : (
            <span>
              | Please Verify your Steam Account and wait for the
              announcements!!
            </span>
          )}
        </h1>
      </footer>
    </AppContainer>
  );
}

export default App;
