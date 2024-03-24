import React, { useState, useEffect } from 'react';

interface DecryptStringComponentProps {
    encryptedText: string;
}

export default function AnswerCard({
    encryptedText,
    index,
}: {
    encryptedText: string;
    index: number;
}) {
    const [decryptedText, setDecryptedText] = useState<string[]>([]);
    const [hasFailed, setHasFailed] = useState<boolean>(false);

    // Placeholder for your private key
    const privateKeyPem = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDbUAo6XsWQo6WGnGUs7kkZ49v8Gh33Jk37Lge+Ogb1+DLlVY0Qv6bsbwpzlM1AWujcWKhRSVU0hMf7oHdB4QUFVsoYTNdelbGFvezYQE9LTwS13hB1YK/iR5p7FRcQN6D+D5rdPsgsHiKgb82vNKY4jNGn5w/gvmKUM9S254md7yyqePVvmRxD8FY5vhHMD5iyzhcLkLHGXHyUy47pEZ5d5o6v1YRBoeVJjXXeR1SUZ1K++aQMwM82VC2p4fcamCkorYpX4HHQRc2Vsl7+n7BR+HGayIFNSiwUxzgWsQGLP0V9q8UoX7aU3v7mukI6qqNnFB5pmZ6Hxgns8tRZAQqNAgMBAAECggEAAJavLa0zGz3NrsKj0Vx2bAlxQ7DYYAQuKnXDwfMM65SoXLyDVRfEKg+Wx3SqWC2VzL5TBTP7YT48OzsRIQ4PQ9RborXwgpVPofMvC4DfG222TaFh7oBp8iFkMEAL3Jpq1KsA7se303vw6xfFHqDpxfYkXnR21bPukAMsoVPEo0GVdNxBoZywZWZ3QkW10gkYr2ZdGBmsuD+RVm9dv1xgCX/euF7VZs+TUw3gLW6oe/FsONTwTWqwrLJzmcYHDUmtynJ1+tQuctlSs744IQq+UH8/2kOxtj9C+8OZPcdBjwVFWt93pKI+v2/BhWXj6rQf5Evkp3k2Gwn4FWXHkNPIvwKBgQDyMxbQdLdyp8ofuw7SoY0T5O7ZC+l449wj1P1RAcN2Oc2iJg8DuWw1CWAG2FJ7R+j+g/1CzfBk6Z5LAA/t45dkFR77Wi68nesuFOz6/tGfJssihxKQApARsqnZWbMZHt0A74Im3jUmf65nW4kaorKjaptfgjXWiwb2oKbq9efeQwKBgQDnzxrGU5InWhs99GBMZG3BaHkEvQSnO+wZaY0C6ke731ex0SUmTmEFn4Zttw00mb6L3yYJ+d5q4f6Nz5tszh6JIevVgpvNrJbFu6GyyQPn+oaeAKJI4QyBjGxO0cpeCs9RpKvmQIm2aL0lYLHarCFL6llqazaGot1UIEggx72u7wKBgDqs39kOfabcOV5ojdW/Z5MrQiX4+c3cvec8YUYvvC+3HzcqKzcGw80xgT8HRywwpqSKS1/UzmlUI5Id6L4EBhgr+b6BAZOWWnRmg2bnNtdsqYeq23dh948iDn3mejoavQXOAGT0LkIuao0Fovh98/MdD5kazXo1YjF7iBSiEFNLAoGAK3swlYT1hEYlmABv08R+xemX0ai257uYtMeUuLhDTl09cNA/PKk1D731lDzi0DwKfugTlYl2C+xqOCV6DPW4ypY/S2RdXz4BZgOk+Ak2n1vhxl9uEWeNVfuGEV7Oq8cxTioqSF1Qt5N77zftBIyHDltd/FUx/B0ukOohPWzaCqcCgYEA8fHTRG0pUXrjGbKmiq+4jBN3we2p2E2O3GGFq767xJ+iHj3DrjPCbYfQ04OqDubjocDiOIqcJmgvGNU3rukZbai3Ptjo6e3oPnAMJKSs28ahIPHgO2WWxxypnM1Xls5aNhWW9IdHOw+iOJbXDfvWrfTosTYIexqPR3rzp+546Yk=
-----END PRIVATE KEY-----`;

    const handleDecryptClick = async () => {
        try {
            console.log('Encrypted text:', encryptedText);
            console.log('Private key:', privateKeyPem);

            const privateKey = await pemToPrivateKey(privateKeyPem);
            const encryptedBytes = base64ToArrayBuffer(encryptedText);
            const decrypted: ArrayBuffer = await decryptMessage(
                privateKey,
                encryptedBytes,
            );
            const decryptedString: string = new TextDecoder().decode(decrypted);
            setDecryptedText(decryptedString.split('|'));
        } catch (error) {
            console.error('Decryption failed:', error);
            setHasFailed(true);
        }
    };
    handleDecryptClick();

    return (
        <div className="flex flex-col gap-8 self-stretch rounded-3xl bg-purple-500 p-4  opacity-80 shadow-[20px_20px_20px_0px] shadow-black hover:bg-purple-400">
            <h1 className="text-2xl">Answer {index}</h1>
            <div className="flex flex-col gap-2">
                {hasFailed && <p>Decryption failed</p>}
                {decryptedText.length &&
                    decryptedText.map((text, answerIndex) => (
                        <p key={answerIndex}>{text}</p>
                    ))}
            </div>
        </div>
    );
}

async function pemToPrivateKey(pem: string): Promise<CryptoKey> {
    const pemHeader = '-----BEGIN PRIVATE KEY-----';
    const pemFooter = '-----END PRIVATE KEY-----';
    const pemContents = pem
        .replace(pemHeader, '')
        .replace(pemFooter, '')
        .replace(/\s/g, '');
    const binaryDer = window.atob(pemContents);
    const binaryDerArray = new Uint8Array(binaryDer.length);
    for (let i = 0; i < binaryDer.length; i++) {
        binaryDerArray[i] = binaryDer.charCodeAt(i);
    }
    return await window.crypto.subtle.importKey(
        'pkcs8',
        binaryDerArray.buffer,
        {
            name: 'RSA-OAEP',
            hash: 'SHA-256',
        },
        true,
        ['decrypt'],
    );
}

async function decryptMessage(
    privateKey: CryptoKey,
    ciphertext: ArrayBuffer,
): Promise<ArrayBuffer> {
    return window.crypto.subtle.decrypt(
        {
            name: 'RSA-OAEP',
        },
        privateKey,
        ciphertext,
    );
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
}
