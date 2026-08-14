import { VerificationCodeScreen, type VerificationScreenProps } from "./VerifyRegistrationScreen";

export function VerifyResetCodeScreen(props: VerificationScreenProps) {
  return <VerificationCodeScreen {...props} mode="reset" />;
}
