'use client';

import Script from 'next/script';

export default function LiffProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script 
        src="https://static.line-scdn.net/liff/edge/2/sdk.js" 
        onLoad={() => {
          // @ts-ignore
          if (window.liff) {
            // @ts-ignore
            window.liff.init({ liffId: '2010251224-ecBZ1NJR' }).then(() => {
              console.log('LIFF 初始化成功！');
            }).catch((err: any) => {
              console.error('LIFF 初始化失敗', err);
            });
          }
        }} 
      />
      {children}
    </>
  );
}