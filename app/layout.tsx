
import Header from "@/components/Header";
import SideNav from "@/components/SideNav";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Attendance Register",
  description: "This is an online attendance register.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return ( 
      <html lang='en'>
        <body className={inter.className}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            enableSystem
            disableTransitionOnChange>
            <div>
              <div className='fixed hidden sm:block sm:w-[120px] md:w-[200px]'>
                <SideNav />
              </div>
              <div className='sm:ml-[120px] md:ml-[200px]'>
                <Header />
                {children}
              </div>
              <Toaster />
            </div>
          </ThemeProvider>
        </body>
      </html>
  
  );
}
