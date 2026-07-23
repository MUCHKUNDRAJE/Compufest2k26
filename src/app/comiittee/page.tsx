import Image from 'next/image'

function Page() {
  return (
    <div className="relative min-h-screen w-full bg-amber-200">
      <Image
        src="/back.jpg"
        alt="background"
        fill
        className="object-cover"
        priority
      />
      <div>
        <div className="h-screen w-full bg-black absolute top-0  opacity-30">

        </div>

      </div>
    </div>
  )
}

export default Page