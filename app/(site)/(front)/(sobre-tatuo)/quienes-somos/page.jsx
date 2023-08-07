import ContactForm from "@/components/forms/ContactForm";
import FaqSection from "@/components/landing/Faqs";
import Heading from "@/components/ui/Heading";
import { faqs } from "@/libs/landingTexts";
import Team from "../components/Team";


export default async function page({

}) {



    return (
        <div>
            <Heading
                title="Preguntas frecuentes"
                subtitle="Si aún te queda alguna duda, escríbenos a hello@tattuo.com" />

            <Team />
        </div>
    );
}