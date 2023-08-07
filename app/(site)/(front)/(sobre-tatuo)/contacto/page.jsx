import ContactForm from "@/components/forms/ContactForm";
import FaqSection from "@/components/landing/Faqs";
import Heading from "@/components/ui/Heading";
import { faqs } from "@/libs/landingTexts";


export default async function page({

}) {



    return (
        <div>
            <Heading
                title="¿Quiénes somos?"
                subtitle="" />

            <ContactForm />
        </div>
    );
}