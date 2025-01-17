import NavBar from "@/components/main/NavBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full snap-y snap-mandatory relative bg-background flex justify-around flex-col bg-zinc-100 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-black">
      <NavBar />
      {children}
    </div>
  );
}
