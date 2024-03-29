import Image from "next/image"
import Link from "next/link"
import classNames from "classnames"

interface ProdcutCardProps {
  image: string
  altText?: string
  href: string
  name: string
  price: number
  light?: boolean
}

export default function ProductCard({
  image,
  altText,
  href,
  name,
  price,
  light = false,
}: ProdcutCardProps) {
  return (
    <div className="group relative">
      <div className="w-full min-h-80 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
        {image && (
          <Image
            src={image}
            alt={altText || "no tag"}
            width={280}
            height={320}
          />
        )}
      </div>
      <div className="mt-1 md:mt-4 flex justify-between">
        <div>
          <h3
            className={classNames("text-sm", {
              "text-gray-700": !light,
              "text-white": light,
            })}
          >
            <Link href={`/shop/${href}`} passHref>
              <span>
                <span aria-hidden="true" className="absolute inset-0" />
                {name}
              </span>
            </Link>
          </h3>
        </div>
        <p
          className={classNames("text-sm font-medium ", {
            "text-gray-700": !light,
            "text-white": light,
          })}
        >
          ${Number(price).toFixed(2)}
        </p>
      </div>
    </div>
  )
}
