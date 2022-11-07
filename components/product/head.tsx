interface ProductHeadProps {
  price: number
  title: string
}

export default function ProductHead({ price, title }: ProductHeadProps) {
  return (
    <div className="lg:col-start-8 lg:col-span-5">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-xl font-medium text-gray-900">
          ${Number(price).toFixed(2)}
        </p>
      </div>
    </div>
  )
}
