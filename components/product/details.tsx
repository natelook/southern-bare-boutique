interface Props {
  description: string | undefined
}

export default function ProductDetails({ description }: Props) {
  return (
    <div className="mt-10">
      <h2 className="text-sm font-medium text-gray-900">Description</h2>

      <div
        className="mt-4 prose prose-sm text-gray-500"
        dangerouslySetInnerHTML={{
          __html: description ? description : "<p>No description</p>",
        }}
      />
    </div>
  )
}
