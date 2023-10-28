import Sidebar from "@/components/Sidebar";
import ModalProvider from "@/providers/ModalProvider";
import SupabaseProvider from "@/providers/SupabaseProvider";
import ToasterProvider from "@/providers/ToasterProvider";
import UserProvider from "@/providers/UserProvider";
import getSongsByUserId from "@/songs/getSongsByUserId";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";

const font = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Spotify for Habesha",
  description: "Listen to Best Habeshan Musics",
};
export const revalidate = 0;
export default async function  RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userSongs = await getSongsByUserId();
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider />
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider />
          <Sidebar songs={userSongs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
