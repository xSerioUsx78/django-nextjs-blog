import Link from "next/link";

const Footer = () => {
  return (
    <footer className="p-3 border-t border-gray-700 bg-gray-900 text-center mt-10 shadow-lg">
      <p className="text-sm">
        Developed by{" "}
        <Link href="https://github.com/xSerioUsx78">
          <span className="font-bold transition duration-200 hover:text-blue-400">
            Morteza Mohammadnasab
          </span>
        </Link>
      </p>
    </footer>
  );
}

export default Footer;
