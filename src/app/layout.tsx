import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className="bg-gray-900 text-white flex justify-center items-center min-h-screen m-0 p-0 overflow-hidden">
        <main className="w-full max-w-[414px] h-screen max-h-[896px] bg-slate-800 relative shadow-2xl flex flex-col overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
} //
