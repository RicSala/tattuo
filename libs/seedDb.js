import prisma from "@/libs/prismadb";
import { getStyleList } from "./getStyleList";
import { getCities } from "./getCities";
import { getBodyParts } from "./getBodyParts";


const styles = getStyleList();
const cities = getCities();
const bodyParts = getBodyParts();

export const seedDb = async () => {


    console.log("Seeding database");
    // delete all the styles in the database
    await prisma.style.deleteMany({});
    console.log("Styles deleted");

    // create all the styles in the database
    for (const style of styles) {
        await prisma.style.create({
            data: {
                label: style.label,
                value: style.label,
            }
        });
    }
    console.log("Styles created");
    // delete all the bodyParts in the database
    await prisma.bodyPart.deleteMany({});
    console.log("BodyParts deleted");

    // create all the bodyParts in the database
    for (const bodyPart of bodyParts) {
        await prisma.bodyPart.create({
            data: {
                label: bodyPart.label,
                value: bodyPart.label,
            }
        });
    }
    console.log("BodyParts created");

    // delete all the cities in the database
    await prisma.city.deleteMany({});
    console.log("Cities deleted");

    // create all the cities in the database
    try {
        const result = await prisma.city.createMany({
            data: cities.map(city => ({
                label: city.label,
                value: city.label,
                parent_code: city.parent_code,
                code: city.code,
            })),
        });
        console.log(`Successfully created ${result.count} cities`);
    } catch (error) {
        console.log("Error creating cities: ", error);
    }

    console.log("Cities created");


}

