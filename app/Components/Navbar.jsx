"use client";

import React, { useState } from "react";
import styles from "./navbar.module.css";
import { LuShoppingCart } from "react-icons/lu";
import { MdOutlineClose } from "react-icons/md";
import { PiPizza } from "react-icons/pi";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { GoHomeFill } from "react-icons/go";
import { FiMenu } from "react-icons/fi";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const { cartCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      {/* Logo */}
      <Link href="/" className={styles.logo} onClick={closeMobileMenu}>
        <span>براديز</span>
        <PiPizza className={styles.logoIcon} />
      </Link>

      {/* Desktop Links */}
      <ul className={styles.links}>
        <li>
          <Link href="/" className={pathname === "/" ? styles.active : ""}>
            الرئيسية
          </Link>
        </li>
        <li>
          <Link
            href="/menu"
            className={pathname.startsWith("/menu") ? styles.active : ""}
          >
            المنيو
          </Link>
        </li>
        <li>
          <Link href="#about">من نحن</Link>
        </li>
        <li>
          <Link href="#contact">تواصل معنا</Link>
        </li>
      </ul>

      {/* Mobile Menu */}
      <div
        className={`${styles.mobileMenu} ${
          mobileMenuOpen ? styles.mobileMenuOpen : ""
        }`}
      >
        <ul className={styles.mobileLinks}>
          <li>
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={pathname === "/" ? styles.active : ""}
            >
              الرئيسية
            </Link>
          </li>
          <li>
            <Link
              href="/menu"
              onClick={closeMobileMenu}
              className={pathname.startsWith("/menu") ? styles.active : ""}
            >
              المنيو
            </Link>
          </li>
          <li>
            <Link href="#about" onClick={closeMobileMenu}>
              من نحن
            </Link>
          </li>
          <li>
            <Link href="#contact" onClick={closeMobileMenu}>
              تواصل معنا
            </Link>
          </li>
        </ul>
      </div>

      {/* Overlay */}
      {mobileMenuOpen && (
        <div className={styles.overlay} onClick={closeMobileMenu}></div>
      )}

      {/* Icons */}
      <div className={styles.icons}>
        {/* Cart */}
        <Link
          href="/cart"
          className={`${styles.cartLink} ${
            pathname === "/cart" ? styles.active : ""
          }`}
          onClick={closeMobileMenu}
        >
          <LuShoppingCart className={styles.icon} size={30} />
          {cartCount > 0 && (
            <span className={styles.badge}>{cartCount}</span>
          )}
        </Link>

        {/* Home */}
        <div className={styles.homeBtn}>
          <Link
            href="/"
            className={`${styles.cartLink} ${
              pathname === "/" ? styles.active : ""
            }`}
            onClick={closeMobileMenu}
          >
            <GoHomeFill  className={styles.icon} size={30} />
          </Link>
        </div>

        {/* Mobile Toggle */}
        <div className={styles.menuBtn} onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <MdOutlineClose className={styles.icon} size={30} />
          ) : (
            <FiMenu className={styles.icon} size={30} />
          )}
        </div>
      </div>
    </nav>
  );
}
