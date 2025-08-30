// If I this to be in the client side I would type 'use client' And so will all its dependents; Delete

import Image from "next/image";
import Link from 'next/link';
import ProductCard from "./components/ProductCard";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  const session = await getServerSession(authOptions); // This is just to test if it works in a server component
  return (
    <main>
      <h1>Hello {session && <span>session.user!.name </span>}</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
    </main>
  )
}
