import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const menus = await prisma.menu.findMany();
    res.status(200).json(menus);
  } else if (req.method === 'POST') {
    const menu = await prisma.menu.create({ data: req.body });
    res.status(201).json(menu);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
