import type { MetaFunction } from "@remix-run/node";
import profile from "./../static/profile.jpg"
import { EllipsisHorizontalIcon } from "@heroicons/react/24/outline";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  var popupIsOpened = false

  const togglePopup = () => {
    popupIsOpened = !popupIsOpened
    document.getElementById("ctaText")?.classList.add("hidden")
    document.getElementById("ctaButton")?.classList.add("opacity-70")
    document.getElementById("loadingIcon")?.classList.remove("hidden")
  }

  return (
    <div className="p-12 md:p-24 flex flex-col gap-12 md:gap-24">
      <div className="flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-h-80 md:w-auto rounded-full" src={profile} />
        <div className="flex flex-col gap-6">
          <h1 className="md:hidden text-5xl font-serif font-bold leading-tight">Hey &#128075;, <br />soy <span className="text-blue-600">Diego Hernández</span></h1>
          <h1 className="hidden md:block text-6xl font-serif font-bold leading-tight">Hey &#128075;, soy <span className="text-blue-600">Diego Hernández</span></h1>
          <p className="text-xl md:text-2xl font-monospace text-justify">Tengo 19 años, fundé el blog <a href="https://farodefe.org" target="_blank" className="underline hover:decoration-dotted decoration-orange-400 decoration-4">Faro de Fe</a> y quiero ir a <a href="https://seek.focus.org" target="_blank" className="font-bold underline decoration-yellow-400 decoration-4 hover:decoration-dotted">SEEK 24</a>: la mayor conferencia de universitarios católicos en Estados Unidos.</p>
          <p className="text-xl font-monospace">¿Me ayudarías a vivirlo?</p>
          <button id="ctaButton" onClick={togglePopup} className="rounded-full bg-blue-600 text-white p-3 w-full md:max-w-xs font-serif text-xl transform hover:rotate-2 hover:scale-105 duration-500 flex items-center justify-center"><p id="ctaText">Donar</p><EllipsisHorizontalIcon id="loadingIcon" className="h-6 w-6 text-white animate-spin hidden" /></button>
          <p className="text-small">¿Necesitas un blog profesional, una tienda en línea o un sitio web como este? ¡También soy desarrollador de código! <a href="" target="" className="underline hover:decoration-dotted decoration-blue-400">Trabajemos juntos.</a></p>
        </div>
      </div>

      <hr />
        <div className="flex flex-col md:flex-row gap-12">
          <h2 className="font-serif text-3xl">¿Qué es SEEK?</h2>
          <ul className="font-monospace text-xl list-disc list-outside">
            <li className="mb-6">Es la mayor conferencia católica para estudiantes universitarios de Estados Unidos, organizada anualmente por <a href="https://focus.org" target="_blank" className="underline hover:decoration-dotted decoration-orange-400 decoration-4">FOCUS</a>.</li>
            <li className="my-6">Dura 5 días y se celebrará del 1-5 de enero del 2024 en St. Louis, Missouri.</li>
            <li className="my-6">La conferencia incluirá misas, adoración, confesiones, charlas de oradores católicos de renombre, entretenimiento, compañerismo y oportunidades para la oración.</li>
            <li className="mt-6">El objetivo es animarnos a los estudiantes en nuestra fe y prepararnos para vivir como discípulos misioneros.</li>
          </ul>
        </div>

    </div>
  );
}
