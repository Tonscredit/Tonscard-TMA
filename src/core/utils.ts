
import { toUserFriendlyAddress  } from  "@tonconnect/ui-react";
export function toNoBounceAddress(rawAddress: string): string {
    return toUserFriendlyAddress(rawAddress, false);
  }

export function formatTime  (totalSeconds: number)  {
    const minutes = Math.floor(totalSeconds / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

function sleep (ms:number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}
export {
    sleep
}