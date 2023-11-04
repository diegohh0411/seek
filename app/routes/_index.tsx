import type { MetaFunction } from "@remix-run/node";
import profile from "./../static/profile.jpg"
import { CreditCardIcon, XMarkIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react'

export const meta: MetaFunction = () => {
  return [
    { title: "Diego Hernández" },
    { name: "description", content: "Aquí, Diego Hernández está recibiendo donaciones para ir a SEEK 24." },
  ];
};

export default function Index() {
  const context:boolean|Function[]  = useOutletContext()
  const isTheModalOpen:boolean = context[0]
  const setModal:Function = context[1]

  const [copiedBank, setCopiedBank] = useState(false)
  const copyBankToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedBank(true)
    } catch (err) {
      setCopiedBank(false)
    }
  }
  const [copiedClabe, setCopiedClabe] = useState(false)
  const copyClabeToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedClabe(true)
    } catch (err) {
      setCopiedClabe(false)
    }
  }

  return (
    <div className={`p-12 md:p-24 flex flex-col gap-12 md:gap-24`}>
      <div id="popup" onClick={() => setModal(false)} className={`${isTheModalOpen? "opacity-100 z-10" : "opacity-0 -z-10"}  
                                transform ease-in-out duration-200
                                fixed inset-0 bg-black/30 backdrop-blur-sm
                                flex flex-col items-center justify-center
                                p-12 gap-12`}>
        <XMarkIcon onClick={() => setModal(false)} className={`w-6 h-6 text-black absolute top-6 right-6 cursor-pointer z-20`} />
        <div onClick={(e) => e.stopPropagation()} className={`md:hidden 
                        bg-white fixed inset-0
                          ${isTheModalOpen? "opacity-100" : "opacity-0"}
                          transform ease-in-out duration-200
                          flex flex-col p-12 md:p-24 gap-3 md:gap-3`}>

          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-serif ">SPEI</h1>
            <CreditCardIcon className="w-6 h-6"/>
          </div>
          <p className="text-xl">Puedes depositarme a mi cuenta personal. En la descripción, pon tu nombre y el texto 'SEEK' para reconocerte :)</p>
          <ul className="list-disc list-inside">
            <li className="my-3"><span className="font-bold">Banco:</span> Sistema de Transferencias y Pagos (STP)</li>
            <p className={`text-xs underline ${copiedBank?"decoration-orange-400":"decoration-blue-400"} active:decoration-wavy decoration-2 cursor-pointer`} onClick={() => copyBankToClipboard("Sistema de Transferencias y Pagos (STP)")}>{copiedBank?"¡Ya copiaste el banco!":"Haz clic aquí para copiar el banco"}</p>
            <li className="my-3"><span className="font-bold">CLABE:</span> 646 731 2586 1108 4893</li>
            <p className={`text-xs underline ${copiedClabe?"decoration-orange-400":"decoration-blue-400"} active:decoration-wavy decoration-2 cursor-pointer`} onClick={() => copyClabeToClipboard("646731258611084893")}>{copiedClabe?"¡Ya copiaste la clabe!":"Haz clic aquí para copiar la clabe"}</p>
          </ul>
          <hr />
          <div className="flex items-center mt-6 gap-6">
            <h1 className="text-3xl font-serif ">Mercado Pago</h1>
            <ShoppingBagIcon className="w-6 h-6"/>
          </div>
          <p>Si preferirías donar con tarjeta de débito o crédito directamente, puedes hacerlo a través de <a className="underline decoration-blue-400 decoration-2" href="https://link.mercadopago.com.mx/diegohh">Mercado Pago</a>.</p>
        </div> 

        <div onClick={(e) => e.stopPropagation()} className={`hidden
                        bg-white w-2/3 rounded-lg
                          ${isTheModalOpen? "opacity-100" : "opacity-0"}
                          transform ease-in-out duration-200
                          md:flex md:flex-col p-12 gap-3`}>

          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-serif ">SPEI</h1>
            <CreditCardIcon className="w-6 h-6"/>
          </div>
          <p className="text-xl">Puedes depositarme a mi cuenta personal. En la descripción, pon tu nombre y el texto 'SEEK' para reconocerte :)</p>
          <ul className="list-disc list-inside">
            <li className="my-3"><span className="font-bold">Banco:</span> Sistema de Transferencias y Pagos (STP)</li>
            <p className={`text-xs underline ${copiedBank?"decoration-orange-400":"decoration-blue-400"} active:decoration-wavy decoration-2 cursor-pointer`} onClick={() => copyBankToClipboard("Sistema de Transferencias y Pagos (STP)")}>{copiedBank?"¡Ya copiaste el banco!":"Haz clic aquí para copiar el banco"}</p>
            <li className="my-3"><span className="font-bold">CLABE:</span> 646 731 2586 1108 4893</li>
            <p className={`text-xs underline ${copiedClabe?"decoration-orange-400":"decoration-blue-400"} active:decoration-wavy decoration-2 cursor-pointer`} onClick={() => copyClabeToClipboard("646731258611084893")}>{copiedClabe?"¡Ya copiaste la clabe!":"Haz clic aquí para copiar la clabe"}</p>
          </ul>
          <hr />
          <div className="flex items-center mt-6 gap-6">
            <h1 className="text-3xl font-serif ">Mercado Pago</h1>
            <ShoppingBagIcon className="w-6 h-6"/>
          </div>
          <p>Si preferirías donar con tarjeta de débito o crédito directamente, puedes hacerlo a través de <a className="underline decoration-blue-400 decoration-2" href="https://link.mercadopago.com.mx/diegohh">Mercado Pago</a>.</p>
        </div>  
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-h-80 md:w-auto rounded-full" src={profile} />
        <div className="flex flex-col gap-6">
          <h1 className="md:hidden text-5xl font-serif font-bold leading-tight">Hey &#128075;, <br />soy <span className="text-blue-600">Diego Hernández</span></h1>
          <h1 className="hidden md:block text-6xl font-serif font-bold leading-tight">Hey &#128075;, soy <span className="text-blue-600">Diego Hernández</span></h1>
          <p className="text-xl md:text-2xl text-justify">Tengo 19 años, fundé el blog de apologética <a href="https://farodefe.org" target="_blank" className="underline active:decoration-wavy decoration-orange-400 decoration-4">Faro de Fe</a> y quiero ir a <a href="https://seek.focus.org" target="_blank" className="font-bold underline decoration-yellow-400 decoration-4 active:decoration-wavy">SEEK 24</a>: la mayor conferencia para universitarios católicos en Estados Unidos.</p>
          <p className="text-xl md:text-2xl">¿Me ayudarías a vivirlo?</p>
          <button id="ctaButton" onClick={() => setModal(true)} className={`rounded-full bg-blue-600 text-white p-3 w-full md:max-w-xs font-serif text-xl transform hover:rotate-2 hover:scale-105 duration-200 flex items-center justify-center`}><p>Donar</p></button>
          <p className="text-small">¿Necesitas un blog profesional, una tienda en línea o un sitio web como este? ¡También soy desarrollador de código! <a href="https://wa.me/528131266343" target="_blank" className="underline active:decoration-wavy decoration-blue-400">Trabajemos juntos.</a></p>
        </div>
      </div>

      <hr />
        <div className="flex flex-col md:flex-row gap-12">
          <h2 className="font-serif text-3xl">¿Qué es SEEK?</h2>
          <ul className="text-xl list-disc list-outside">
            <li className="mb-6">Es la mayor conferencia católica para estudiantes universitarios de Estados Unidos, organizada anualmente por <a href="https://focus.org" target="_blank" className="underline active:decoration-wavy decoration-orange-400 decoration-4">FOCUS</a>.</li>
            <li className="my-6">Dura 5 días y se celebrará del 1-5 de enero del 2024 en St. Louis, Missouri.</li>
            <li className="my-6">La conferencia incluirá misas, adoración, confesiones, charlas de oradores católicos de renombre, entretenimiento, compañerismo y oportunidades para la oración.</li>
            <li className="mt-6">El objetivo es animarnos a los estudiantes en nuestra fe y prepararnos para vivir como discípulos misioneros.</li>
          </ul>
        </div>

    </div>
  );
}
