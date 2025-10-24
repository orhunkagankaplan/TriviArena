// app/layout.tsx
import './globals.css';

export const metadata = {
  title: 'Trivi Arena',
  description: 'Quiz App',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
// app/layout.tsx veya src/app/layout.tsx

export const metadata = {
  title: "TriviArena",
  description: "Challenge friends and win!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
