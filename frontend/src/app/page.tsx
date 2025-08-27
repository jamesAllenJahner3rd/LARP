// If I this to be in the client side I would type 'use client' And so will all its dependents; Delete

import Image from "next/image";
import Link from 'next/link';
import ProductCard from "./components/ProductCard";

export default function Home() {
  return(
    <main>
      <h1>Hello World</h1>
      <Link href="/users">Users</Link>
      <ProductCard />
      </main>
  )
}
