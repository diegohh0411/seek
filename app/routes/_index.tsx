import type { MetaFunction } from "@remix-run/node";
import profile from "./../static/profile.jpg"
import { CreditCardIcon, XMarkIcon, ShoppingBagIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react'

import { config } from "seek.config"

export const meta: MetaFunction = () => {
  return [
    { title: config.name },
    { name: "description", content: `Aquí, ${config.name} está recibiendo donaciones para ir a SEEK 24.` },
  ];
};

export default function Index() {
  const [isTheModalOpen, setModal]:boolean|Function[]  = useOutletContext()
  
  const clabeFormatter = (clabe: string) => {
    return clabe.replace(/(\d{3})(\d{3})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4 $5')
  }

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch (err) {
      return false
    }
  }

  const [copiedBank, setCopiedBank] = useState(false)
  const copyBankToClipboard = async (text: string) => {
    setCopiedBank(await copy(text))
  }
  const [copiedClabe, setCopiedClabe] = useState(false)
  const copyClabeToClipboard = async (text: string) => {
    setCopiedClabe(await copy(text))
  }

  const [isDropOneOpen, setDropOne] = useState(false)
  const [isDropTwoOpen, setDropTwo] = useState(false)
  const [isDropThreeOpen, setDropThree] = useState(false)

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
                          ${isTheModalOpen? "opacity-100 h-screen" : "opacity-0 h-0"}
                          transform ease-in-out duration-200
                          flex flex-col p-12 md:p-24 gap-3 md:gap-3`}>

          <div className="flex items-center gap-6">
            <h1 className="text-3xl font-serif ">SPEI</h1>
            <CreditCardIcon className="w-6 h-6"/>
          </div>
          <p className="text-xl">{config.speiInstructions ? config.speiInstructions : "Puedes depositarme a mi cuenta personal. En la descripción de la transferencia, pon tu nombre y el texto 'SEEK' para poder agradecerte :)"}</p>
          <ul className="list-disc list-inside">
            <li className="my-3"><span className="font-bold">Banco:</span> {config.bank}</li>
            <p className={`text-xs underline ${copiedBank?"decoration-green-400":"decoration-blue-400"} active:decoration-wavy decoration-2 cursor-pointer`} onClick={() => copyBankToClipboard(config.bank)}>{copiedBank?"¡Ya copiaste el banco!":"Haz clic aquí para copiar el banco"}</p>
            <li className="my-3"><span className="font-bold">CLABE:</span> {clabeFormatter(config.clabe)}</li>
            <p className={`text-xs underline ${copiedClabe?"decoration-green-400":"decoration-blue-400"} active:decoration-wavy decoration-2 cursor-pointer`} onClick={() => copyClabeToClipboard(config.clabe)}>{copiedClabe?"¡Ya copiaste la clabe!":"Haz clic aquí para copiar la clabe"}</p>
          </ul>
          { config.nombreDePasarela && config.urlDePasarela ?
              <div className="mt-6">
                <hr />
                <div className="flex items-center mt-6 gap-6">
                  <h1 className="text-3xl font-serif ">{config.nombreDePasarela}</h1>
                  <ShoppingBagIcon className="w-6 h-6"/>
                </div>
                <p>Si preferirías donar con tarjeta de débito o crédito directamente, puedes hacerlo a través de <a href={config.urlDePasarela}>{config.nombreDePasarela}</a>.</p>
              </div>
              :
              null
          }
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
          <p className="text-xl">{config.speiInstructions ? config.speiInstructions : "Puedes depositarme a mi cuenta personal. En la descripción de la transferencia, pon tu nombre y el texto 'SEEK' para poder agradecerte :)"}</p>
          <ul className="list-disc list-inside">
            <li className="my-3"><span className="font-bold">Banco:</span> {config.bank}</li>
            <p className={`text-xs underline ${copiedBank?"decoration-green-400":"decoration-blue-400"} active:decoration-wavy decoration-2 cursor-pointer`} onClick={() => copyBankToClipboard(config.bank)}>{copiedBank?"¡Ya copiaste el banco!":"Haz clic aquí para copiar el banco"}</p>
            <li className="my-3"><span className="font-bold">CLABE:</span> {clabeFormatter(config.clabe)}</li>
            <p className={`text-xs underline ${copiedClabe?"decoration-green-400":"decoration-blue-400"} active:decoration-wavy decoration-2 cursor-pointer`} onClick={() => copyClabeToClipboard(config.clabe)}>{copiedClabe?"¡Ya copiaste la clabe!":"Haz clic aquí para copiar la clabe"}</p>
          </ul>
          { config.nombreDePasarela && config.urlDePasarela ?
              <div className="mt-6">
                <hr />
                <div className="flex items-center mt-6 gap-6">
                  <h1 className="text-3xl font-serif ">{config.nombreDePasarela}</h1>
                  <ShoppingBagIcon className="w-6 h-6"/>
                </div>
                <p>Si preferirías donar con tarjeta de débito o crédito directamente, puedes hacerlo a través de <a href={config.urlDePasarela}>{config.nombreDePasarela}</a>.</p>
              </div>
              :
              null
          }  
        </div>  
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-h-80 md:w-auto rounded-full" src={profile} />
        <div className="flex flex-col gap-6">
          <h1 className="md:hidden text-5xl font-serif font-bold leading-tight tracking-wide">Hey &#128075;, <br />soy <span className="text-primary">{config.name}</span></h1>
          <h1 className="hidden md:block text-6xl font-serif font-bold leading-tight tracking-wide">Hey &#128075;, soy <span className="text-primary">{config.name}</span></h1>
          <p className="text-xl md:text-2xl text-justify" dangerouslySetInnerHTML={{ __html: config.description }}></p>
          <p className="text-xl md:text-2xl">{config.ctaText}</p>
          <button id="ctaButton" onClick={() => setModal(true)} className={`rounded-full bg-primary text-white p-3 w-full md:max-w-xs font-serif text-xl transform hover:rotate-2 hover:scale-105 duration-200 flex items-center justify-center`}><p>Donar</p></button>
          { config.workMessage ?
            <p className="text-small" dangerouslySetInnerHTML={{__html: config.workMessage}}></p>
            :
            null
          }
          </div>
      </div>

      <hr />
  
      <div className="flex flex-col gap-6 md:-mt-6">
        <h1 className="text-3xl font-serif">Preguntas frecuentes</h1>

        <div className="flex flex-col gap-12">
            <div className="flex flex-col border-solid border-gray-400 border-2 p-6 rounded-xl">
              <div onClick={() => setDropOne(!isDropOneOpen)} className="flex items-center justify-between cursor-pointer">
                <h2 className="font-serif text-xl">¿Qué es SEEK?</h2>
                <ChevronDownIcon className={`${isDropOneOpen?"hidden":"block"} h-6 w-6`} />
                <ChevronUpIcon className={`${isDropOneOpen?"block":"hidden"} h-6 w-6`} />
              </div>
              
              <hr className={isDropOneOpen?"block mt-6":"hidden"}/>
              <p className={`${isDropOneOpen? "h-fit mt-6":"h-0" } transform duration-700`}>
                <span className={`${isDropOneOpen? "block":"hidden"} transform duration-700`}>Es la mayor conferencia católica para estudiantes universitarios de Estados Unidos, organizada anualmente por <a href="https://focus.org" target="_blank">FOCUS</a>. Dura 5 días y renombrados conferencistas atienden, como el Padre Mike Schmitz o el Dr. Curtis Martin.</span>
              </p>
            </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col border-solid border-gray-400 border-2 p-6 rounded-xl">
            <div onClick={() => setDropTwo(!isDropTwoOpen)} className="flex items-center justify-between cursor-pointer">
              <h2 className="font-serif text-xl">¿Cuánto estoy recaudando?</h2>
              <ChevronDownIcon className={`${isDropTwoOpen?"hidden":"block"} h-6 w-6`} />
              <ChevronUpIcon className={`${isDropTwoOpen?"block":"hidden"} h-6 w-6`} />
            </div>
            
            <hr className={isDropTwoOpen?"block mt-6":"hidden"}/>
            <p className={`${isDropTwoOpen? "h-fit mt-6":"h-0" } transform duration-700`}>
              <span className={`${isDropTwoOpen? "block":"hidden"} transform duration-700`}>Para cubrir los costos de transporte, hospedaje y alimentación, necesitaré 15,000 MXN. De este total, ya conseguí 6,000 MXN mediante mi trabajo y 100 MXN mediante donaciones.</span>
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col border-solid border-gray-400 border-2 p-6 rounded-xl">
            <div onClick={() => setDropThree(!isDropThreeOpen)} className="flex items-center justify-between cursor-pointer">
              <h2 className="font-serif text-xl">¿Donde será SEEK y cuánto durará?</h2>
              <ChevronDownIcon className={`${isDropThreeOpen?"hidden":"block"} h-6 w-6`} />
              <ChevronUpIcon className={`${isDropThreeOpen?"block":"hidden"} h-6 w-6`} />
            </div>
            
            <hr className={isDropThreeOpen?"block mt-6":"hidden"}/>
            <p className={`${isDropThreeOpen? "h-fit mt-6":"h-0" } transform duration-700`}>
              <span className={`${isDropThreeOpen? "block":"hidden"} transform duration-700`}>Este año, SEEK tendrá lugar en St. Louis, Missouri, E.U.A. del 1 al 5 de enero. El plan es salir de Monterrey el 31 de diciembre y regresar para el 6 o 7 de enero.</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
