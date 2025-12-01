import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface contact {
  id?: number;
  name: string;
  email: string;
  phone: string;
  group: string;
  address: string;
}

export const ContactRoutes = {
  "/api/Contact": {
    async GET(req: Request) {
      try {
        const contactData = await prisma.contact.findMany();
        return new Response(JSON.stringify(contactData), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.log("GET method error", error);
        return new Response(JSON.stringify({ error: "GET method error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async POST(req: Request) {
      try {
        const body = (await req.json()) as contact;
        if (!body) return new Response("Data not adding", { status: 400 });
        const contactData = await prisma.contact.create({
          data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
            group: body.group,
            address: body.address,
          },
        });
        return new Response(JSON.stringify(contactData), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.log("POST method error", error);
        return new Response(JSON.stringify({ error: "POST method error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    },
  },

  "/api/Contact/:id": {
    async PUT(req: Request) {
      try {
        const id = req.url.split("/").pop();
        const body = (await req.json()) as contact;
        const contactData = await prisma.contact.update({
          where: { id: Number(id) },
          data: {
            name: body.name,
            email: body.email,
            phone: body.phone,
            group: body.group,
            address: body.address,
          },
        });
        return new Response(JSON.stringify(contactData), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.log("PUT method error", error);
        return new Response(JSON.stringify({ error: "PUT method error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    },

    async DELETE(req: Request) {
      try {
        const id = req.url.split("/").pop();
        const contactData = await prisma.contact.delete({
          where: { id: Number(id) },
        });
        return new Response(JSON.stringify(contactData), {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.log("DELETE method error", error);
        return new Response(JSON.stringify({ error: "DELETE method error" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }
    },
  },
};
