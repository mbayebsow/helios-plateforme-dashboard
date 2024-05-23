import { useEffect, useState } from "react";
import { otpValidateFunc } from "../../components/functions/auth.func";
import { Message, Typography, Divider, Spin } from "@arco-design/web-react";
import { OtpInput } from "reactjs-otp-input";
import UseSession from "../../stores/session.store";

export default function OtpValidetePage() {
  const [validateLoading, setValidateLoading] = useState(false);
  const [otpToken, setOtpToken] = useState();
  const { setSession } = UseSession();

  const validateOTP = async () => {
    setValidateLoading(true);
    const values = { token: otpToken };
    const validate = await otpValidateFunc(values);

    if (!validate || validate === "error") {
      setValidateLoading(false);
      return;
    }
    if (validate.success) {
      Message.success("Authentification reussi");
      setValidateLoading(false);
      setSession();
    }
  };

  useEffect(() => {
    if (otpToken?.length === 6) validateOTP();
  }, [otpToken]);

  return (
    <div>
      <Typography.Title heading={6}>Authentification à deux facteurs</Typography.Title>
      <Typography.Paragraph>Ouvrez l'application de vérification en deux étapes sur votre appareil mobile pour obtenir votre code de vérification.</Typography.Paragraph>

      <Divider />

      <OtpInput isInputNum inputStyle="arco-input arco-input-size-large OtpInput" containerStyle={{ marginBottom: 20, gap: 10 }} value={otpToken} onChange={setOtpToken} numInputs={6} />
      {validateLoading ? <Spin loading style={{ marginInline: "auto" }} /> : null}
    </div>
  );
}
