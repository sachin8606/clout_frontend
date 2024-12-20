import prisma from '@/lib/prisma';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    const menu = await prisma.menu.findUnique({ where: { id: Number(id) } });
    res.status(200).json(menu);
  } else if (req.method === 'PUT') {
    const updatedMenu = await prisma.menu.update({
      where: { id: Number(id) },
      data: req.body,
    });
    res.status(200).json(updatedMenu);
  } else if (req.method === 'DELETE') {
    await prisma.menu.delete({ where: { id: Number(id) } });
    res.status(204).end();
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
