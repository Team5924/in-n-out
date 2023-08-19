import { useState } from "react";
import { useZxing } from "react-zxing";

export default function BarcodeScanner({
  onResult,
}: {
  onResult: (schoolId: number) => void;
}) {
  const [isPaused, setIsPaused] = useState(false);
  const { ref } = useZxing({
    onDecodeResult: (result) => onResult(parseInt(result.getText(), 10)),
    paused: isPaused,
  });

  return <video ref={ref} width={640} height={480} className="mx-6" />;
}
