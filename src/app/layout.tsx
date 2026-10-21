import type { Metadata, Viewport } from "next";
import { Poppins, Inter, Epilogue } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const poppins = Poppins({
  weight: ["600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

const epilogue = Epilogue({
  weight: ["600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-epilogue",
  display: "swap",
});

const inter = Inter({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dapur Lebaran - Pencatatan Usaha Kue",
  description: "Aplikasi internal pencatatan dan operasional usaha kue lebaran",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Dapur Lebaran",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1F6F50",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${poppins.variable} ${inter.variable} ${epilogue.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FBF6EC] text-[#3B2A1E] font-sans antialiased selection:bg-[#1F6F50] selection:text-white">
        {children}
        <Toaster
          position="top-center"
          richColors
          toastOptions={{
            style: {
              borderRadius: "12px",
              fontFamily: "var(--font-inter), sans-serif",
            },
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  var isLocalhost = Boolean(
                    window.location.hostname === 'localhost' ||
                    window.location.hostname === '[::1]' ||
                    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
                  );

                  if (isLocalhost) {
                    // On localhost, unregister any active service worker and clear cache to prevent stale layout
                    navigator.serviceWorker.getRegistrations().then(function(registrations) {
                      for (var i = 0; i < registrations.length; i++) {
                        registrations[i].unregister();
                      }
                    });
                    if ('caches' in window) {
                      caches.keys().then(function(names) {
                        for (var i = 0; i < names.length; i++) {
                          caches.delete(names[i]);
                        }
                      });
                    }
                  } else {
                    navigator.serviceWorker.register('/sw.js');
                  }
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
