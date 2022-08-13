import type { NextPage } from "next";

const About: NextPage = () => {
  return (
    <>
      <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
      </div>
      <section>
  <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8 sm:py-24">
    <div className="max-w-3xl">
      <h2 className="text-3xl font-bold sm:text-4xl">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quod alias
        doloribus impedit.
      </h2>
    </div>

    <div className="grid grid-cols-1 gap-8 mt-8 lg:gap-16 lg:grid-cols-2">
      <div className="relative h-64 overflow-hidden sm:h-80 lg:h-full">
        <img
          className="absolute inset-0 object-cover w-full h-full"
          src="https://www.hyperui.dev/photos/man-1.jpeg"
          alt="Man using a computer"
        />
      </div>

      <div className="lg:py-16">
        <article className="space-y-4 text-gray-600">
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut qui
            hic atque tenetur quis eius quos ea neque sunt, accusantium soluta
            minus veniam tempora deserunt? Molestiae eius quidem quam repellat.
          </p>

          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum
            explicabo quidem voluptatum voluptas illo accusantium ipsam quis,
            vel mollitia? Vel provident culpa dignissimos possimus, perferendis
            consectetur odit accusantium dolorem amet voluptates aliquid,
            ducimus tempore incidunt quas. Veritatis molestias tempora
            distinctio voluptates sint! Itaque quasi corrupti, sequi quo odit
            illum impedit!
          </p>
        </article>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default About;