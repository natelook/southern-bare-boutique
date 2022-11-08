"use client"

import Link from "next/link"
import { FaFacebookF, FaInstagram } from "react-icons/fa"

export default function Footer() {
  return (
    <footer className="bg-dark text-center text-white text-sm py-8 border-t border-light">
      <div className="container mx-auto md:flex items-center justify-between">
        <p>&copy; 2022 Southern Bare Boutique - All Rights Reserved</p>
        <ul className="flex space-x-4 items-center justify-center mt-5 md:mt-0">
          <li>Privacy Policy</li>
          <li>Terms and Conditions</li>
          <li>
            <Link href="https://www.facebook.com/southernbare/" passHref>
              <span>
                <FaFacebookF />
              </span>
            </Link>
          </li>
          <li>
            <Link href="https://www.instagram.com/southernbare/" passHref>
              <span>
                <FaInstagram />
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  )
}
