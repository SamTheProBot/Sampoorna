import Image from "next/image";

export default function Home() {
  return (
    <>
      <section className="w-[100vw]">



        <Image
          src={'/background.jpg'}
          alt='Picture of the background'
          className='w-[100vw] h-[600px] object-cover'
          height={500}
          width={500}
        ></Image>

      </section>
    </>

  );
}
