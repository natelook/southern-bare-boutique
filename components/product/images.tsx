import { Tab } from "@headlessui/react"
import Image from "next/image"
import { useMemo } from "react"
import classNames from "../../lib/classNames"

/* eslint-disable @next/next/no-img-element */

interface Props {
  images?: {
    node: {
      url: string
      id: string
      alt: string
    }
  }[]
  title: string
}

export default function ProductImages({ images, title }: Props) {
  const arrayLength = useMemo(() => (images ? images.length : 0), [images])

  if (!images) return null

  return (
    <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
      <h2 className="sr-only">Images</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8">
        <div className="lg:col-span-2 lg:row-span-2">
          {arrayLength > 1 ? (
            <Tab.Group as="div" className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 w-full max-w-2xl sm:block lg:max-w-none">
                <Tab.List className="grid grid-cols-4 gap-6">
                  {images?.map(({ node }) => (
                    <Tab
                      key={node.id}
                      className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      {({ selected }) => (
                        <>
                          <span className="absolute inset-0 overflow-hidden rounded-md">
                            <img
                              src={node.url}
                              alt={node.alt}
                              className="h-full w-full object-cover object-center"
                            />
                          </span>
                          <span
                            className={classNames(
                              selected ? "ring-indigo-500" : "ring-transparent",
                              "pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2"
                            )}
                            aria-hidden="true"
                          />
                        </>
                      )}
                    </Tab>
                  ))}
                </Tab.List>
              </div>

              <Tab.Panels className="aspect-w-1 aspect-h-1 w-full px-16">
                {images?.map(({ node }) => (
                  <Tab.Panel key={node.id}>
                    <img
                      src={node.url}
                      alt={node.alt}
                      className="h-full w-full object-cover object-center sm:rounded-lg"
                    />
                  </Tab.Panel>
                ))}
              </Tab.Panels>
            </Tab.Group>
          ) : (
            <img src={images[0].node.url} alt={`${title}`} />
          )}
        </div>
      </div>
    </div>
  )
}
