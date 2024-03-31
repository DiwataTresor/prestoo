import { Inter, Lora, Source_Sans_3,Poiret_One,Pinyon_Script,Michroma,Poppins,Nunito } from 'next/font/google'
import localFont from 'next/font/local'
 
// define your variable fonts
const inter = Inter({ subsets: ['latin'] })
const lora = Lora({ subsets: ['latin'] })
const poiret = Poiret_One({ subsets: ['latin'],weight:'400' })
const pignon = Pinyon_Script({ subsets: ['latin'],weight:'400' })
const michroma = Michroma({ subsets: ['latin'],weight:'400' })
const poppins = Poppins({ subsets: ['latin'],weight:'400' })
const nunito = Nunito({ subsets: ['latin'],weight:'400' })
// define 2 weights of a non-variable font
const sourceCodePro400 = Source_Sans_3({subsets: ['latin'], weight: '400' })
const sourceCodePro700 = Source_Sans_3({subsets: ['latin'], weight: '700' })
// define a custom local font where GreatVibes-Regular.ttf is stored in the styles folder
 
export { inter, lora, sourceCodePro400, sourceCodePro700,poiret,pignon,michroma,poppins,nunito }