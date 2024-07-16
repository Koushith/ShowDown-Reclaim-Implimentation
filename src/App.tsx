import { useState } from 'react'
import { Reclaim } from '@reclaimprotocol/js-sdk';
import { QRCode } from 'react-qrcode-logo';
import { JsonView, allExpanded, darkStyles, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';


function App() {

  const [qrCode, setQrCode] = useState<string | null>(null)
  const [proof, setProof] = useState<any>(null)


  const getVerificationReq = async () => {
    const APP_ID = "0xb8C9d07ABe9698A2075e88a205B0dd3BC0AfF9C5";
    const reclaimClient = new Reclaim.ProofRequest(APP_ID);
    const providerIds = [
      '1bba104c-f7e3-4b58-8b42-f8c0346cdeab', // Steam ID
    ];
    await reclaimClient.buildProofRequest(providerIds[0])
    const APP_SECRET = "0x5841f1f00e25052d4577744046758ad8260b35d0c1b915a7b897f5904a884682"  // your app secret key.
    reclaimClient.setSignature(
      await reclaimClient.generateSignature(APP_SECRET)
    )
    const { requestUrl, statusUrl } =
      await reclaimClient.createVerificationRequest()

    console.log('requestUrl', requestUrl)
    console.log('statusUrl', statusUrl)
    setQrCode(requestUrl)
    await reclaimClient.startSession({
      onSuccessCallback: proof => {
        console.log('Verification success', proof)
        // Your business logic here
        setProof(proof)
      },
      onFailureCallback: error => {
        console.error('Verification failed', error)
        // Your business logic here to handle the error
      }
    })
  };


  return (
    <>
      hello

      <button onClick={getVerificationReq}>Get QR Code</button>
      {qrCode && <QRCode value={qrCode} size={256} fgColor="#000000" logoImage="https://reclaim.ai/wp-content/uploads/2021/06/reclaim-logo.png" />}

      {proof && <JsonView data={proof} shouldExpandNode={allExpanded} style={defaultStyles} />}


    </>
  )
}

export default App
