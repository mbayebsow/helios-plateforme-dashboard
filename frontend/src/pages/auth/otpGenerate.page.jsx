import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { otpGenerateFunc, otpVerifyFunc } from "../../components/functions/auth.func";
import { Spin, Typography, Message, Button, Divider } from "@arco-design/web-react";
import { OtpInput } from "reactjs-otp-input";
import UseSession from "../../stores/session.store";

export default function OtpGeneratePage() {
  const [otp, setOtp] = useState();
  const [otpToken, setOtpToken] = useState();
  const [btnLoading, setBtnLoading] = useState();
  const { setSession } = UseSession();

  async function generateOTP() {
    const data = await otpGenerateFunc();
    setOtp(data);
  }

  const verifyOTP = async () => {
    const values = { token: otpToken };
    const generate = await otpVerifyFunc(values);

    if (generate === "error" || !generate) {
      setBtnLoading(false);
      return;
    }

    if (generate.success) {
      Message.success("Authentification a double facture activer avec success");
      setBtnLoading(false);
      setSession();
    }
  };

  useEffect(() => {
    generateOTP();
  }, []);

  return (
    <div style={{}}>
      {otp ? (
        <div>
          <Typography.Paragraph>1 - Installez Google Authenticator ou Authy.</Typography.Paragraph>
          <Typography.Paragraph>
            2 - Sélectionnez "Scanner un code-barres (ou code QR)" et utilisez l'appareil photo du
            téléphone pour scanner ce code-barres.
          </Typography.Paragraph>
          <Typography.Paragraph>SECRET: {otp.otp_base32}</Typography.Paragraph>
          <Divider />
          <div style={{ width: 150, marginLeft: "auto", marginRight: "auto", marginBottom: 20 }}>
            <QRCode
              size={256}
              style={{ height: "auto", width: "100%", marginBlock: "auto" }}
              value={otp.otp_auth_url}
            />
          </div>
          <Divider />

          <OtpInput
            isInputNum
            inputStyle="arco-input arco-input-size-large OtpInput"
            containerStyle={{ marginBottom: 20, gap: 10 }}
            value={otpToken}
            onChange={setOtpToken}
            numInputs={6}
          />
          <Button
            long
            disabled={otpToken?.length === 6 ? false : true}
            loading={btnLoading}
            type="primary"
            onClick={() => {
              setBtnLoading(true);
              verifyOTP();
            }}
          >
            Verifier & Activer
          </Button>
        </div>
      ) : (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spin tip="Generation du code QR" loading />
        </div>
      )}
    </div>
  );
}
