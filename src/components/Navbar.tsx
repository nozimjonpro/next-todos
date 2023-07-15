import Link from "next/link";

export default function Navbar() {
  return (
    <div>
      <ul className="flex gap-x-4 items-center">
        <li>
          <Link href={"/post"}>Posts</Link>
        </li>
        <li>
          <Link href={"/about"}>About</Link>
        </li>
        <li>
          <Link href={"post/listOfPosts"}>Posts List</Link>
        </li>
      </ul>
    </div>
  );
}
