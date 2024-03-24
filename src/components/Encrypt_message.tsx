import React, { useState } from 'react';

interface EncryptStringComponentProps {
  plaintext: string;
}

 export const publicKeyPem = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA21AKOl7FkKOlhpxlLO5J
  GePb/Bod9yZN+y4HvjoG9fgy5VWNEL+m7G8Kc5TNQFro3FioUUlVNITH+6B3QeEF
  BVbKGEzXXpWxhb3s2EBPS08Etd4QdWCv4keaexUXEDeg/g+a3T7ILB4ioG/NrzSm
  OIzRp+cP4L5ilDPUtueJne8sqnj1b5kcQ/BWOb4RzA+Yss4XC5Cxxlx8lMuO6RGe
  XeaOr9WEQaHlSY113kdUlGdSvvmkDMDPNlQtqeH3GpgpKK2KV+Bx0EXNlbJe/p+w
  UfhxmsiBTUosFMc4FrEBiz9FfavFKF+2lN7+5rpCOqqjZxQeaZmeh8YJ7PLUWQEK
  jQIDAQAB
  -----END PUBLIC KEY-----`;

const EncryptStringComponent: React.FC<EncryptStringComponentProps> = ({ plaintext }) => {
  const [encryptedText, setEncryptedText] = useState<string>('');

  // Moved publicKeyPem inside the component for direct access
  const handleEncryptClick = async () => {
    const publicKey = await pemToPublicKey(publicKeyPem);
    console.log("Public key:", publicKey);
    console.log("Plaintext:", plaintext)
    if (!plaintext) {
      setEncryptedText('');
      return;
    }
    try {
      const encrypted: ArrayBuffer = await encryptMessage(publicKey, plaintext);
      const base64Encrypted: string = arrayBufferToBase64(encrypted);
      setEncryptedText(base64Encrypted);
    } catch (error) {
      console.error("Encryption failed:", error);
      setEncryptedText('Encryption error');
    }
  };

  return (
    <div className="text-black">
      <button onClick={handleEncryptClick}>Encrypt</button>
      <div className="text-black">Encrypted Text: {encryptedText}</div>
    </div>
  );
};

export default EncryptStringComponent;

// Helper functions: pemToPublicKey, encryptWithPublicKey, and arrayBufferToBase64
// should be implemented as previously shown.
export async function pemToPublicKey(pem: string): Promise<CryptoKey> {
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pem.replace(pemHeader, "").replace(pemFooter, "").replace(/\s/g, "");
    const binaryDer = window.atob(pemContents);
    const binaryDerArray = new Uint8Array(binaryDer.length).map((_, i) => binaryDer.charCodeAt(i));
    return await window.crypto.subtle.importKey(
        "spki",
        binaryDerArray.buffer,
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        ["encrypt"]
    );
  }
  export async function encryptMessage(publicKey: CryptoKey, message: string): Promise<ArrayBuffer> {
    let encodedMessage = new TextEncoder().encode(message);
    return window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      encodedMessage
    );
  }
export function arrayBufferToBase64(buffer: ArrayBuffer): string {
    let binary = '';
    let bytes = new Uint8Array(buffer);
    let len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  }