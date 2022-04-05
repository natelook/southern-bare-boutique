import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBagIcon } from '@heroicons/react/outline';

interface HeaderProps {
  openCart: () => void;
  cartItems: number | null;
}

export default function Header({ openCart, cartItems }: HeaderProps) {
  return (
    <header className='bg-light drop-shadow-lg text-white'>
      <div className='container mx-auto flex items-center justify-between py-2 px-2'>
        <div className='-mb-0.5'>
          <Link href='/'>
            <a>
              <Image
                src='/logo.svg'
                height='39px'
                width='195px'
                alt='Southern Bare Boutique Logo'
              />
            </a>
          </Link>
        </div>
        <ul className='flex items-center space-x-4'>
          <li className='font-bold uppercase'>
            <Link href='/shop'>
              <a>Shop</a>
            </Link>
          </li>
          <li className='block h-6 w-6 relative' onClick={openCart}>
            <ShoppingBagIcon />
            {cartItems !== null && cartItems > 0 && (
              <span className='absolute -top-1 -right-1 bg-blue w-4 h-4 md:h-5 md:w-5 flex items-center justify-center rounded-full md:-top-2 md:-right-3 text-xs'>
                {cartItems}
              </span>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
}
