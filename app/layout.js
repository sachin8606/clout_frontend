import './globals.css';

export const metadata = {
  title: 'Menu Management',
  description: 'Manage system menus',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex h-screen bg-gray-100">{children}</body>
    </html>
  );
}
