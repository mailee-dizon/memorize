import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <div>
      <h1>Welcome to Memorize!</h1>
      <Link href="LoginPage">Log In</Link>
    </div>
  );
}
