import type { MetaFunction } from "@remix-run/node";
import profile from "./../static/profile.jpg"
import { CreditCardIcon, XMarkIcon, ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { useOutletContext } from 'react-router-dom';
import { useState } from 'react'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2'
ChartJS.register(ArcElement, Tooltip, Legend);

import { config } from "seek.config"

export const meta: MetaFunction = () => {
  return [
    { title: `${config.name} | SEEK 24` },
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

  const dineroTotalRequerido: number = 15500
  const dineroTrabajado: number = 6000 + 1039 + 1600
  const dineroDonado: number = 100
  const chartData = {
    labels: ['Capital trabajado', 'Capital donado', 'Faltante'],
    datasets: [
      {
        label: '# of Votes',
        data: [dineroTrabajado, dineroDonado, dineroTotalRequerido - dineroTrabajado - dineroDonado],
        backgroundColor: [
          'rgb(37, 99, 235)',
          'rgb(74, 222, 128)',
          'lightgray',
        ],
        borderColor: [
          'rgb(37, 99, 235)',
          'rgb(74, 222, 128)',
          'gray',
        ],
        borderWidth: 1,
        spacing: 10
      },
    ],
  }

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const label = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'MXN',
            }).format(context.parsed);
            
            return label;
          },
        },
      },
    },
  };  

  return (
    <div className={`p-12 md:p-24 flex flex-col gap-12 md:gap-24 font-sans-serif`}>
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
          <hr />
          <div className="flex items-center mt-6 gap-6">
            <h1 className="text-3xl font-serif ">Moneypool</h1>
          </div>
          <p>Si preferirías donar con tarjeta de débito o crédito directamente, puedes hacerlo a través de <a className="underline decoration-blue-400 decoration-2" href="https://www.moneypool.mx/p/XL6gvIU">Moneypool</a>.</p>
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
          <hr />
          <div className="flex items-center mt-6 gap-6">
            <h1 className="text-3xl font-serif ">Moneypool</h1>
          </div>
          <p className="text-xl">Si preferirías donar con tarjeta de débito o crédito directamente, puedes hacerlo a través de <a className="underline decoration-blue-400 decoration-2" href="https://www.moneypool.mx/p/XL6gvIU">Moneypool</a>.</p>
        </div>  
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <img className="w-full md:max-h-80 md:w-auto rounded-full" src={profile} />
        <div className="flex flex-col gap-6">
          <h1 className="md:hidden text-5xl font-serif font-bold leading-tight tracking-wide">Hey &#128075;, <br />soy <span className="text-blue-600">Diego Hernández</span></h1>
          <h1 className="hidden md:block text-6xl font-serif font-bold leading-tight tracking-wide">Hey &#128075;, soy <span className="text-blue-600">Diego Hernández</span></h1>
          <p className="text-xl md:text-2xl text-justify">Tengo 19 años y estoy deseando ir a <a href="https://seek.focus.org" target="_blank" className="underline decoration-blue-400 decoration-4 active:decoration-wavy">SEEK 24</a>, la mayor conferencia de universitarios católicos en Estados Unidos, para encontrarme con Cristo.</p>
          <p className="text-xl md:text-2xl">¿Me ayudarías a vivirlo?</p>
          <button id="ctaButton" onClick={() => setModal(true)} className={`rounded-full bg-blue-600 text-white p-3 w-full md:max-w-xs font-serif text-xl transform hover:rotate-2 hover:scale-105 duration-200 flex items-center justify-center`}><p>Donar</p></button>
          <p className="text-small">¿Necesitas un blog profesional o un sitio web como este? ¡También soy desarrollador de código! <a href="https://wa.me/528131266343" target="_blank" className="underline active:decoration-wavy decoration-blue-400 decoration-2">Trabajemos juntos.</a></p>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-6">
        <h3 className="text-3xl font-serif">La meta es recaudar 15,000 pesos.</h3>
        <p>La mayor parte del dinero ya la he conseguido mediante mi trabajo como desarrollador de código. Pero, te necesito para cubrir lo último.</p>
        <div className="w-full md:max-w-sm flex flex-col gap-3 items-center justify-center">
          <Doughnut data={chartData} options={chartOptions} />
          <p className="text-xs">Esta gráfica fue actualizada por última vez a las 12:55 PM del 8.DEC.23</p>
        </div>
      </div>

      <hr />
  
      <div className="flex flex-col gap-12 md:-mt-6">
        <h1 className="text-3xl font-serif">¿Quieres saber más de Seek?</h1>

        <div className="flex flex-wrap gap-12 justify-between">

          <div className="flex flex-col gap-6 w-full md:max-w-sm bg-slate-100 p-6 rounded-lg">
            <iframe width="100%" height="315px" className="rounded-lg" src="https://www.youtube.com/embed/ofaIpfH3oYo?si=FkS-r97_65rGosCl" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <h3 className="text-xl">Anuncio oficial de Seek 24</h3>
          </div>

          <div className="flex flex-col gap-6 w-full md:max-w-sm bg-slate-100 p-6 rounded-lg">
            <iframe width="100%" height="315px" className="rounded-lg" src="https://www.youtube-nocookie.com/embed/p9NMpAcAL5I?si=pCn7GubmGuBgxNcY" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <h3 className="text-xl">¡Por qué no te puedes perder Seek 24!</h3>
          </div>

          <div className="flex flex-col gap-6 w-full md:max-w-sm bg-slate-100 p-6 rounded-lg">
            <iframe width="100%" height="315px" className="rounded-lg" src="https://www.youtube-nocookie.com/embed/S-Y_BHzsG8s?si=AigXg5K6q-OZiKYh" title="YouTube video player" frameBorder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
            <h3 className="text-xl">Recapitulación del año pasado</h3>
          </div>

        </div>
      </div>
    </div>
  );
}
