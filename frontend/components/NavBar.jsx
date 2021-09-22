import Link from 'next/link';
import { useRouter } from 'next/router';


const NavBar = () => {

  const router = useRouter();

  return (
    <nav className="w-100 p-4 bg-gray-900 shadow-lg border-b border-gray-700">
      <div className="container mx-auto">
        <div className="flex items-center">
          <h1 className="text-xl">
            <Link href="/">
              <a className="text-blue-400 font-bold uppercase">Simple next js blog</a>
            </Link>
          </h1>
          <div className="flex items-center ml-9">
            <Link href="/">
              <a className={
              `hover:text-blue-400
              text-sm
              font-bold px-3 
              transition 
              duration-200
              uppercase
              ${router.pathname === "/" ? "text-blue-400" : "text-gray-400"}`}>
                Home
              </a>
            </Link>
            <Link href="/about">
              <a className={
              `hover:text-blue-400 
              text-sm
              font-bold px-3 
              transition 
              duration-200
              uppercase
              ${router.pathname === "/about" ? "text-blue-400" : "text-gray-400"}`}>About</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
 
export default NavBar;